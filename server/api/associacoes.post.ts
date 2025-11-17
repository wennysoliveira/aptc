export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Validação básica
  if (!body.associadoId || !body.dataInicio || !body.dataValidade || !body.valorPago) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todos os campos obrigatórios devem ser preenchidos'
    })
  }
  
  // Mock data - em um sistema real, aqui seria feita a inserção no banco
  const novaAssociacao = {
    id: Math.floor(Math.random() * 1000) + 100, // ID mock
    ...body,
    createdAt: new Date().toISOString()
  }
  
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    success: true,
    message: 'Associação criada com sucesso',
    data: novaAssociacao
  }
})
