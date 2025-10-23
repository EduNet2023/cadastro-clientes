# Guia de Deploy - Sistema de Cadastro de Clientes

## Deploy no Vercel (Recomendado)

O Vercel é a plataforma ideal para hospedar este projeto. Ele oferece deploy automático, SSL gratuito e suporte total a Node.js.

### Pré-requisitos

- Conta no GitHub (para conectar o repositório)
- Conta no Vercel (gratuita em https://vercel.com)

### Passo 1: Preparar o Repositório GitHub

1. Crie um repositório no GitHub:
   ```bash
   git remote add origin https://github.com/seu-usuario/cadastro-clientes.git
   git branch -M main
   git push -u origin main
   ```

2. Verifique se o arquivo `.gitignore` está configurado corretamente:
   ```
   node_modules/
   .env
   .env.local
   *.db
   *.sqlite
   .DS_Store
   dist/
   build/
   .vercel/
   ```

### Passo 2: Deploy no Vercel

#### Opção A: Via Interface Web (Mais Fácil)

1. Acesse https://vercel.com/dashboard
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Procure e selecione seu repositório `cadastro-clientes`
5. Configure as variáveis de ambiente (se necessário)
6. Clique em "Deploy"

O Vercel detectará automaticamente que é um projeto Node.js e usará as configurações do `vercel.json`.

#### Opção B: Via Vercel CLI

1. Instale o Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Faça login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Siga as instruções interativas

### Passo 3: Configurar Domínio (Opcional)

Após o deploy, você pode:

1. Usar o domínio padrão do Vercel (ex: `cadastro-clientes.vercel.app`)
2. Conectar um domínio personalizado:
   - Acesse o projeto no Vercel Dashboard
   - Vá para "Settings" → "Domains"
   - Adicione seu domínio personalizado
   - Siga as instruções de DNS

### Passo 4: Configurar Variáveis de Ambiente (Se Necessário)

Se você precisar de variáveis de ambiente:

1. No Vercel Dashboard, vá para "Settings" → "Environment Variables"
2. Adicione as variáveis necessárias
3. Redeploy o projeto

## Importante: Persistência de Dados

⚠️ **Aviso Importante**: O banco de dados SQLite atual é armazenado em `/tmp/` no Vercel, o que significa que os dados **NÃO serão persistidos** entre deploys.

### Soluções para Persistência:

#### Opção 1: Usar Supabase (Recomendado)

Supabase oferece PostgreSQL gratuito com 500MB de armazenamento.

1. Crie uma conta em https://supabase.com
2. Crie um novo projeto
3. Obtenha a URL de conexão
4. Instale o cliente PostgreSQL:
   ```bash
   npm install pg
   ```
5. Modifique o `api/index.js` para usar PostgreSQL

#### Opção 2: Usar MongoDB Atlas

MongoDB Atlas oferece um cluster gratuito com 512MB.

1. Crie uma conta em https://www.mongodb.com/cloud/atlas
2. Crie um cluster gratuito
3. Obtenha a string de conexão
4. Instale o cliente MongoDB:
   ```bash
   npm install mongodb
   ```
5. Modifique o `api/index.js` para usar MongoDB

#### Opção 3: Usar Firebase

Firebase oferece Firestore com 1GB de armazenamento gratuito.

1. Crie um projeto em https://console.firebase.google.com
2. Configure a autenticação
3. Instale o SDK:
   ```bash
   npm install firebase-admin
   ```
4. Modifique o `api/index.js` para usar Firestore

## Monitoramento e Logs

### Ver Logs no Vercel

1. Acesse o projeto no Vercel Dashboard
2. Vá para a aba "Deployments"
3. Clique no deployment mais recente
4. Vá para "Logs" para ver os logs em tempo real

### Monitorar Erros

1. Vá para "Settings" → "Error Tracking"
2. Configure notificações por email

## Atualizações e Redeploy

### Deploy Automático

O Vercel faz deploy automático sempre que você faz push para a branch principal:

```bash
git add .
git commit -m "Sua mensagem de commit"
git push origin main
```

### Deploy Manual

Se precisar fazer deploy manualmente:

```bash
vercel --prod
```

## Dicas de Segurança

1. **Nunca commite `.env`**: Use o `.gitignore`
2. **Variáveis de Ambiente**: Armazene senhas e chaves no Vercel
3. **CORS**: Configure CORS adequadamente para seu domínio
4. **HTTPS**: Vercel fornece HTTPS automaticamente
5. **Rate Limiting**: Considere adicionar rate limiting para a API

## Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Erro: "Port already in use"

O Vercel atribui a porta automaticamente. Não se preocupe com isso.

### Banco de dados vazio após deploy

Isso é esperado se estiver usando SQLite. Considere usar um banco de dados externo (Supabase, MongoDB, Firebase).

### Erro de CORS

Modifique o arquivo `api/index.js`:

```javascript
app.use(cors({
  origin: 'https://seu-dominio.vercel.app',
  credentials: true
}));
```

## Próximos Passos

1. ✅ Deploy no Vercel
2. ⚠️ Configurar banco de dados persistente
3. 🔒 Adicionar autenticação de usuários
4. 📊 Adicionar análises
5. 🔔 Adicionar notificações por email

## Suporte

Para dúvidas sobre Vercel, consulte:
- https://vercel.com/docs
- https://vercel.com/support

Para dúvidas sobre este projeto, abra uma issue no GitHub.

