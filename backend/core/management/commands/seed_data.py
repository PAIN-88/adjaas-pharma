import os
from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand
from core.models import Category, FeatureHighlight, CompanyInfo, SliderImage

SEED_IMAGES_DIR = os.path.join(settings.BASE_DIR, "seed_images")

SLIDES = [
    ("slide1.jpg", "Trusted Research, Trusted Results"),
    ("slide2.jpg", "Serving You With Care"),
    ("slide3.jpg", "Meet Our Expert Team"),
]

CATEGORIES = [
    "Tablet", "Syrup", "Capsule", "Suspension", "Drop",
    "Dry Syrup", "Cream", "Eye & Ear Drop", "Soap",
    "Injection", "Lotion", "Face Wash",
]

FEATURES = [
    ("🤝", "Trust and Commitment",
     "Trust and commitment are central to how we build every relationship with our clients."),
    ("⭐", "High Quality",
     "We continually invest in our processes to meet the highest quality standards."),
    ("😊", "Client Satisfaction",
     "We work to fully understand our clients' needs and exceed their expectations."),
]


class Command(BaseCommand):
    help = "Seed the database with placeholder demo content matching the site layout."

    def handle(self, *args, **options):
        for i, name in enumerate(CATEGORIES):
            slug = name.lower().replace(" & ", "-").replace(" ", "-")
            Category.objects.get_or_create(
                name=name, defaults={"slug": slug, "order": i}
            )

        for i, (icon, title, text) in enumerate(FEATURES):
            FeatureHighlight.objects.get_or_create(
                title=title, defaults={"icon": icon, "text": text, "order": i}
            )

        for i, (filename, title) in enumerate(SLIDES):
            if SliderImage.objects.filter(title=title).exists():
                continue
            filepath = os.path.join(SEED_IMAGES_DIR, filename)
            if os.path.exists(filepath):
                slide = SliderImage(title=title, order=i)
                with open(filepath, "rb") as f:
                    slide.image.save(filename, File(f), save=True)

        CompanyInfo.objects.get_or_create(
            pk=1,
            defaults=dict(
                company_name="Your Company Name",
                tagline="Better health, better living.",
                welcome_heading="Welcome to Your Company Name",
                welcome_text=(
                    "Replace this with your own company description: who you are, "
                    "how long you've been in business, and what makes your products stand out."
                ),
                why_choose_heading="Why Choose Us",
                why_choose_text=(
                    "Replace this with your own value proposition — quality, pricing, "
                    "reliability, or whatever sets your company apart."
                ),
                address="Your Company Address, City, State - PIN",
                phone="+91-000-0000000",
                email="info@yourcompany.com",
            ),
        )

        self.stdout.write(self.style.SUCCESS("Seed data created."))
