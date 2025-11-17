export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  // Mock de exclusão
  return {
    success: true,
    message: 'Associado excluído com sucesso'
  }
})
