from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
]

# Serve media files in both dev and production.
# NOTE: Django's static() helper is meant for development, but Render's
# free tier has no separate web server for /media/, so we keep this
# active even when DEBUG=False to make uploaded images work.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
