from rest_framework import routers
from .api_views import (
    OrdenViewSet,
    OrdenExamenViewSet
)

router = routers.DefaultRouter()
router.register(r'ordenes', OrdenViewSet)
router.register(r'ordenes_exames', OrdenExamenViewSet)
