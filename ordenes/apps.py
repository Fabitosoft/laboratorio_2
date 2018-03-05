from django.apps import AppConfig


class OrdenesConfig(AppConfig):
    name = 'ordenes'

    def ready(self):
        import ordenes.signals
