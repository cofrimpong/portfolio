import importlib
import sys
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[2]
SERVICES_DIR = ROOT / "services"


def load_service_module(service_name: str) -> ModuleType:
    service_root = SERVICES_DIR / service_name
    sys.path.insert(0, str(ROOT))
    sys.path.insert(0, str(service_root))

    try:
        for module_name in list(sys.modules):
            if module_name == "app" or module_name.startswith("app."):
                del sys.modules[module_name]

        return importlib.import_module("app.main")
    finally:
        sys.path = [path for path in sys.path if path not in {str(ROOT), str(service_root)}]


def load_service_app(service_name: str):
    return load_service_module(service_name).app
