CREATE TABLE
  IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS categorias (id SERIAL PRIMARY KEY, descricao TEXT NOT NULL);

INSERT INTO
  categorias (descricao)
values
  ('Informatica'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

CREATE TABLE
  IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INT NOT NULL,
    categoria_id INT REFERENCES categorias (id)
  );

CREATE TABLE
  IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    cep VARCHAR(8),
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado VARCHAR(2)
  );

CREATE TABLE
  IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes (id),
    observacao TEXT,
    valor_total INT NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos (id),
    produto_id INT REFERENCES produtos (id),
    quantidade_produto INT NOT NULL,
    valor_produto INT NOT NULL
  );

ALTER TABLE produtos
ADD COLUMN produto_imagem TEXT;