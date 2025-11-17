export default defineEventHandler(async (event) => {
  // Mock data para demonstração
  const usuarios = [
    {
      id: 1,
      nome: 'Administrador',
      email: 'admin@aptc.com',
      role: 'ADMIN',
      status: 'ativo',
      createdAt: '2023-01-01'
    },
    {
      id: 2,
      nome: 'Dr. João Silva',
      email: 'joao.silva@email.com',
      role: 'ASSOCIADO',
      status: 'ativo',
      createdAt: '2023-01-15'
    },
    {
      id: 3,
      nome: 'Dra. Maria Santos',
      email: 'maria.santos@email.com',
      role: 'ASSOCIADO',
      status: 'ativo',
      createdAt: '2023-02-20'
    },
    {
      id: 4,
      nome: 'Dr. Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      role: 'ASSOCIADO',
      status: 'inativo',
      createdAt: '2023-03-10'
    }
  ]

  return usuarios
})
