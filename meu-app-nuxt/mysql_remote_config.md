# Configuração MySQL Remoto

## 1. Configuração do Banco de Dados

### Arquivo `.env`
```env
DATABASE_URL="mysql://usuario:senha@host:porta/nome_banco"
NUXT_SECRET_KEY="your-secret-key-here"
```

### Exemplo de configuração:
```env
# Para MySQL local
DATABASE_URL="mysql://root:password@localhost:3306/meu_app_nuxt"

# Para MySQL remoto (exemplo)
DATABASE_URL="mysql://usuario:senha@seu-servidor.com:3306/meu_app_nuxt"

# Para PlanetScale (MySQL na nuvem)
DATABASE_URL="mysql://usuario:senha@aws.connect.psdb.cloud/meu_app_nuxt?sslaccept=strict"
```

## 2. Executar o SQL

1. **Conecte ao seu MySQL remoto**
2. **Execute o arquivo `database_setup.sql`**
3. **Atualize o arquivo `.env` com suas credenciais**

## 3. Comandos para configurar o Prisma

```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar migrações (se necessário)
npx prisma db push

# Visualizar banco de dados
npx prisma studio
```

## 4. Serviços MySQL Remotos Recomendados

### PlanetScale (Gratuito)
- URL: https://planetscale.com/
- MySQL compatível
- Interface web
- SSL automático

### Railway (Gratuito)
- URL: https://railway.app/
- MySQL incluído
- Deploy automático

### Supabase (PostgreSQL, mas similar)
- URL: https://supabase.com/
- PostgreSQL (compatível com Prisma)
- Interface web
- Autenticação incluída

## 5. Teste de Conexão

Após configurar, teste com:
```bash
npx prisma db pull
```

Se funcionar, a conexão está OK!
