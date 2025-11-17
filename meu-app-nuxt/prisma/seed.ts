import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aptc.com' },
    update: {},
    create: {
      email: 'admin@aptc.com',
      senha: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Criar cursos iniciais
  const cursoPsicanalista = await prisma.curso.upsert({
    where: { id: 'curso-psicanalista' },
    update: {},
    create: {
      id: 'curso-psicanalista',
      nome: 'Psicanálise Clínica',
      tipo: 'PSICANALISTA',
      descricao: 'Formação em Psicanálise Clínica com abordagem cristã',
    },
  })

  const cursoTerapeuta = await prisma.curso.upsert({
    where: { id: 'curso-terapeuta' },
    update: {},
    create: {
      id: 'curso-terapeuta',
      nome: 'Terapia Cristã',
      tipo: 'TERAPEUTA',
      descricao: 'Formação em Terapia com fundamentos cristãos',
    },
  })

  console.log('Seed executado com sucesso!')
  console.log('Admin criado:', admin.email)
  console.log('Cursos criados:', cursoPsicanalista.nome, cursoTerapeuta.nome)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
