from rest_framework import routers
from .api_views import (
    ExamenViewSet,
    CupsGrupoViewSet,
    CupsSubGrupoViewSet
)

router = routers.DefaultRouter()
router.register(r'examenes', ExamenViewSet)
router.register(r'cups_grupos', CupsGrupoViewSet)
router.register(r'cups_subgrupos', CupsSubGrupoViewSet)
