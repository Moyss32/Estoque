from flask import render_template, request, redirect, session, flash, url_for, send_from_directory
from main import app, db
from models import Itens, Usuarios

# Página inicial: lista de itens
@app.route('/')
def index():
    lista = Itens.query.order_by(Itens.id)
    return render_template('lista.html', titulo='Itens em Estoque', itens=lista)

# Formulário para novo item
@app.route('/novo')
def novo():
    if 'usuario_logado' not in session or session['usuario_logado'] is None:
        return redirect(url_for('login', proxima=url_for('novo')))
    return render_template('novo.html', titulo='Novo Item')

# Criar item
@app.route('/criar', methods=['POST'])
def criar():
    nome = request.form['nome']
    categoria = request.form['categoria']
    quantidade = int(request.form['quantidade'])
    preco = float(request.form['preco'])

    item_existente = Itens.query.filter_by(nome=nome).first()
    if item_existente:
        flash('Item já existente!')
        return redirect(url_for('index'))

    novo_item = Itens(nome=nome, categoria=categoria, quantidade=quantidade, preco=preco)
    db.session.add(novo_item)
    db.session.commit()

    flash(f'Item {nome} adicionado com sucesso!')
    return redirect(url_for('index'))

# Editar item
@app.route('/editar/<int:id>')
def editar(id):
    if 'usuario_logado' not in session or session['usuario_logado'] is None:
        return redirect(url_for('login', proxima=url_for('editar', id=id)))
    item = Itens.query.filter_by(id=id).first()
    return render_template('editar.html', titulo='Editando Item', item=item)

# Atualizar item
@app.route('/atualizar', methods=['POST'])
def atualizar():
    item = Itens.query.filter_by(id=request.form['id']).first()
    item.nome = request.form['nome']
    item.categoria = request.form['categoria']
    item.quantidade = int(request.form['quantidade'])
    item.preco = float(request.form['preco'])

    db.session.add(item)
    db.session.commit()

    flash(f'Item {item.nome} atualizado com sucesso!')
    return redirect(url_for('index'))

# Deletar item
@app.route('/deletar/<int:id>')
def deletar(id):
    if 'usuario_logado' not in session or session['usuario_logado'] is None:
        return redirect(url_for('login'))

    Itens.query.filter_by(id=id).delete()
    db.session.commit()
    flash('Item deletado com sucesso!')
    return redirect(url_for('index'))

# Login
@app.route('/login')
def login():
    proxima = request.args.get('proxima')
    return render_template('login.html', proxima=proxima)

@app.route('/autenticar', methods=['POST'])
def autenticar():
    usuario = Usuarios.query.filter_by(nickname=request.form['usuario']).first()
    if usuario and request.form['senha'] == usuario.senha:
        session['usuario_logado'] = usuario.nickname
        flash(usuario.nickname + ' logado com sucesso!')
        proxima_pagina = request.form['proxima']
        return redirect(proxima_pagina)
    else:
        flash('Usuário ou senha inválidos.')
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session['usuario_logado'] = None
    flash('Logout efetuado com sucesso!')
    return redirect(url_for('index'))

# Cadastro de novo usuário
@app.route('/novo_usuario')
def novo_usuario():
    return render_template('novo_usuario.html', titulo='Novo Usuário')

@app.route('/criar_usuario', methods=['POST'])
def criar_usuario():
    nickname = request.form['nickname']
    nome = request.form['nome']
    senha = request.form['senha']

    usuario_existente = Usuarios.query.filter_by(nickname=nickname).first()
    if usuario_existente:
        flash('Usuário já existente!')
        return redirect(url_for('login'))

    novo_usuario = Usuarios(nome=nome, nickname=nickname, senha=senha)
    db.session.add(novo_usuario)
    db.session.commit()

    flash(f'Usuário {nickname} criado com sucesso!')
    return redirect(url_for('login'))
