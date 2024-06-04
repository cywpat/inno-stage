from django.db import models

class StagingTable(models.Model):
    sales_order = models.CharField(max_length=50, primary_key=True)
    engineer = models.CharField(max_length=200, blank=True, null=True)
    staging_status = models.CharField(max_length=50, blank=True, null=True)
    date_drawn = models.DateTimeField(blank=True, null=True)
    date_returned = models.DateTimeField(blank=True, null=True)
    no_carton = models.IntegerField(blank=True,null=True)
    last_status_update = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = "staging_table"

class UsersTable(models.Model):
    username = models.CharField(max_length=250, primary_key=True)
    name = models.CharField(max_length=250)
    role = models.CharField(max_length=250)
    password = models.CharField(max_length=250)

    class Meta:
        managed = True
        db_table = "users_table"

class CombinedTable (models.Model):
    sales_order = models.CharField(max_length=250, primary_key=True)
    business_unit = models.CharField(max_length=250)
    client_industry_sector = models.CharField(max_length=250)
    client_name = models.CharField(max_length=250)
    client_po_number = models.CharField(max_length=250)
    date_closed = models.DateTimeField(blank=True, null=True)
    date_creation = models.DateTimeField(blank=True, null=True)
    delivery_ac_month = models.DateTimeField(blank=True, null=True)
    delivery_fc_month = models.CharField(max_length=250)
    delivery_order_criteria = models.CharField(max_length=250)
    delivery_status = models.CharField(max_length=250)
    engineer = models.CharField(max_length=2500)
    gp = models.FloatField(blank=True, null=True)
    logistics_pic = models.CharField(max_length=250)
    project_id = models.CharField(max_length=250)
    project_manager = models.CharField(max_length=250)
    revenue = models.FloatField(blank=True, null=True)
    service_unit = models.CharField(max_length=250)
    tsr_number = models.CharField(max_length=250)
    hardware_received = models.CharField(max_length=250) # location of hardware
    last_status_update = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = "combined_table"