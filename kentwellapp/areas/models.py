from django.contrib.gis.db import models

class Area(models.Model):
    name = models.CharField(blank=True, max_length=255)
    description = models.TextField(blank=True)
    
    area = models.MultiPolygonField()

    objects = models.GeoManager()
    
    def __unicode__(self):
        return self.name
        
        # ALTER TABLE areas_area
        #    ADD COLUMN description text;