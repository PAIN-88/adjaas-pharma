from django.db import models


class Category(models.Model):
    """A product category, e.g. Tablet, Syrup, Capsule..."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=110, unique=True)
    icon = models.CharField(
        max_length=50, blank=True,
        help_text="Optional icon name/emoji shown on the products grid"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    composition = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class SliderImage(models.Model):
    """Homepage hero slider images."""
    title = models.CharField(max_length=150, blank=True)
    image = models.ImageField(upload_to="slider/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title or f"Slide {self.pk}"


class FeatureHighlight(models.Model):
    """The 3 icon cards at the top of the homepage (Trust, Quality, Satisfaction)."""
    icon = models.CharField(max_length=50, help_text="Emoji or icon class")
    title = models.CharField(max_length=100)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class CompanyInfo(models.Model):
    """Singleton-ish model holding editable site-wide company content."""
    company_name = models.CharField(max_length=150, default="Your Company Name")
    tagline = models.CharField(max_length=255, blank=True)
    welcome_heading = models.CharField(max_length=200, blank=True)
    welcome_text = models.TextField(blank=True)
    why_choose_heading = models.CharField(max_length=200, blank=True)
    why_choose_text = models.TextField(blank=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    logo = models.ImageField(upload_to="branding/", blank=True, null=True)

    def __str__(self):
        return self.company_name


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.subject or 'Contact'}"
