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