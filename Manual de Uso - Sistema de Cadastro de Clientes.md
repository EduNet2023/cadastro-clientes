# Manual de Uso - Sistema de Cadastro de Clientes

## Introdução

O Sistema de Cadastro de Clientes é uma aplicação web moderna para gerenciar clientes, planos e informações de cobrança. Este manual descreve como usar todas as funcionalidades do sistema.

## Acessando o Sistema

### Local (Desenvolvimento)
```
http://localhost:3000
```

### Vercel (Produção)
```
https://seu-projeto.vercel.app
```

## Interface Principal

A interface está dividida em 4 seções principais:

1. **Cabeçalho** - Título e descrição do sistema
2. **Formulário de Cadastro** - Para adicionar/editar clientes
3. **Estatísticas** - Resumo dos dados
4. **Filtros e Tabela** - Visualizar e filtrar clientes

## Seção 1: Cadastrar/Editar Cliente

### Campos Disponíveis

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Nome do Cliente | Texto | ✅ Sim | Nome completo do cliente |
| Telefone | Tel | ❌ Não | Telefone para contato |
| Endereço | Texto | ❌ Não | Endereço completo |
| Data do Cadastro | Data | ❌ Não | Data de cadastro (auto-preenchida com hoje) |
| Plano | Select | ❌ Não | Tipo de plano contratado |
| Valor do Plano | Número | ❌ Não | Valor mensal (auto-preenchido) |
| Data de Vencimento | Select | ❌ Não | Dia do mês do vencimento |
| Tem Carnê | Checkbox | ❌ Não | Se o cliente recebe carnê |
| Observações | Texto | ❌ Não | Notas adicionais |

### Planos Disponíveis

| Plano | Valor |
|-------|-------|
| Básico | R$ 80,00 |
| Padrão | R$ 90,00 |
| Profissional | R$ 100,00 |
| Premium | R$ 120,00 |
| Empresarial | R$ 149,00 |

### Datas de Vencimento

- 5º dia do mês
- 10º dia do mês
- 15º dia do mês
- 20º dia do mês
- 25º dia do mês
- 30º dia do mês

### Como Cadastrar um Novo Cliente

1. Preencha o campo **Nome do Cliente** (obrigatório)
2. Preencha os demais campos conforme necessário
3. Selecione um **Plano** (o valor será preenchido automaticamente)
4. Selecione a **Data de Vencimento**
5. Marque **Tem Carnê** se aplicável
6. Clique em **💾 Salvar Cliente**

Uma mensagem de sucesso aparecerá e o cliente será adicionado à tabela abaixo.

### Como Editar um Cliente

1. Localize o cliente na tabela abaixo
2. Clique no botão **✏️ Editar** na linha do cliente
3. O formulário será preenchido com os dados do cliente
4. Faça as alterações desejadas
5. Clique em **💾 Salvar Cliente**

### Como Limpar o Formulário

Clique no botão **🔄 Limpar** para limpar todos os campos e começar um novo cadastro.

## Seção 2: Estatísticas

Três cartões mostram informações resumidas:

- **Total de Clientes**: Número total de clientes cadastrados
- **Receita Mensal**: Soma de todos os valores dos planos
- **Clientes com Carnê**: Quantidade de clientes que recebem carnê

Essas estatísticas são atualizadas automaticamente ao adicionar, editar ou deletar clientes.

## Seção 3: Filtros

Use os filtros para encontrar clientes específicos:

### Filtro por Data de Vencimento
Mostra apenas clientes cujo vencimento é no dia selecionado.

### Filtro por Plano
Mostra apenas clientes do plano selecionado.

### Filtro por Carnê
- **Tem Carnê**: Mostra apenas clientes que recebem carnê
- **Sem Carnê**: Mostra apenas clientes que não recebem carnê
- **Todos**: Mostra todos os clientes

### Buscar por Nome
Digite o nome (ou parte dele) para buscar clientes. A busca é em tempo real.

### Combinando Filtros

Você pode usar múltiplos filtros simultaneamente. Por exemplo:
- Filtrar por plano "Profissional" + vencimento "15º dia" para ver todos os clientes profissionais que vencem no 15º

## Seção 4: Lista de Clientes

A tabela mostra todos os clientes cadastrados (ou filtrados), ordenados alfabeticamente por nome.

### Colunas da Tabela

| Coluna | Descrição |
|--------|-----------|
| ID | Identificador único (automático) |
| Nome | Nome do cliente |
| Telefone | Telefone para contato |
| Endereço | Endereço completo |
| Data Cadastro | Data do cadastro |
| Plano | Tipo de plano |
| Valor (R$) | Valor mensal do plano |
| Vencimento | Dia do mês do vencimento |
| Carnê | Sim/Não |
| Ações | Botões de ação |

### Botões de Ação

#### ✏️ Editar
Carrega os dados do cliente no formulário para edição.

#### 🗑️ Deletar
Remove o cliente do sistema. Uma confirmação será solicitada.

#### 👁️ Ver
Abre uma janela com todos os detalhes do cliente.

## Funcionalidades Especiais

### 📊 Gerar Relatório

1. Clique no botão **📊 Relatório**
2. Um arquivo `.txt` será baixado com todos os dados dos clientes
3. O relatório inclui:
   - Data do relatório
   - Total de clientes
   - Detalhes completos de cada cliente

### 🖨️ Imprimir Ficha

1. Selecione um cliente (clicando em **✏️ Editar**)
2. Clique no botão **🖨️ Imprimir Ficha**
3. Uma janela de impressão será aberta
4. Configure as opções de impressão e clique em **Imprimir**

A ficha contém:
- ID do cliente
- Nome
- Telefone
- Endereço
- Data de cadastro
- Plano e valor
- Data de vencimento
- Informação sobre carnê
- Observações
- Data e hora de impressão

## Dicas de Uso

### Organização

1. **Use nomes padronizados**: "João Silva" em vez de "joao silva" ou "JOÃO SILVA"
2. **Telefones**: Inclua o DDD, ex: "(11) 98765-4321"
3. **Endereços**: Seja específico, inclua número e complemento

### Filtros

1. **Vencimentos**: Use para planejar cobranças
2. **Planos**: Use para análise de receita por plano
3. **Carnê**: Use para saber quem precisa de carnê impresso

### Relatórios

1. **Mensal**: Gere um relatório no final de cada mês
2. **Backup**: Guarde os arquivos de relatório como backup
3. **Análise**: Use para análise de crescimento

### Impressão

1. **Antes de imprimir**: Verifique os dados do cliente
2. **Formato**: Escolha "Paisagem" para melhor visualização
3. **Cópias**: Imprima quantas cópias precisar

## Troubleshooting

### Problema: Não consigo salvar um cliente

**Solução**: Verifique se o campo "Nome do Cliente" está preenchido. É o único campo obrigatório.

### Problema: Os dados desaparecem após recarregar a página

**Solução**: Isso é normal se estiver usando SQLite localmente. Para persistência, faça deploy no Vercel com um banco de dados externo.

### Problema: Os filtros não funcionam

**Solução**: Verifique se há clientes que correspondem aos critérios de filtro.

### Problema: A impressão está com formatação estranha

**Solução**: 
1. Ajuste as margens da página
2. Use "Paisagem" em vez de "Retrato"
3. Desabilite "Cabeçalhos e rodapés" nas opções de impressão

### Problema: Não consigo deletar um cliente

**Solução**: Confirme a exclusão quando a caixa de diálogo aparecer.

## Segurança

### Dados Sensíveis

- Não compartilhe a URL do sistema com pessoas não autorizadas
- Considere adicionar autenticação (login/senha)
- Faça backup regular dos dados

### Backup

1. Use a funcionalidade de **Relatório** regularmente
2. Salve os arquivos em local seguro
3. Considere usar um serviço de backup em nuvem

## Acessibilidade

O sistema é responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone

### Navegação por Teclado

- **Tab**: Navegar entre campos
- **Enter**: Submeter formulário
- **Esc**: Fechar modais

## Suporte

Para dúvidas ou problemas:

1. Verifique este manual
2. Tente limpar o cache do navegador (Ctrl+Shift+Del)
3. Tente usar outro navegador
4. Abra uma issue no GitHub do projeto

## Changelog

### Versão 1.0.0 (Inicial)
- ✅ Cadastro completo de clientes
- ✅ Edição e exclusão
- ✅ Filtros avançados
- ✅ Geração de relatórios
- ✅ Impressão de fichas
- ✅ Estatísticas em tempo real
- ✅ Interface responsiva

## Licença

Este sistema é fornecido como está, sem garantias.

---

**Última atualização**: 23 de outubro de 2025

