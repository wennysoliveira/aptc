import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API: Lendo arquivo diretamente...')
    
    // Headers para evitar cache
    setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
    setHeader(event, 'Pragma', 'no-cache')
    setHeader(event, 'Expires', '0')
    
    // Lê o arquivo diretamente, sem usar o storage
    const DATA_FILE = path.join(process.cwd(), 'test-data.json')
    
    if (fs.existsSync(DATA_FILE)) {
      // Força a leitura do arquivo sem cache
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      const associados = JSON.parse(data)
      console.log('🔍 API: Arquivo lido diretamente -', associados.length, 'associados')
      console.log('🔍 API: Primeiro associado:', associados[0]?.nome)
      
      // Adiciona timestamp para forçar atualização
      const response = associados.map(associado => ({
        ...associado,
        _timestamp: Date.now()
      }))
      
      return response
    } else {
      console.log('❌ API: Arquivo não encontrado')
      return []
    }

  } catch (error) {
    console.error('Erro ao buscar associados:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
