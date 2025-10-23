-- ============================================================================
-- SCRIPT DE CONFIGURAÇÃO - SISTEMA DE CADASTRO DE CLIENTES
-- Supabase PostgreSQL
-- ============================================================================
-- Cole este script completo no SQL Editor do Supabase
-- ============================================================================

-- 1. CRIAR TABELA CLIENTES
-- ============================================================================
CREATE TABLE IF NOT EXISTS clientes (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT,
  endereco TEXT,
  data_cadastro DATE DEFAULT CURRENT_DATE,
  plano TEXT,
  valor_plano DECIMAL(10,2),
  data_vencimento INTEGER,
  carneativo BOOLEAN DEFAULT FALSE,
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CRIAR ÍNDICES PARA MELHOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_clientes_nome ON clientes(nome ASC);
CREATE INDEX IF NOT EXISTS idx_clientes_plano ON clientes(plano);
CREATE INDEX IF NOT EXISTS idx_clientes_data_vencimento ON clientes(data_vencimento);
CREATE INDEX IF NOT EXISTS idx_clientes_carneativo ON clientes(carneativo);
CREATE INDEX IF NOT EXISTS idx_clientes_data_cadastro ON clientes(data_cadastro);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- 4. CRIAR POLÍTICAS DE SEGURANÇA
-- ============================================================================
-- Política para permitir SELECT (leitura) para todos
CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT
  USING (true);

-- Política para permitir INSERT (criação) para todos
CREATE POLICY "Permitir criação de clientes" ON clientes
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir UPDATE (edição) para todos
CREATE POLICY "Permitir edição de clientes" ON clientes
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política para permitir DELETE (exclusão) para todos
CREATE POLICY "Permitir exclusão de clientes" ON clientes
  FOR DELETE
  USING (true);

-- 5. CRIAR FUNÇÃO PARA ATUALIZAR TIMESTAMP
-- ============================================================================
CREATE OR REPLACE FUNCTION atualizar_timestamp_clientes()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. CRIAR TRIGGER PARA ATUALIZAR TIMESTAMP
-- ============================================================================
CREATE TRIGGER trigger_atualizar_timestamp_clientes
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE FUNCTION atualizar_timestamp_clientes();

-- 7. CRIAR TABELA DE PLANOS (OPCIONAL - PARA REFERÊNCIA)
-- ============================================================================
CREATE TABLE IF NOT EXISTS planos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  valor DECIMAL(10,2) NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. INSERIR PLANOS PADRÃO
-- ============================================================================
INSERT INTO planos (nome, valor, descricao) VALUES
  ('Básico', 80.00, 'Plano básico com funcionalidades essenciais'),
  ('Padrão', 90.00, 'Plano padrão com mais recursos'),
  ('Profissional', 100.00, 'Plano profissional com suporte prioritário'),
  ('Premium', 120.00, 'Plano premium com recursos avançados'),
  ('Empresarial', 149.00, 'Plano empresarial com suporte 24/7')
ON CONFLICT (nome) DO NOTHING;

-- 9. CRIAR TABELA DE LOGS (OPCIONAL - PARA AUDITORIA)
-- ============================================================================
CREATE TABLE IF NOT EXISTS logs_clientes (
  id BIGSERIAL PRIMARY KEY,
  cliente_id BIGINT REFERENCES clientes(id) ON DELETE CASCADE,
  acao TEXT NOT NULL,
  dados_antigos JSONB,
  dados_novos JSONB,
  usuario TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. CRIAR ÍNDICE PARA LOGS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_logs_cliente_id ON logs_clientes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_logs_criado_em ON logs_clientes(criado_em);

-- 11. CRIAR FUNÇÃO PARA REGISTRAR LOGS
-- ============================================================================
CREATE OR REPLACE FUNCTION registrar_log_clientes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO logs_clientes (cliente_id, acao, dados_novos)
    VALUES (NEW.id, 'INSERT', row_to_json(NEW));
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO logs_clientes (cliente_id, acao, dados_antigos, dados_novos)
    VALUES (NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW));
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO logs_clientes (cliente_id, acao, dados_antigos)
    VALUES (OLD.id, 'DELETE', row_to_json(OLD));
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 12. CRIAR TRIGGER PARA REGISTRAR LOGS
-- ============================================================================
CREATE TRIGGER trigger_registrar_log_clientes
AFTER INSERT OR UPDATE OR DELETE ON clientes
FOR EACH ROW
EXECUTE FUNCTION registrar_log_clientes();

-- 13. CRIAR VIEWS ÚTEIS
-- ============================================================================

-- View: Clientes com informações de vencimento próximo
CREATE OR REPLACE VIEW clientes_vencimento_proximo AS
SELECT 
  id,
  nome,
  telefone,
  plano,
  valor_plano,
  data_vencimento,
  carneativo,
  CASE 
    WHEN data_vencimento <= EXTRACT(DAY FROM CURRENT_DATE) THEN 'Vencido'
    WHEN data_vencimento - EXTRACT(DAY FROM CURRENT_DATE) <= 7 THEN 'Vence em breve'
    ELSE 'Ativo'
  END as status_vencimento
FROM clientes
ORDER BY data_vencimento ASC;

-- View: Resumo de receita por plano
CREATE OR REPLACE VIEW resumo_receita_plano AS
SELECT 
  plano,
  COUNT(*) as total_clientes,
  SUM(valor_plano) as receita_total,
  AVG(valor_plano) as receita_media
FROM clientes
WHERE plano IS NOT NULL
GROUP BY plano
ORDER BY receita_total DESC;

-- View: Clientes com carnê
CREATE OR REPLACE VIEW clientes_com_carneativo AS
SELECT 
  id,
  nome,
  telefone,
  endereco,
  plano,
  valor_plano,
  data_vencimento
FROM clientes
WHERE carneativo = TRUE
ORDER BY nome ASC;

-- 14. CRIAR FUNÇÃO PARA GERAR RELATÓRIO
-- ============================================================================
CREATE OR REPLACE FUNCTION gerar_relatorio_clientes()
RETURNS TABLE (
  total_clientes BIGINT,
  receita_total DECIMAL,
  clientes_com_carneativo BIGINT,
  plano_mais_popular TEXT,
  data_relatorio TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT,
    COALESCE(SUM(valor_plano), 0)::DECIMAL,
    COUNT(*) FILTER (WHERE carneativo = TRUE)::BIGINT,
    (SELECT plano FROM clientes WHERE plano IS NOT NULL GROUP BY plano ORDER BY COUNT(*) DESC LIMIT 1)::TEXT,
    CURRENT_TIMESTAMP::TIMESTAMP
  FROM clientes;
END;
$$ LANGUAGE plpgsql;

-- 15. COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================================================
COMMENT ON TABLE clientes IS 'Tabela principal de clientes do sistema de cadastro';
COMMENT ON COLUMN clientes.id IS 'Identificador único do cliente (auto-incrementado)';
COMMENT ON COLUMN clientes.nome IS 'Nome completo do cliente (obrigatório)';
COMMENT ON COLUMN clientes.telefone IS 'Telefone para contato';
COMMENT ON COLUMN clientes.endereco IS 'Endereço completo do cliente';
COMMENT ON COLUMN clientes.data_cadastro IS 'Data do cadastro do cliente';
COMMENT ON COLUMN clientes.plano IS 'Tipo de plano contratado (Básico, Padrão, Profissional, Premium, Empresarial)';
COMMENT ON COLUMN clientes.valor_plano IS 'Valor mensal do plano em reais';
COMMENT ON COLUMN clientes.data_vencimento IS 'Dia do mês do vencimento (1-30)';
COMMENT ON COLUMN clientes.carneativo IS 'Indica se o cliente recebe carnê impresso';
COMMENT ON COLUMN clientes.observacoes IS 'Notas e observações adicionais sobre o cliente';
COMMENT ON COLUMN clientes.criado_em IS 'Timestamp de criação do registro';
COMMENT ON COLUMN clientes.atualizado_em IS 'Timestamp da última atualização';

COMMENT ON TABLE planos IS 'Tabela de planos disponíveis no sistema';
COMMENT ON TABLE logs_clientes IS 'Tabela de auditoria com histórico de alterações';

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================
-- Tudo pronto! Seu banco de dados está configurado e pronto para usar.
-- ============================================================================

