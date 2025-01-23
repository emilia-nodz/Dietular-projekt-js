from django.db import models

# alergen
class Allergen(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Allergen"  # Singular form for display in admin panel
        verbose_name_plural = "Allergens"  # Plural form for display in admin panel
        ordering = ['name']  # Default ordering by name in ascending order

    def __str__(self):
        return self.name


# produkt
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    weight = models.IntegerField()
    calories = models.IntegerField()
    carbohydrates = models.IntegerField()
    proteins = models.IntegerField()
    fats = models.IntegerField()
    # Allows multiple allergens per product and vice versa
    allergens = models.ManyToManyField(Allergen, related_name='items')

    class Meta:
        verbose_name = "Item"  # Singular form for display in admin panel
        verbose_name_plural = "Items"  # Plural form for display in admin panel
        ordering = ['name']  # Default ordering by name in ascending order

    def __str__(self):
        return self.name

# posiłek
class Meal(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    items = models.ManyToManyField(Item, related_name='meals')
    numberOfPortions = models.IntegerField()
    portionWeight = models.IntegerField()
    caloriesPerPortion = models.IntegerField()

    class Meta:
        verbose_name = "Meal"  # Singular form for display in admin panel
        verbose_name_plural = "Meals"  # Plural form for display in admin panel
        ordering = ['name']  # Default ordering by name in ascending order

    def __str__(self):
        return self.name



# dzień
class Day(models.Model):
    id = models.BigIntegerField(primary_key=True)
    date = models.DateField()
    items = models.ManyToManyField('Item', related_name='days')
    meals = models.ManyToManyField('Meal', related_name='meals')
    class Meta:
        verbose_name = "Day"  # Singular form for display in admin panel
        verbose_name_plural = "Days"  # Plural form for display in admin panel
        ordering = ['date']  # Default ordering by date in ascending order

    def __str__(self):
        return str(self.date)

