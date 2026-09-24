from django.contrib import admin
from .models import (
    Category, Product, SliderImage, FeatureHighlight,
    CompanyInfo, ContactMessage,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]
    list_filter = ["category"]


admin.site.register(SliderImage)
admin.site.register(FeatureHighlight)
admin.site.register(CompanyInfo)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "subject", "created_at"]
    readonly_fields = ["created_at"]
