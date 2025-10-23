# Informações do Banco de Dados

## Supabase

### Credenciais do Projeto

| Campo | Valor |
|-------|-------|
| **URL do Projeto** | https://mnlkzgmhhviodhslyaqn.supabase.co |
| **Chave Anon/Public** | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGt6Z21oaHZpb2Roc2x5YXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTczMDAsImV4cCI6MjA3Njc5MzMwMH0.xPr1IQp2_nI-JjREm6HST3nIpr6wPN87CjtxjMFOyLw |

### Banco de Dados PostgreSQL

| Campo | Valor |
|-------|-------|
| **Nome do Banco** | Cadastro_Clientes |
| **Senha** | 35471433 |
| **Host** | mnlkzgmhhviodhslyaqn.supabase.co |
| **Porta** | 5432 |
| **Usuário** | postgres |

### Tabelas Criadas

- `clientes` - Tabela principal de clientes
- `planos` - Tabela de planos disponíveis
- `logs_clientes` - Tabela de auditoria

### Views Disponíveis

- `clientes_vencimento_proximo` - Clientes com vencimento próximo
- `resumo_receita_plano` - Resumo de receita por plano
- `clientes_com_carneativo` - Clientes que recebem carnê

### Funções Disponíveis

- `gerar_relatorio_clientes()` - Gera relatório completo

## Variáveis de Ambiente

As seguintes variáveis estão configuradas no Vercel:

```
SUPABASE_URL=https://mnlkzgmhhviodhslyaqn.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubGt6Z21oaHZpb2Roc2x5YXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTczMDAsImV4cCI6MjA3Njc5MzMwMH0.xPr1IQp2_nI-JjREm6HST3nIpr6wPN87CjtxjMFOyLw
```

## Conexão Direta ao PostgreSQL

Se você quiser conectar diretamente ao banco PostgreSQL (para ferramentas como pgAdmin, DBeaver, etc.):

```
Host: mnlkzgmhhviodhslyaqn.supabase.co
Port: 5432
Database: Cadastro_Clientes
User: postgres
Password: 35471433
SSL: Required
```

## Backup e Segurança

- Supabase faz backup automático diário
- Você pode fazer backup manual no dashboard do Supabase
- Os dados estão criptografados em trânsito (SSL/TLS)
- As políticas de RLS estão configuradas para segurança

## Monitoramento

No dashboard do Supabase você pode:

- Ver estatísticas de uso
- Monitorar performance
- Ver logs de erro
- Gerenciar backups
- Configurar alertas

## Links Úteis

- **Supabase Dashboard**: https://app.supabase.com
- **SQL Editor**: https://app.supabase.com/project/mnlkzgmhhviodhslyaqn/sql/new
- **Database**: https://app.supabase.com/project/mnlkzgmhhviodhslyaqn/editor

---

**Última atualização**: 23 de outubro de 2025

