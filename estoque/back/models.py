from main import db

class Itens(db.Model):
    __tablename__ = 'itens'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    categoria = db.Column(db.String(40), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    preco = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Item {self.nome} - {self.categoria} ({self.quantidade} un.) R${self.preco:.2f}>"
    

class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    
    nome = db.Column(db.String(40), nullable=False)
    nickname = db.Column(db.String(40), primary_key=True)
    senha = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Usuario {self.nickname}>"
