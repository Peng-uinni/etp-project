from .extension import router as ExtensionRouter
from .auth import router as AuthRouter
from .user import router as UserRouter

#get routes only return data not pages
#pages will be handled by the frontend router