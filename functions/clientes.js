const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mnlkzgmhhviodhslyaqn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGt6Z21oaHZpb2Roc2x5YXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTczMDAsImV4cCI6MjA3Njc5MzMwMH0.xPr1IQp2_nI-JjREm6HST3nIpr6wPN87CjtxjMFOyLw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  console.log('Função chamada:', event.httpMethod, event.path);

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  try {
    const method = event.httpMethod;
    const path = event.path || '';
    const pathParts = path.split('/').filter(p => p);
    
    console.log('Path:', path, 'Parts:', pathParts);

    // GET /api/clientes - Listar todos os clientes
    if (method === 'GET' && (pathParts.includes('clientes') || path === '/api/clientes' || path.includes('clientes'))) {
      console.log('Buscando clientes...');
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (error) {
        console.error('Erro ao buscar:', error);
        throw error;
      }
      
      console.log('Clientes encontrados:', data?.length || 0);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data || [])
      };
    }

    // POST /api/clientes - Criar novo cliente
    if (method === 'POST' && (pathParts.includes('clientes') || path === '/api/clientes' || path.includes('clientes'))) {
      console.log('Criando novo cliente...');
      const body = JSON.parse(event.body);
      console.log('Dados recebidos:', body);
      
      const { data, error } = await supabase
        .from('clientes')
        .insert([body])
        .select();

      if (error) {
        console.error('Erro ao criar:', error);
        throw error;
      }
      
      console.log('Cliente criado:', data[0]);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(data[0])
      };
    }

    // PUT /api/clientes/:id - Atualizar cliente
    if (method === 'PUT' && pathParts.includes('clientes')) {
      const id = pathParts[pathParts.indexOf('clientes') + 1];
      console.log('Atualizando cliente:', id);
      
      const body = JSON.parse(event.body);
      const { data, error } = await supabase
        .from('clientes')
        .update(body)
        .eq('id', parseInt(id))
        .select();

      if (error) {
        console.error('Erro ao atualizar:', error);
        throw error;
      }
      
      console.log('Cliente atualizado:', data[0]);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data[0])
      };
    }

    // DELETE /api/clientes/:id - Deletar cliente
    if (method === 'DELETE' && pathParts.includes('clientes')) {
      const id = pathParts[pathParts.indexOf('clientes') + 1];
      console.log('Deletando cliente:', id);
      
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', parseInt(id));

      if (error) {
        console.error('Erro ao deletar:', error);
        throw error;
      }
      
      console.log('Cliente deletado');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
      };
    }

    console.log('Rota não encontrada:', method, path);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Rota não encontrada' })
    };
  } catch (error) {
    console.error('Erro na função:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

