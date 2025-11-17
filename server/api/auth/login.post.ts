export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Mock de autenticação simples
  if (body.email === 'admin@aptc.com' && body.senha === 'admin123') {
    return {
      success: true,
      user: {
        id: '1',
        email: 'admin@aptc.com',
        role: 'ADMIN',
        nome: 'Administrador'
      }
    }
  }
  
  throw createError({
    statusCode: 401,
    statusMessage: 'Credenciais inválidas'
  })
})
