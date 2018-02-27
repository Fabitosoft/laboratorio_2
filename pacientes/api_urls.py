from rest_framework import routers
from .api_views import (
    PacienteViewSet
)

router = routers.DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
