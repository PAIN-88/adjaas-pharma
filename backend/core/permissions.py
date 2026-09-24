from django.conf import settings
from rest_framework.permissions import BasePermission

SAFE_METHODS = ("GET", "HEAD", "OPTIONS")


class HasAdminSecretKey(BasePermission):
    """
    Read (GET/HEAD/OPTIONS) is always allowed for everyone.
    Write (POST/PUT/PATCH/DELETE) is only allowed if the request includes
    the correct secret key in the 'X-Admin-Key' header. This keeps random
    visitors from adding/editing/deleting products via the public form,
    without needing a full user login system.
    """

    message = "Invalid or missing admin key."

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        provided_key = request.headers.get("X-Admin-Key", "")
        return bool(settings.ADMIN_SECRET_KEY) and provided_key == settings.ADMIN_SECRET_KEY