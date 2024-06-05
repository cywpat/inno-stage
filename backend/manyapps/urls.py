# manually create this file
from django.urls import path
from .views import StagingTableView, EngineerTableView, ProjectManagerTableView, LogisticsTableView, FinanceTableView

app_name = 'manyapps'

urlpatterns = [
    path ('staging_table/', StagingTableView.as_view()),
    path ('engineer_table/', EngineerTableView.as_view()),
    path ('projectmanager_table/', ProjectManagerTableView.as_view()),
    path ('logistics_table/', LogisticsTableView.as_view()),
    path ('finance_table/', FinanceTableView.as_view())
]

