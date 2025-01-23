from app.views import ItemViewSet, AllergenViewSet, MealViewSet, DayViewSet
from rest_framework.routers import DefaultRouter
from app import views

router = DefaultRouter()

router.register(r'allergen', AllergenViewSet, basename='allergen')
router.register(r'item', ItemViewSet, basename='item')
router.register(r'meal', MealViewSet, basename='meal')
router.register(r'day', DayViewSet, basename='day')

urlpatterns = router.urls

