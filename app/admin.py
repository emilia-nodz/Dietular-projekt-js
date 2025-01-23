from django.contrib import admin
from .models import Allergen, Item, Meal

class AllergenAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)

class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'weight', 'calories', 'carbohydrates', 'proteins', 'fats')
    search_fields = ('name', 'description')
    list_filter = ('allergens',)
    ordering = ('name',)

class DayAdmin(admin.ModelAdmin):
    list_display = ('id', 'date')
    search_fields = ('date',)
    filter_horizontal = ('items',)
    ordering = ('date',)

class MealAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'numberOfPortions', 'portionWeight', 'caloriesPerPortion')
    search_fields = ('name', 'description')
    filter_horizontal = ('items',)
    ordering = ('name',)


admin.site.register(Allergen, AllergenAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Meal, MealAdmin)
