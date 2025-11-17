export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Mock de criação de associado
  const novoAssociado = {
    id: Date.now(),
    ...body,
    status: 'ativo',
    dataAssociacao: new Date().toISOString().split('T')[0]
  }
  
  return {
    success: true,
    data: novoAssociado,
    message: 'Associado criado com sucesso'
  }
})
