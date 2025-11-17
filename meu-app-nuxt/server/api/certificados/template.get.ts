import { getCertificateTemplateBase64 } from '~/server/utils/certificateTemplate'

export default defineEventHandler(async (event) => {
  try {
    const templateBase64 = getCertificateTemplateBase64()
    
    return {
      templateBase64,
      success: true
    }
  } catch (error) {
    console.error('Erro ao obter template do certificado:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao carregar template do certificado'
    })
  }
})
