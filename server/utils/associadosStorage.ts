import fs from 'fs'
import path from 'path'

// Armazenamento permanente em arquivo JSON
// Em produção, isso seria substituído por um banco de dados real

interface Associado {
  id: number
  nome: string
  email: string
  telefone?: string
  cpf?: string
  dataNascimento?: string
  cidade?: string
  estado?: string
  endereco?: string
  cep?: string
  status: 'ativo' | 'inativo'
  dataAssociacao: string
  cursos?: string[]
  createdAt: string
  updatedAt?: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'associados.json')

// Debug do caminho
console.log('🔍 Caminho do arquivo:', DATA_FILE)
console.log('🔍 Arquivo existe:', fs.existsSync(DATA_FILE))

// Garantir que o diretório data existe
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Carregar dados do arquivo - SEM DADOS MOCKADOS
const loadData = (): Associado[] => {
  try {
    ensureDataDir()
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      const parsed = JSON.parse(data)
      console.log('🔄 DADOS DO ARQUIVO:', parsed.length, 'associados')
      return parsed
    }
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error)
  }
  
  // SEM DADOS MOCKADOS - retorna array vazio se arquivo não existir
  console.log('⚠️ Arquivo não encontrado - retornando array vazio')
  return []
}

// Salvar dados no arquivo
const saveData = (data: Associado[]) => {
  try {
    ensureDataDir()
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    throw new Error('Erro ao salvar dados permanentemente')
  }
}

// Carregar dados iniciais
let associados: Associado[] = []
let nextId = 1

export const associadosStorage = {
  // Buscar todos os associados
  getAll(): Associado[] {
    // SEMPRE ler do arquivo, nunca usar cache
    try {
      ensureDataDir()
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8')
        const parsed = JSON.parse(data)
        console.log('✅ LENDO DO ARQUIVO:', parsed.length, 'associados')
        console.log('✅ Primeiro associado:', parsed[0]?.nome)
        return parsed
      }
    } catch (error) {
      console.error('❌ Erro ao ler arquivo:', error)
    }
    
    // Se não conseguir ler do arquivo, retorna array vazio
    console.log('⚠️ Retornando array vazio - arquivo não encontrado')
    return []
  },

  // Buscar associado por ID
  getById(id: number): Associado | undefined {
    // Recarregar dados do arquivo a cada requisição
    associados = loadData()
    return associados.find(a => a.id === id)
  },

  // Criar novo associado
  create(data: Omit<Associado, 'id' | 'createdAt' | 'updatedAt'>): Associado {
    const novoAssociado: Associado = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString()
    }
    associados.push(novoAssociado)
    saveData(associados) // Salvar permanentemente
    return novoAssociado
  },

  // Atualizar associado
  update(id: number, data: Partial<Associado>): Associado | null {
    const index = associados.findIndex(a => a.id === id)
    if (index === -1) return null

    associados[index] = {
      ...associados[index],
      ...data,
      updatedAt: new Date().toISOString()
    }

    saveData(associados) // Salvar permanentemente
    return associados[index]
  },

  // Deletar associado
  delete(id: number): boolean {
    const index = associados.findIndex(a => a.id === id)
    if (index === -1) return false

    associados.splice(index, 1)
    saveData(associados) // Salvar permanentemente
    return true
  }
}