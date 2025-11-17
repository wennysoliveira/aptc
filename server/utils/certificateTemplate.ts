import fs from 'fs'
import path from 'path'

// Função para converter imagem para base64
export function getCertificateTemplateBase64(): string {
  try {
    const imagePath = path.join(process.cwd(), 'certificado.jpg')
    const imageBuffer = fs.readFileSync(imagePath)
    const base64 = imageBuffer.toString('base64')
    return `data:image/jpeg;base64,${base64}`
  } catch (error) {
    console.error('Erro ao carregar template do certificado:', error)
    throw new Error('Template do certificado não encontrado')
  }
}

// Configurações do certificado
export const CERTIFICATE_CONFIG = {
  // Dimensões da página A4 retrato
  pageWidth: 595,  // A4 retrato
  pageHeight: 842, // A4 retrato
  
  // Posição do nome do associado (ajustado para retrato)
  namePosition: {
    x: 297, // centro horizontal (595/2)
    y: 300, // posição vertical ajustada (35-40% da altura)
    width: 500, // largura maior para retrato
    align: 'center' as const
  },
  
  // Configurações da fonte para o nome
  font: {
    family: 'Helvetica-Bold',
    size: 42, // tamanho maior para destaque
    color: '#1e3a8a' // azul marinho
  },
  
  // Posição da data de associação
  datePosition: {
    x: 297, // centro horizontal
    y: 380, // posição vertical ajustada (45-50% da altura)
    width: 500, // largura maior para retrato
    align: 'center' as const
  },
  
  // Configurações da fonte para a data
  dateFont: {
    family: 'Helvetica',
    size: 18, // tamanho maior para melhor visibilidade
    color: '#1e3a8a' // azul marinho para consistência
  }
}
