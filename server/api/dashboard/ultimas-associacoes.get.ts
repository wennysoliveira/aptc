export default defineEventHandler(async (event) => {
  // Mock data para demonstração
  return [
    {
      id: 1,
      associado: 'Dr. Carlos Oliveira',
      data: '15/01/2024',
      valor: 500,
      status: 'ativa'
    },
    {
      id: 2,
      associado: 'Dra. Ana Costa',
      data: '10/01/2024',
      valor: 500,
      status: 'ativa'
    },
    {
      id: 3,
      associado: 'Dr. Pedro Lima',
      data: '05/01/2024',
      valor: 500,
      status: 'vencida'
    }
  ]
})
