<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ associado?.nome || 'Carregando...' }}</h1>
        <p class="text-gray-600">Perfil completo do associado</p>
      </div>
             <div class="flex space-x-3">
               <button
                 @click="visualizarCertificado"
                 :disabled="!associado || associado.status !== 'ativo'"
                 class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 relative group"
               >
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
                 <span>Visualizar Certificado</span>
                 <!-- Tooltip -->
                 <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                   Clique para visualizar o certificado
                   <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                 </div>
               </button>
        <NuxtLink :to="`/associados/${route.params.id}/editar`" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Editar
        </NuxtLink>
        <NuxtLink to="/associados" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
          Voltar
        </NuxtLink>
      </div>
    </div>

    <!-- Informações Pessoais -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Informações Pessoais</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">Nome Completo</label>
          <p class="text-lg text-gray-900">{{ associado?.nome || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
          <p class="text-lg text-gray-900">{{ associado?.email || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">Telefone</label>
          <p class="text-lg text-gray-900">{{ associado?.telefone || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">CPF</label>
          <p class="text-lg text-gray-900">{{ associado?.cpf || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">Data de Nascimento</label>
          <p class="text-lg text-gray-900">{{ associado?.dataNascimento || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">Cidade/Estado</label>
          <p class="text-lg text-gray-900">{{ `${associado?.cidade || ''}${associado?.cidade && associado?.estado ? ', ' : ''}${associado?.estado || ''}` || '-' }}</p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-500 mb-1">Endereço</label>
          <p class="text-lg text-gray-900">{{ associado?.endereco || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">CEP</label>
          <p class="text-lg text-gray-900">{{ associado?.cep || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-1">Status</label>
          <span :class="[
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
            associado?.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            {{ associado?.status === 'ativo' ? 'Ativo' : 'Inativo' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Cursos -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Cursos</h2>
        <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Adicionar Curso
        </button>
      </div>
      <div v-if="cursos.length > 0" class="space-y-4">
        <div v-for="curso in cursos" :key="curso.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900">{{ curso.nome }}</h3>
              <p class="text-sm text-gray-600">{{ curso.tipo }}</p>
              <p class="text-sm text-gray-500">Formado em: {{ curso.dataFormacao }}</p>
            </div>
            <div class="flex space-x-2">
              <button class="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
              <button class="text-red-600 hover:text-red-800 text-sm">Remover</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        <p>Nenhum curso cadastrado</p>
      </div>
    </div>

    <!-- Associações -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Associações</h2>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Nova Associação
        </button>
      </div>
      <div v-if="associacoes.length > 0" class="space-y-4">
        <div v-for="associacao in associacoes" :key="associacao.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900">Associação #{{ associacao.id }}</h3>
              <p class="text-sm text-gray-600">Início: {{ associacao.dataInicio }}</p>
              <p class="text-sm text-gray-600">Vencimento: {{ associacao.dataValidade }}</p>
              <p class="text-sm text-gray-600">Valor: R$ {{ associacao.valorPago?.toLocaleString() }}</p>
            </div>
            <div class="flex items-center space-x-3">
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                associacao.status === 'ativa' ? 'bg-green-100 text-green-800' : 
                associacao.status === 'vencida' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ associacao.status === 'ativa' ? 'Ativa' : 
                   associacao.status === 'vencida' ? 'Vencida' : 'Cancelada' }}
              </span>
              <button class="text-blue-600 hover:text-blue-800 text-sm">Renovar</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        <p>Nenhuma associação cadastrada</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Dados do associado
const associado = ref(null)
const cursos = ref([])
const associacoes = ref([])

       // Função para visualizar certificado
       const visualizarCertificado = async () => {
         try {
           if (!associado.value || associado.value.status !== 'ativo') {
             alert('Apenas associados ativos podem ter certificados gerados.')
             return
           }

           // Fazer requisição POST para gerar PDF
           const response = await $fetch('/api/certificados/gerar', {
             method: 'POST',
             body: {
               associadoId: parseInt(route.params.id)
             }
           })

           // Criar blob do PDF e abrir em nova aba
           const blob = new Blob([response], { type: 'application/pdf' })
           const url = URL.createObjectURL(blob)
           window.open(url, '_blank')
           
           // Limpar URL após um tempo
           setTimeout(() => {
             URL.revokeObjectURL(url)
           }, 10000)

         } catch (error) {
           console.error('Erro ao visualizar certificado:', error)
           alert('Erro ao gerar certificado. Tente novamente.')
         }
       }

// Carregar dados do associado
onMounted(async () => {
  try {
    // Carregar dados do associado
    associado.value = await $fetch(`/api/associados/${route.params.id}`)
    
    // Carregar cursos (mock data)
    cursos.value = [
      {
        id: 1,
        nome: 'Psicanálise Clínica',
        tipo: 'Psicanalista',
        dataFormacao: '2020-01-15'
      },
      {
        id: 2,
        nome: 'Terapia Familiar Sistêmica',
        tipo: 'Terapeuta',
        dataFormacao: '2019-06-20'
      }
    ]
    
    // Carregar associações (mock data)
    associacoes.value = [
      {
        id: 1,
        dataInicio: '2023-01-10',
        dataValidade: '2024-01-10',
        valorPago: 500,
        status: 'ativa'
      },
      {
        id: 2,
        dataInicio: '2022-01-10',
        dataValidade: '2023-01-10',
        valorPago: 500,
        status: 'vencida'
      }
    ]
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
})

definePageMeta({
  layout: 'default'
})
</script>
