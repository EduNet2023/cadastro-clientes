const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Inicializar banco de dados
const dbPath = process.env.NODE_ENV === 'production' ? '/tmp/clientes.db' : path.join(__dirname, '../clientes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    initializeDatabase();
  }
});

// Inicializar tabela
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      endereco TEXT,
      data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP,
      plano TEXT,
      valor_plano REAL,
      data_vencimento INTEGER,
      carneativo INTEGER DEFAULT 0,
      observacoes TEXT,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
    } else {
      console.log('Tabela de clientes pronta');
    }
  });
}

// ROTAS API

// GET - Listar todos os clientes
app.get('/api/clientes', (req, res) => {
  const query = `SELECT * FROM clientes ORDER BY nome ASC`;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// GET - Obter cliente por ID
app.get('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else if (!row) {
      res.status(404).json({ erro: 'Cliente não encontrado' });
    } else {
      res.json(row);
    }
  });
});

// POST - Criar novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, telefone, endereco, data_cadastro, plano, valor_plano, data_vencimento, carneativo, observacoes } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' });
  }

  const query = `
    INSERT INTO clientes (nome, telefone, endereco, data_cadastro, plano, valor_plano, data_vencimento, carneativo, observacoes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [nome, telefone, endereco, data_cadastro || new Date().toISOString().split('T')[0], plano, valor_plano, data_vencimento, carneativo ? 1 : 0, observacoes], function(err) {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else {
      res.json({ id: this.lastID, mensagem: 'Cliente criado com sucesso' });
    }
  });
});

// PUT - Atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, endereco, data_cadastro, plano, valor_plano, data_vencimento, carneativo, observacoes } = req.body;

  const query = `
    UPDATE clientes 
    SET nome = ?, telefone = ?, endereco = ?, data_cadastro = ?, plano = ?, valor_plano = ?, data_vencimento = ?, carneativo = ?, observacoes = ?, atualizado_em = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [nome, telefone, endereco, data_cadastro, plano, valor_plano, data_vencimento, carneativo ? 1 : 0, observacoes, id], function(err) {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ erro: 'Cliente não encontrado' });
    } else {
      res.json({ mensagem: 'Cliente atualizado com sucesso' });
    }
  });
});

// DELETE - Deletar cliente
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM clientes WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ erro: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ erro: 'Cliente não encontrado' });
    } else {
      res.json({ mensagem: 'Cliente deletado com sucesso' });
    }
  });
});

// Servir arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;

