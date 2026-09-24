from rest_framework import viewsets, generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import (
    Category, Product, SliderImage, FeatureHighlight,
    CompanyInfo, ContactMessage,
)
from .serializers import (
    CategorySerializer, ProductSerializer, SliderImageSerializer,
    FeatureHighlightSerializer, CompanyInfoSerializer, ContactMessageSerializer,
)
from .permissions import HasAdminSecretKey


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class ProductViewSet(viewsets.ModelViewSet):
    """Full CRUD. Reading is open to everyone; creating/editing/deleting a
    product requires the 'X-Admin-Key' header to match ADMIN_SECRET_KEY."""
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    permission_classes = [HasAdminSecretKey]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        qs = super().get_queryset()
        category_slug = self.request.query_params.get("category")
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        return qs


class SliderImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SliderImage.objects.all()
    serializer_class = SliderImageSerializer


class FeatureHighlightViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeatureHighlight.objects.all()
    serializer_class = FeatureHighlightSerializer


class CompanyInfoView(generics.RetrieveAPIView):
    serializer_class = CompanyInfoSerializer

    def get_object(self):
        obj, _ = CompanyInfo.objects.get_or_create(pk=1)
        return obj


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]