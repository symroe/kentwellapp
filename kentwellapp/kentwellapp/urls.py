from django.conf import settings
from django.conf.urls import patterns, include, url

from django.views.generic import TemplateView

from areas.api import AreaResource

area_resource = AreaResource()

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'kentwellapp.views.home', name='home'),
    # url(r'^kentwellapp/', include('kentwellapp.foo.urls')),
    
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    
    (r'^api/', include(area_resource.urls)),
    
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    
    url(r'', TemplateView.as_view(template_name="index.html"))
)