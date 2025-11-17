import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validação básica dos dados
    if (!body.nome || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nome e email são obrigatórios'
      })
    }

    // Criar usuário primeiro
    const user = await prisma.user.create({
      data: {
        email: body.email,
        senha: 'temp_password', // TODO: Implementar hash de senha
        role: 'ASSOCIADO'
      }
    })

    // Criar associado
    const novoAssociado = await prisma.associado.create({
      data: {
        nome: body.nome,
        email: body.email,
        telefone: body.telefone || null,
        cpf: body.cpf || '',
        dataNascimento: body.dataNascimento ? new Date(body.dataNascimento) : null,
        cidade: body.cidade || null,
        estado: body.estado || null,
        endereco: body.endereco || null,
        cep: body.cep || null,
        userId: user.id
      },
      include: {
        user: true,
        associacoes: true,
        cursos: {
          include: {
            curso: true
          }
        }
      }
    })

    return {
      success: true,
      data: novoAssociado,
      message: 'Associado criado com sucesso'
    }

  } catch (error) {
    console.error('Erro ao criar associado:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
