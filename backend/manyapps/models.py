from django.db import models

class StagingTable(models.Model):
    sales_order = models.CharField(max_length=50, primary_key=True)
    engineer = models.CharField(max_length=200, blank=True, null=True)
    staging_status = models.CharField(max_length=50, blank=True, null=True)
    date_drawn = models.DateTimeField(blank=True, null=True)
    no_carton = models.IntegerField(blank=True,null=True)
    last_status_update = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = "staging_table"