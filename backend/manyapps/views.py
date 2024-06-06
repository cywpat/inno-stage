from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .models import StagingTable, UsersTable, CombinedTable
from django.db.models import F, Value, Q, CharField
from django.db.models.functions import Replace
from django.db.models import OuterRef, Subquery, Count
import datetime

class EngineerTableView(APIView):
    def get(self, request):
        try:
            # staging_data = list(StagingTable.objects.all().values())
            # HARDCODE: filter to "David Hein" for now

            # 1. Filter the CombinedTable for rows where engineer contains 'David Hein'
            combined_data = list(CombinedTable.objects.filter(engineer__contains='David Hein').values('sales_order', 'hardware_received'))

            # 2. Extract sales_order values
            sales_orders = [entry['sales_order'] for entry in combined_data]

            # 3. Retrieve corresponding rows from StagingTable
            staging_data = list(StagingTable.objects.filter(sales_order__in=sales_orders).values())

            # 4. Create a dictionary from staging_data with sales_order as the key
            staging_data_dict = {entry['sales_order']: entry for entry in staging_data}

            # 5. Combine combined_data with staging_data
            final_data = []
            for combined_entry in combined_data:
                sales_order = combined_entry['sales_order']
                staging_entry = staging_data_dict.get(sales_order, {})
                combined_entry.update(staging_entry)
                final_data.append(combined_entry)

            context = {
                "data": final_data
            }
            return Response(context)
        except Exception as e:
            print (e)
            return Response({"error": "An error occurred"})
    
    def post(self, request):
        try:
            data = request.data.get('data')
            sales_order = data["sales_order"]
            date = data["date"] 
            update = data["update"]

            today = datetime.datetime.now()

            # 1. Update the last_status_update field in the CombinedTable
            if update ==  "drawn":
                StagingTable.objects.filter(sales_order=sales_order).update(date_drawn=date, last_status_update=today)
            elif update == "returned":
                StagingTable.objects.filter(sales_order=sales_order).update(date_returned=date, last_status_update=today)
        except:
            pass
        
        return Response() # return blank response if not frontend will throw an error

class AssignEngineerTableView(APIView):
    def get(self, request):
        engineer_data = list(UsersTable.objects.filter(role='engineer').values('name'))
        """ engineer_data will look something like this
        [
            {'username': 'a.b@email.com', 'name': 'A B'}
            {'username': 'cd.e@email.com', 'name': 'Cd E'}
            ]
        """
        context = {
            "data": engineer_data
        }
        return Response(context)
    
    def post(self, request):
        try:
            data = request.data.get('data')
            engineers = data['engineers']
            sales_order = data['sales_order']
            
            today = datetime.datetime.now()
            CombinedTable.objects.filter(sales_order=sales_order).update(engineer=engineers, last_status_update=today)

        except Exception as e:
            print (e)

        return Response() # return blank response if not frontend will throw an error
    
class ProjectManagerTableView(APIView):
    def get(self, request):
        
       # HARDCODE: filter to "Sivaraj Kuppusamy" for now
        projectmanager_data = list(CombinedTable.objects.filter(project_manager='Sivaraj Kuppusamy').values('sales_order','engineer','hardware_received','last_status_update'))
        """ projectmanager_data will look something like this
        [
            {'"sales_order": "833151", "engineer": "David Lim, Wen Yang", "staging_status": null, "location_of_hardware": null, "last_status_update": null'}
            {'"sales_order": "834080", "engineer": "James Neo, Yik Tung Cheah", "staging_status": null, "location_of_hardware": null, "last_status_update": null'}

            ]
        """

        # 2. Extract sales order values
        sales_orders = [entry['sales_order'] for entry in projectmanager_data]
        
        # 3. Get the staging data for the sales orders
        staging_data = list(StagingTable.objects.filter(sales_order__in=sales_orders).values())

        # 4. Create a dictionary from staging_data with sales_order as the key
        staging_data_dict = {entry['sales_order']: entry for entry in staging_data}

        # 5. Combine projectmanager_data with staging_data
        combined_data = []
        for pm_entry in projectmanager_data:
            sales_order = pm_entry['sales_order']
            staging_entry = staging_data_dict.get(sales_order, {})
            combined_entry = {**pm_entry, **staging_entry}
            combined_data.append(combined_entry)

        context = {
            "data": combined_data
        }
        return Response(context) 
    
class LogisticsTableView(APIView):
    def get(self, request):
        # HARDCODE: filter to "Syed" for now
        logistics_data = list(CombinedTable.objects.filter(logistics_pic='Syed').values('sales_order','hardware_received', 'last_status_update'))

        # 2. Extract sales order values
        sales_orders = [entry['sales_order'] for entry in logistics_data]
        
        # 3. Get the staging data for the sales orders
        staging_data = list(StagingTable.objects.filter(sales_order__in=sales_orders).values('sales_order', 'staging_status'))

        # # 4. Create a dictionary from staging_data with sales_order as the key
        staging_data_dict = {entry['sales_order']: entry for entry in staging_data}

        # 5. Combine projectmanager_data with staging_data
        combined_data = []
        for pm_entry in logistics_data:
            sales_order = pm_entry['sales_order']
            staging_entry = staging_data_dict.get(sales_order, {})
            combined_entry = {**pm_entry, **staging_entry}
            combined_data.append(combined_entry)

        context = {
            "data": combined_data
        }
        return Response(context)
    
    def post(self, request):
        try:
            data = request.data.get('data')
            sales_order = data["sales_order"]
            location = data["hardware_received"]
            today = datetime.datetime.now()

            CombinedTable.objects.filter(sales_order=sales_order).update(hardware_received=location, last_status_update=today)
        except:
            pass
        
        return Response() # return blank response if not frontend will throw an error
    
class FinanceTableView(APIView):
    def get(self, request):
        from django.db.models import Count, F, ExpressionWrapper, fields
        from datetime import datetime, timedelta
        from django.db.models import Q

        # Step 1: Join CombinedTable and StagingTable on sales_order and filter the results
        data = (StagingTable.objects
                # .filter(sales_order__in=CombinedTable.objects.filter(hardware_received='KC').values('sales_order'))
                .filter(staging_status__in=["Staging In Progress", "Ready To Be Staged", "Staging Completed"])
                .values('staging_status', 'date_drawn', 'date_returned'))

        # Step 2: Calculate the number of days
        today = datetime.now().date()
        for entry in data:
            if entry['date_drawn']:
                date_drawn = entry['date_drawn']
                if entry['date_returned']:
                    date_returned = entry['date_returned']
                    days_diff = (date_returned - date_drawn).days
                else:
                    days_diff = (today - date_drawn).days
                entry['days_diff'] = days_diff
            else:
                entry['days_diff'] = None

        # Step 3: Group the results by staging status and into the specified categories
        days_data = {
            'Staging In Progress': {
                '0 days': 0,
                '1 to 7 days': 0,
                '7 days to 14 days': 0,
                '14 days to 21 days': 0,
            },
            'Ready To Be Staged': {
                '0 days': 0,
                '1 to 7 days': 0,
                '7 days to 14 days': 0,
                '14 days to 21 days': 0,
            },
            'Staging Completed': {
                '0 days': 0,
                '1 to 7 days': 0,
                '7 days to 14 days': 0,
                '14 days to 21 days': 0,
            },
        }

        for entry in data:
            staging_status = entry['staging_status']
            days_diff = entry['days_diff']
            if days_diff is not None:
                if days_diff == 0:
                    days_data[staging_status]['0 days'] += 1
                elif 1 <= days_diff <= 14:
                    days_data[staging_status]['1 to 7 days'] += 1
                elif 15 <= days_diff <= 60:
                    days_data[staging_status]['7 days to 14 days'] += 1
                else:
                    days_data[staging_status]['14 days to 21 days'] += 1

    ##################################################
        count_hardware_received = list(CombinedTable.objects.values('hardware_received').annotate(count=Count('hardware_received'))) 
        count_hardware_received.append ({ 'total_hardware_received': len(CombinedTable.objects.values('hardware_received'))}) 

        count_staging_status = list(StagingTable.objects.values('staging_status').annotate(count=Count('staging_status')))
        count_staging_status .append ({ 'total_staging_status ': len(StagingTable.objects.values('staging_status'))})     

        context = {
            "data": [count_hardware_received, count_staging_status, days_data]
        }
        return Response(context)