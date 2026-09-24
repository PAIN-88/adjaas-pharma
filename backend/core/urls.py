from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, SliderImageViewSet,
    FeatureHighlightViewSet, CompanyInfoView, ContactMessageCreateView,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("slides", SliderImageViewSet, basename="slide")
router.register("features", FeatureHighlightViewSet, basename="feature")

urlpatterns = [
    path("", include(router.urls)),
    path("company/", CompanyInfoView.as_view(), name="company-info"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
]
