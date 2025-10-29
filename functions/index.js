const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Inicializar Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mnlkzgmhhviodhslyaqn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGt6Z21oaHZpb2Roc2x5YXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTczMDAsImV4cCI6MjA3Njc5MzMwMH0.xPr1IQp2_nI-JjREm6HST3nIpr6wPN87CjtxjMFOyLw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Inicializar tabela no Supabase (se não existir)
async function initializeDatabase() {
  try {
    // Verificar se a tabela existe tentando fazer uma query
    const { data, error } = await supabase
      .from('clientes')
      .select('id')
      .limit(1);

    if (error && error.code === 'PGRST116') {
      // Tabela não existe, criar via SQL
      console.log('Criando tabela clientes no Supabase...');
      const { error: createError } = await supabase.rpc('create_clientes_table');
      if (createError) {
        console.log('Tabela pode já existir ou será criada automaticamente');
      }
    }
    console.log('Conectado ao Supabase com sucesso');
  } catch (err) {
    console.error('Erro ao inicializar banco de dados:', err);
  }
}

initializeDatabase();

// ROTAS API

// GET - Listar todos os clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nome', { ascending: true });

    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.json(data || []);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET - Obter cliente por ID
app.get('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST - Criar novo cliente
app.post('/api/clientes', async (req, res) => {
  try {
    const { nome, telefone, endereco, data_cadastro, plano, valor_plano, data_vencimento, carneativo, observacoes } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const { data, error } = await supabase
      .from('clientes')
      .insert([
        {
          nome,
          telefone: telefone || null,
          endereco: endereco || null,
          data_cadastro: data_cadastro || new Date().toISOString().split('T')[0],
          plano: plano || null,
          valor_plano: valor_plano || null,
          data_vencimento: data_vencimento || null,
          carneativo: carneativo ? true : false,
          observacoes: observacoes || null
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.json({ id: data[0].id, mensagem: 'Cliente criado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT - Atualizar cliente
app.put('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, endereco, data_cadastro, plano, valor_plano, data_vencimento, carneativo, observacoes } = req.body;

    const { error } = await supabase
      .from('clientes')
      .update({
        nome,
        telefone: telefone || null,
        endereco: endereco || null,
        data_cadastro,
        plano: plano || null,
        valor_plano: valor_plano || null,
        data_vencimento: data_vencimento || null,
        carneativo: carneativo ? true : false,
        observacoes: observacoes || null,
        atualizado_em: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.json({ mensagem: 'Cliente atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE - Deletar cliente
app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ erro: error.message });
    }

    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
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

