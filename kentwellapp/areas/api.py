from tastypie.contrib.gis.resources import ModelResource
from tastypie.constants import ALL

from .models import Area


class AreaResource(ModelResource):
    class Meta:
        queryset = Area.objects.all()
        resource_name = 'area'
        filtering = {
            'area': ALL,
        }