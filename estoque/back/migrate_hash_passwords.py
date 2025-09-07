from main import db
from models import Usuarios
from werkzeug.security import generate_password_hash
from main import app

with app.app_context():
    usuarios = Usuarios.query.all()
    updated = 0
    for u in usuarios:
        # heurística simples: senhas hashed geralmente começam com 'pbkdf2:' or 'sha' 
        if u.senha and not (u.senha.startswith('pbkdf2:') or u.senha.startswith('sha') or u.senha.startswith('argon2:')):
            u.senha = generate_password_hash(u.senha)
            updated += 1
    db.session.commit()
    print(f"Senhas atualizadas (hash): {updated}")
