from flask import session, request

from google.oauth2 import id_token
from google.auth.transport import requests

from functools import wraps

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if(request.headers['Authtoken']):
            try:
                idinfo = id_token.verify_oauth2_token(request.headers['Authtoken'], requests.Request(), "1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com")    
                return f(*args, **kwargs)
            except ValueError:
                return 'You aint logged in, no page for u!'
        else:
            return 'No tokenID passed !'
    return decorated_function