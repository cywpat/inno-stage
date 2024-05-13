from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .models import StagingTable


# Staging Table
class StagingTableView(APIView):
    def get(self,request):
        staging_data = list(StagingTable.objects.all().values())
        context = {
            "data": staging_data
        }
        return Response(context)
