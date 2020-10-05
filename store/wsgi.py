import os

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "store.settings")

application = get_wsgi_application()
application = WhiteNoise(application)
application.add_files(root=os.path.join(BASE_DIR, "front_end/build"))

