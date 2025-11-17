export default defineEventHandler(async (event) => {
  // Mock data para demonstração
  const cursos = [
    {
      id: 1,
      nome: 'Psicanálise Clínica',
      tipo: 'PSICANALISTA',
      descricao: 'Formação em Psicanálise Clínica com abordagem cristã',
      createdAt: '2023-01-15'
    },
    {
      id: 2,
      nome: 'Terapia Cristã',
      tipo: 'TERAPEUTA',
      descricao: 'Formação em Terapia com fundamentos cristãos',
      createdAt: '2023-01-20'
    },
    {
      id: 3,
      nome: 'Psicologia Pastoral',
      tipo: 'TERAPEUTA',
      descricao: 'Especialização em Psicologia Pastoral',
      createdAt: '2023-02-10'
    }
  ]

  return cursos
})
