# 🗄️ Configurar MySQL Remoto

## ✅ **Credenciais Configuradas:**
- **Host:** 94.130.40.13
- **Usuário:** sant_aptc
- **Banco:** sant_aptc
- **Senha:** 102030@

## 🔧 **Próximos Passos:**

### 1. **Execute o SQL no seu MySQL remoto**
Conecte ao seu MySQL e execute o arquivo `database_setup.sql` para criar as tabelas.

### 2. **Atualize o arquivo `.env`**
```env
DATABASE_URL="mysql://sant_aptc:102030%40@94.130.40.13:3306/sant_aptc"
```

### 3. **Atualize o schema do Prisma**
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 4. **Gere o cliente Prisma**
```bash
npx prisma generate
```

### 5. **Teste a conexão**
```bash
npx prisma db pull
```

### 6. **Atualize as rotas da API**
As rotas da API precisam ser atualizadas para usar Prisma em vez de JSON.

## 📋 **Status Atual:**
- ✅ Credenciais configuradas
- ✅ Arquivo `database_setup.sql` criado
- ⏳ Aguardando execução do SQL no banco
- ⏳ Aguardando atualização das rotas da API

## 🚀 **Depois de configurar:**
1. Execute o SQL no MySQL
2. Atualize o `.env` e schema
3. Teste a conexão
4. Atualize as rotas da API
5. Teste a aplicação

**Tudo pronto para MySQL remoto!** 🎉
