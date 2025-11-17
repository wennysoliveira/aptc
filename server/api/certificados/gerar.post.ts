import { generateCertificatePDF } from '~/server/utils/generateCertificate'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { associadoId } = body

    if (!associadoId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do associado é obrigatório'
      })
    }

    // Buscar dados do associado (mock)
    const associados = [
      {
        id: 1,
        nome: 'Dr. João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        cpf: '123.456.789-00',
        cidade: 'São Paulo',
        estado: 'SP',
        status: 'ativo',
        dataAssociacao: '2023-01-15',
        cursos: ['Psicanálise Clínica']
      },
      {
        id: 2,
        nome: 'Dra. Maria Santos',
        email: 'maria.santos@email.com',
        telefone: '(11) 88888-8888',
        cpf: '987.654.321-00',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        status: 'ativo',
        dataAssociacao: '2023-02-20',
        cursos: ['Terapia Cristã']
      },
      {
        id: 3,
        nome: 'Dr. Carlos Oliveira',
        email: 'carlos.oliveira@email.com',
        telefone: '(11) 77777-7777',
        cpf: '456.789.123-00',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        status: 'inativo',
        dataAssociacao: '2023-03-10',
        cursos: ['Psicanálise Clínica', 'Terapia Cristã']
      }
    ]

    const associado = associados.find(a => a.id === parseInt(associadoId))

    if (!associado) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Associado não encontrado'
      })
    }

    // Gerar PDF diretamente
    const pdfBuffer = await generateCertificatePDF({
      nome: associado.nome,
      dataAssociacao: associado.dataAssociacao,
      cidade: associado.cidade,
      estado: associado.estado
    })

    // Configurar headers para visualização em nova aba
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `inline; filename="certificado_${associado.nome.replace(/\s+/g, '_')}.pdf"`)
    setHeader(event, 'Content-Length', pdfBuffer.length.toString())

    return pdfBuffer

  } catch (error) {
    console.error('Erro ao gerar certificado:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})