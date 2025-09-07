from flask import jsonify, request, session
from flask_cors import CORS
from main import app, db
CORS(app, supports_credentials=True)
from models import Itens, Usuarios
from werkzeug.security import generate_password_hash, check_password_hash

def item_to_dict(item):
    return {
        'id': item.id,
        'nome': item.nome,
        'categoria': item.categoria,
        'quantidade': item.quantidade,
        'preco': item.preco
    }

# ---------- Itens ----------
@app.route('/api/itens', methods=['GET'])
def api_list_itens():
    itens = Itens.query.order_by(Itens.id).all()
    return jsonify([item_to_dict(i) for i in itens])

@app.route('/api/itens/<int:item_id>', methods=['GET'])
def api_get_item(item_id):
    item = Itens.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item não encontrado'}), 404
    return jsonify(item_to_dict(item))

@app.route('/api/itens', methods=['POST'])
def api_create_item():
    data = request.get_json() or {}
    required = ['nome', 'categoria', 'quantidade', 'preco']
    for r in required:
        if r not in data:
            return jsonify({'error': f'Campo obrigatório: {r}'}), 400
    item = Itens(nome=data['nome'], categoria=data['categoria'],
                 quantidade=int(data['quantidade']), preco=float(data['preco']))
    db.session.add(item)
    db.session.commit()
    return jsonify(item_to_dict(item)), 201

@app.route('/api/itens/<int:item_id>', methods=['PUT'])
def api_update_item(item_id):
    item = Itens.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item não encontrado'}), 404
    data = request.get_json() or {}
    if 'nome' in data:
        item.nome = data['nome']
    if 'categoria' in data:
        item.categoria = data['categoria']
    if 'quantidade' in data:
        item.quantidade = int(data['quantidade'])
    if 'preco' in data:
        item.preco = float(data['preco'])
    db.session.commit()
    return jsonify(item_to_dict(item))

@app.route('/api/itens/<int:item_id>', methods=['DELETE'])
def api_delete_item(item_id):
    item = Itens.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item não encontrado'}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({'result': 'Item apagado'})

# ---------- Usuários / Auth ----------
@app.route('/api/usuarios', methods=['POST'])
def api_create_user():
    data = request.get_json() or {}
    required = ['nickname', 'nome', 'senha']
    for r in required:
        if r not in data:
            return jsonify({'error': f'Campo obrigatório: {r}'}), 400
    nickname = data['nickname']
    if Usuarios.query.filter_by(nickname=nickname).first():
        return jsonify({'error': 'Usuário já existente'}), 400
    hashed = generate_password_hash(data['senha'])
    u = Usuarios(nome=data['nome'], nickname=nickname, senha=hashed)
    db.session.add(u)
    db.session.commit()
    return jsonify({'result': 'Usuário criado'}), 201

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    nickname = data.get('nickname')
    senha = data.get('senha')
    if not nickname or not senha:
        return jsonify({'error': 'nickname e senha são necessários'}), 400
    u = Usuarios.query.filter_by(nickname=nickname).first()
    if not u or (not check_password_hash(u.senha, senha) and u.senha != senha):
        return jsonify({'error': 'Credenciais inválidas'}), 401
    session['usuario_logado'] = nickname
    return jsonify({'result': 'Logado com sucesso', 'usuario': nickname})

@app.route('/api/logout', methods=['POST'])
def api_logout():
    session.pop('usuario_logado', None)
    return jsonify({'result': 'Deslogado'})

@app.route('/api/me', methods=['GET'])
def api_me():
    nick = session.get('usuario_logado')
    if not nick:
        return jsonify({'usuario': None})
    u = Usuarios.query.filter_by(nickname=nick).first()
    if not u:
        return jsonify({'usuario': None})
    return jsonify({'usuario': {'nickname': u.nickname, 'nome': u.nome}})