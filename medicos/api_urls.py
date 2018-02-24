from rest_framework import routers
from .api_views import (
    MedicoRemitenteViewSet,
    EspecialistaViewSet,
    EspecialidadViewSet
)

router = routers.DefaultRouter()
router.register(r'medicos_remitentes', MedicoRemitenteViewSet)
router.register(r'especialidades', EspecialidadViewSet)
router.register(r'especialistas', EspecialistaViewSet)
