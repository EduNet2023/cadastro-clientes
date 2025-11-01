const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mnlkzgmhhviodhslyaqn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGt6Z21oaHZpb2Roc2x5YXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTczMDAsImV4cCI6MjA3Njc5MzMwMH0.xPr1IQp2_nI-JjREm6HST3nIpr6wPN87CjtxjMFOyLw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  try {
    const path = event.path.split('/').filter(p => p);
    const method = event.httpMethod;

    // GET /api/clientes - Listar todos os clientes
    if (method === 'GET' && path[1] === 'clientes' && !path[2]) {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data || [])
      };
    }

    // GET /api/clientes/:id - Obter cliente específico
    if (method === 'GET' && path[1] === 'clientes' && path[2]) {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', parseInt(path[2]))
        .single();

      if (error) throw error;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    // POST /api/clientes - Criar novo cliente
    if (method === 'POST' && path[1] === 'clientes') {
      const body = JSON.parse(event.body);
      const { data, error } = await supabase
        .from('clientes')
        .insert([body])
        .select();

      if (error) throw error;
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(data[0])
      };
    }

    // PUT /api/clientes/:id - Atualizar cliente
    if (method === 'PUT' && path[1] === 'clientes' && path[2]) {
      const body = JSON.parse(event.body);
      const { data, error } = await supabase
        .from('clientes')
        .update(body)
        .eq('id', parseInt(path[2]))
        .select();

      if (error) throw error;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data[0])
      };
    }

    // DELETE /api/clientes/:id - Deletar cliente
    if (method === 'DELETE' && path[1] === 'clientes' && path[2]) {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', parseInt(path[2]));

      if (error) throw error;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Rota não encontrada' })
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

