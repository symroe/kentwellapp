from django.contrib.gis.db import models

class Area(models.Model):
    name = models.CharField(blank=True, max_length=255)
    
    area = models.MultiPolygonField()

    objects = models.GeoManager()