from .api_routers import DefaultRouter

from entidades.api_urls import router as entidades_router
from medicos.api_urls import router as medicos_router
from examenes.api_urls import router as examenes_router
from usuarios.api_urls import router as usuarios_router
from permisos.api_urls import router as permisos_router
from pacientes.api_urls import router as pacientes_router
from ordenes.api_urls import router as ordenes_router

router = DefaultRouter()
router.extend(usuarios_router)
router.extend(pacientes_router)
router.extend(entidades_router)
router.extend(medicos_router)
router.extend(examenes_router)
router.extend(permisos_router)
router.extend(ordenes_router)
