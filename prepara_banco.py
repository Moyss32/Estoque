import mysql.connector
from mysql.connector import errorcode

print("Conectando...")

try:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='' # <-- Coloca a senha do teu bd aqui
    )
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print('Usuário ou senha incorretos!')
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print('Banco de dados não existe!')
    else:
        print(f'Erro ao conectar: {err}')
else:
    print("Conectado com sucesso!")
    cursor = conn.cursor()

    # dropa e recria banco
    cursor.execute("DROP DATABASE IF EXISTS estoque;")
    cursor.execute("CREATE DATABASE estoque;")
    cursor.execute("USE estoque;")
    print("Banco de dados criado e selecionado.")

    # criando tabelas
    TABLES = {}

    TABLES['Usuarios'] = ('''
        CREATE TABLE usuarios (
        nome VARCHAR(50) NOT NULL,
        nickname VARCHAR(20) NOT NULL,
        senha VARCHAR(100) NOT NULL,
        PRIMARY KEY (nickname)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    ''')

    TABLES['Itens'] = ('''
        CREATE TABLE itens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        categoria VARCHAR(40) NOT NULL,
        quantidade INT NOT NULL,
        preco DECIMAL(10,2) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    ''')

    for tabela_nome, tabela_sql in TABLES.items():
        try:
            print(f'Criando tabela {tabela_nome}:', end=' ')
            cursor.execute(tabela_sql)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print('Já existe')
            else:
                print(err.msg)
        else:
            print('OK')

    # inserindo usuarios
    usuario_sql = 'INSERT INTO usuarios (nome, nickname, senha) VALUES (%s, %s, %s)'
    usuarios = [
        ("Moysés Hedo Voss", "moyses", "1234567"),
        ("Camila Ferreira", "camila", "Kmomila"),
        ("Guilherme", "soja", "agro_eh_vida")
    ]
    cursor.executemany(usuario_sql, usuarios)

    cursor.execute('SELECT * FROM usuarios;')
    print(' -------------  Usuários:  -------------')
    for user in cursor.fetchall():
        print(user[1])  # nickname

    # inserindo itens
    item_sql = 'INSERT INTO itens (nome, categoria, quantidade, preco) VALUES (%s, %s, %s, %s)'
    itens = [
        ("Arroz 5kg", "Alimento", 20, 25.90),
        ("Feijão 1kg", "Alimento", 35, 7.50),
        ("Detergente", "Limpeza", 50, 2.99)
    ]
    cursor.executemany(item_sql, itens)

    cursor.execute('SELECT * FROM itens;')
    print(' -------------  Itens em estoque:  -------------')
    for item in cursor.fetchall():
        print(item[1], "-", item[2], "-", item[3], "unidades")

    # commitando
    conn.commit()
    cursor.close()
    conn.close()
