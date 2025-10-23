# Sistema de Cadastro de Clientes

Um sistema web completo para gerenciamento de clientes, com funcionalidades de CRUD, relatórios e impressão de fichas.

## Recursos

- ✅ Cadastro completo de clientes
- ✅ Edição e exclusão de registros
- ✅ Filtros por data de vencimento, plano e carnê
- ✅ Busca por nome
- ✅ Geração de relatórios em TXT
- ✅ Impressão de fichas individuais
- ✅ Estatísticas em tempo real
- ✅ Interface responsiva e moderna
- ✅ Banco de dados SQLite
- ✅ API REST completa

## Campos do Cliente

- **ID do Cliente** (automático)
- **Nome do Cliente** (obrigatório)
- **Telefone**
- **Endereço**
- **Data do Cadastro** (automática, editável)
- **Plano** (Básico, Padrão, Profissional, Premium, Empresarial)
- **Valor do Plano** (R$ 80,00 a R$ 149,00 - automático)
- **Data de Vencimento** (5º, 10º, 15º, 20º, 25º ou 30º dia)
- **Tem Carnê** (Sim/Não)
- **Observações**

## Instalação Local

### Pré-requisitos
- Node.js 14+
- npm ou yarn

### Passos

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd cadastro-clientes
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o servidor
```bash
npm run dev
```

4. Abra no navegador
```
http://localhost:3000
```

## Deploy no Vercel

### Opção 1: Via GitHub (Recomendado)

1. Faça push do projeto para GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <seu-repositorio-github>
git push -u origin main
```

2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Selecione seu repositório GitHub
5. Clique em "Deploy"

### Opção 2: Deploy Direto via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Estrutura do Projeto

```
cadastro-clientes/
├── api/
│   └── index.js           # Backend Express + SQLite
├── public/
│   └── index.html         # Frontend HTML/CSS/JS
├── package.json           # Dependências
├── vercel.json           # Configuração Vercel
├── .gitignore            # Arquivos ignorados
└── README.md             # Este arquivo
```

## API Endpoints

### GET /api/clientes
Retorna lista de todos os clientes (ordenados alfabeticamente)

### GET /api/clientes/:id
Retorna detalhes de um cliente específico

### POST /api/clientes
Cria um novo cliente
```json
{
  "nome": "João Silva",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua A, 123",
  "data_cadastro": "2024-01-15",
  "plano": "Profissional",
  "valor_plano": 100.00,
  "data_vencimento": 15,
  "carneativo": true,
  "observacoes": "Cliente importante"
}
```

### PUT /api/clientes/:id
Atualiza um cliente existente (mesmo formato do POST)

### DELETE /api/clientes/:id
Deleta um cliente

## Funcionalidades

### Formulário de Cadastro
- Campos automáticos (ID, data de cadastro)
- Validação de dados
- Atualização automática do valor do plano
- Botões: Salvar, Limpar, Relatório, Imprimir Ficha

### Tabela de Clientes
- Ordenação alfabética automática
- Filtros por: vencimento, plano, carnê, nome
- Ações: Editar, Deletar, Ver Detalhes
- Responsiva para mobile

### Relatórios
- Geração de relatório em TXT
- Download automático
- Inclui todos os dados do cliente

### Impressão
- Ficha formatada para impressão
- Dados completos do cliente
- Data e hora de impressão

### Estatísticas
- Total de clientes
- Receita mensal total
- Total de clientes com carnê

## Notas Importantes

- O banco de dados SQLite é criado automaticamente na primeira execução
- Em produção (Vercel), o banco é armazenado em `/tmp/` (temporário)
- Para persistência em produção, considere usar um banco de dados externo (PostgreSQL, MySQL, etc.)
- Todos os dados são validados no backend

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## Licença

MIT

