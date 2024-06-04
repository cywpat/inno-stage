# manually create this file
from django.urls import path
from .views import StagingTableView, EngineerTableView, ProjectManagerTableView

app_name = 'manyapps'

urlpatterns = [
    path ('staging_table/', StagingTableView.as_view()),
    path ('engineer_table/', EngineerTableView.as_view()),
    path ('projectmanager_table/', ProjectManagerTableView.as_view())
]

