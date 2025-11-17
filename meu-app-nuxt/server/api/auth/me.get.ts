export default defineEventHandler(async (event) => {
  // Mock de usuário logado
  return {
    id: '1',
    email: 'admin@aptc.com',
    role: 'ADMIN',
    nome: 'Administrador'
  }
})
