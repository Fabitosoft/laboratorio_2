from rest_framework import routers
from .api_views import (
    EntidadViewSet,
    ContactoEntidadViewSet,
    EntidadExamenViewSet
)

router = routers.DefaultRouter()
router.register(r'entidades', EntidadViewSet)
router.register(r'contacto_entidades', ContactoEntidadViewSet)
router.register(r'entidad_examenes', EntidadExamenViewSet)
