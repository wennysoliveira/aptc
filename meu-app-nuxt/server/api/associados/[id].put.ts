import { associadosStorage } from '~/server/utils/associadosStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    // Validação básica
    if (!body.nome || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nome e email são obrigatórios'
      })
    }
    
    // Atualizar associado usando o armazenamento
    const associadoAtualizado = associadosStorage.update(parseInt(id), body)
    
    if (!associadoAtualizado) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Associado não encontrado'
      })
    }
    
    return {
      success: true,
      message: 'Associado atualizado com sucesso',
      data: associadoAtualizado
    }
    
  } catch (error) {
    console.error('Erro ao atualizar associado:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})