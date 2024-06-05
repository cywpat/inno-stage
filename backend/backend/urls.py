from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path ('api/', include ('manyapps.api.urls')),
    path ('manyapps/', include ('manyapps.urls')),
]