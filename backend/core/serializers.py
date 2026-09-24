from rest_framework import serializers
from .models import (
    Category, Product, SliderImage, FeatureHighlight,
    CompanyInfo, ContactMessage,
)


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "description", "composition",
            "image", "category", "category_name",
        ]


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source="products.count", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "icon", "order", "product_count"]


class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderImage
        fields = ["id", "title", "image", "order"]


class FeatureHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureHighlight
        fields = ["id", "icon", "title", "text", "order"]


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "phone", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
