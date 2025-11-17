export default defineEventHandler(async (event) => {
  // Mock data para demonstração
  const associacoes = [
    {
      id: 1,
      associado: 'Dr. João Silva',
      dataInicio: '2023-01-15',
      dataValidade: '2024-01-15',
      valorPago: 500,
      status: 'ATIVA'
    },
    {
      id: 2,
      associado: 'Dra. Maria Santos',
      dataInicio: '2023-02-20',
      dataValidade: '2024-02-20',
      valorPago: 500,
      status: 'ATIVA'
    },
    {
      id: 3,
      associado: 'Dr. Carlos Oliveira',
      dataInicio: '2022-12-01',
      dataValidade: '2023-12-01',
      valorPago: 500,
      status: 'VENCIDA'
    },
    {
      id: 4,
      associado: 'Dra. Ana Costa',
      dataInicio: '2023-03-10',
      dataValidade: '2024-03-10',
      valorPago: 500,
      status: 'ATIVA'
    }
  ]

  return associacoes
})
