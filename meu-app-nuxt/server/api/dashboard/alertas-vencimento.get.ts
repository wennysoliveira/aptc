export default defineEventHandler(async (event) => {
  // Mock data para demonstração
  return [
    {
      id: 1,
      associado: 'Dr. João Silva',
      mensagem: 'Associação vence em 15 dias',
      tipo: 'vencendo'
    },
    {
      id: 2,
      associado: 'Dra. Maria Santos',
      mensagem: 'Associação venceu há 5 dias',
      tipo: 'vencida'
    }
  ]
})
