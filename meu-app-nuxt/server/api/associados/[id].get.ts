import { associadosStorage } from '~/server/utils/associadosStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    const associado = associadosStorage.getById(parseInt(id))
    
    if (!associado) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Associado não encontrado'
      })
    }
    
    return associado
    
  } catch (error) {
    console.error('Erro ao buscar associado:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})