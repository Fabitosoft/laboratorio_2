from rest_framework import routers
from .api_views import (
    CitologiaViewSet,
    BiopsiaViewSet
)

router = routers.DefaultRouter()
router.register(r'citologias', CitologiaViewSet)
router.register(r'biopsias', BiopsiaViewSet)
