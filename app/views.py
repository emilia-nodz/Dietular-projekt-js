from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets

class AllergenViewSet(viewsets.ModelViewSet):
    serializer_class = AllergenSerializer
    queryset = Allergen.objects.all()

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class DayViewSet(viewsets.ModelViewSet):
    serializer_class = DaySerializer
    queryset = Day.objects.all()

class MealViewSet(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    queryset = Meal.objects.all()

