# manually create this file
from django.urls import path
from .views import AssignEngineerTableView, EngineerTableView, ProjectManagerTableView, LogisticsTableView, FinanceTableView, DetailedSOView

app_name = 'manyapps'

urlpatterns = [
    path ('engineer_table/', EngineerTableView.as_view()),
    path ('assignengineer_table/', AssignEngineerTableView.as_view()),
    path ('projectmanager_table/', ProjectManagerTableView.as_view()),
    path ('logistics_table/', LogisticsTableView.as_view()),
    path ('finance_table/', FinanceTableView.as_view()),
    path ('detailed_so/', DetailedSOView.as_view()),
]

