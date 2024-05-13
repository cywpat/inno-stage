# manually create this file
from django.urls import path
from .views import StagingTableView

app_name = 'manyapps'

urlpatterns = [
    path ('staging_table/', StagingTableView.as_view()),
]

