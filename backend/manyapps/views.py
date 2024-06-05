from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .models import StagingTable, UsersTable, CombinedTable
from django.db.models import F, Value, Q, CharField
from django.db.models.functions import Replace
from django.db.models import OuterRef, Subquery

# Staging Table
class StagingTableView(APIView):
    def get(self, request):
        try:
            # staging_data = list(StagingTable.objects.all().values())
            # HARDCODE: filter to "David Hein" for now
            engineer_name='David Hein'

            # Step 1: Filter rows where 'D' is present in the engineer column
            queryset = StagingTable.objects.filter(Q(engineer__contains = engineer_name))

            # Step 2: Annotate to remove 'D' from the engineer field
            queryset = queryset.annotate(
                engineer_filtered=Replace(
                    Replace(F('engineer'), Value(engineer_name + ','), Value('')),
                    Value(',' + engineer_name ), Value('')
                )
            )

            # Step 3: Add the location_of_hardware from CombinedTable
            queryset = queryset.annotate(
                hardware_received=Subquery(
                    CombinedTable.objects.filter(sales_order=OuterRef('sales_order')).values('hardware_received')[:1]
                )
            )

            # Step 4: Create a list of fields excluding the 'engineer' column and adding 'location_of_hardware'
            fields = [f.name for f in StagingTable._meta.get_fields()]
            fields.append('hardware_received')

            # Step 5: Use the values() method to get the desired columns
            staging_data = list(queryset.values(*fields))

            context = {
                "data": staging_data
            }
            return Response(context)
        except Exception as e:
            print (e)
            return Response({"error": "An error occurred"})
        
class EngineerTableView(APIView):
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
            """ engineer_data will look something like this
            {
                'sales_number': 840275, 
                'engineers': 
                    [
                        {'username': 'a.b@email.com', 'name': 'A B'}
                        {'username': 'cd.e@email.com', 'name': 'Cd E'}
                    ]
            }
             """
            
            # 1. Update the new engineers selected to the database
            engineers_names= ', '.join(entry['name'] for entry in data["engineers"])
            CombinedTable.objects.filter(sales_order=data["sales_order"]).update(engineer=engineers_names)
        except Exception as e:
            print (e)

        return Response() # return blank response if not frontend will throw an error
    

# combined table view for PM
class ProjectManagerTableView(APIView):
    def get(self, request):
        
       # HARDCODE: filter to "Sivaraj Kuppusamy" for now
        projectmanager_data = list(CombinedTable.objects.filter(project_manager='Sivaraj Kuppusamy').values('sales_order','engineer','hardware_received','engineer','last_status_update'))
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
    
class FinanceTableView(APIView):
    def get(self, request):
        combined_data = list(CombinedTable.objects.all().values('hardware_received'))
        staging_data = list(StagingTable.objects.all().values('staging_status'))
        context = {
            "data": [combined_data, staging_data]
        }
        return Response(context)