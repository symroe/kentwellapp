from django.contrib.gis import admin
from models import Area

class KentwellAreaAdmin(admin.OSMGeoAdmin):

    lon = 0.7214176653799744
    lat = 52.0973018540394648
    
    
    from django.contrib.gis.geos import Point
    pnt = Point(lon, lat, srid=4326)
    pnt.transform(900913)
    default_lon, default_lat = pnt.coords
    
    default_zoom = 16
    map_width = 800
    map_height = 800



admin.site.register(Area, KentwellAreaAdmin)