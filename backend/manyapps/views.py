from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .models import StagingTable, UsersTable, CombinedTable


# Staging Table
class StagingTableView(APIView):
    def get(self, request):
        try:
            staging_data = list(StagingTable.objects.all().values())
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
        projectmanager_data = list(CombinedTable.objects.filter(project_manager='Sivaraj Kuppusamy').values('sales_order','engineer','staging_status','hardware_received','engineer','last_status_update'))
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