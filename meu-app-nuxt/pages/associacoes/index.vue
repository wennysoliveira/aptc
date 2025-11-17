<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Associações</h1>
      <NuxtLink
        to="/associacoes/nova"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nova Associação
      </NuxtLink>
    </div>

    <!-- Filtros -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select v-model="filtros.status" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="">Todos os Status</option>
          <option value="ATIVA">Ativa</option>
          <option value="VENCIDA">Vencida</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
        
        <input
          v-model="filtros.associado"
          type="text"
          placeholder="Buscar por associado..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        
        <input
          v-model="filtros.dataInicio"
          type="text"
          placeholder="Data início (dd/mm/aaaa)"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="formatarInputData($event, 'dataInicio')"
        />
        
        <input
          v-model="filtros.dataFim"
          type="text"
          placeholder="Data fim (dd/mm/aaaa)"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          @input="formatarInputData($event, 'dataFim')"
        />
      </div>
    </div>

    <DataTable
      title="Lista de Associações"
      :columns="columns"
      :data="associacoesFiltradas"
      @add="navigateTo('/associacoes/nova')"
      @edit="editAssociacao"
      @delete="deleteAssociacao"
    >
      <template #cell-dataInicio="{ value }">
        {{ formatarDataBR(value) }}
      </template>
      
      <template #cell-dataValidade="{ value }">
        {{ formatarDataBR(value) }}
      </template>
      
      <template #cell-status="{ value }">
        <span :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          value === 'ATIVA' ? 'bg-green-100 text-green-800' : 
          value === 'VENCIDA' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100 text-gray-800'
        ]">
          {{ value === 'ATIVA' ? 'Ativa' : value === 'VENCIDA' ? 'Vencida' : 'Cancelada' }}
        </span>
      </template>
      
      <template #cell-valorPago="{ value }">
        R$ {{ value.toLocaleString('pt-BR') }}
      </template>
    </DataTable>

    <!-- Modal de confirmação -->
    <Modal
      :is-open="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir esta associação? Esta ação não pode ser desfeita."
      type="warning"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      @close="cancelDelete"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const columns = [
  { key: 'associado', label: 'Associado' },
  { key: 'dataInicio', label: 'Data Início' },
  { key: 'dataValidade', label: 'Data Validade' },
  { key: 'valorPago', label: 'Valor Pago' },
  { key: 'status', label: 'Status' }
]

const associacoes = ref([])
const filtros = ref({
  status: '',
  associado: '',
  dataInicio: '',
  dataFim: ''
})
const showDeleteModal = ref(false)
const associacaoToDelete = ref(null)

// Função para formatar datas em pt-BR
const formatarDataBR = (data) => {
  if (!data) return '-'
  const dataObj = new Date(data)
  return dataObj.toLocaleDateString('pt-BR')
}

// Função para converter data pt-BR para formato ISO
const converterDataParaISO = (dataBR) => {
  if (!dataBR) return ''
  const [dia, mes, ano] = dataBR.split('/')
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
}

// Função para formatar input de data
const formatarInputData = (event, campo) => {
  let valor = event.target.value.replace(/\D/g, '') // Remove tudo que não é dígito
  
  if (valor.length >= 2) {
    valor = valor.substring(0, 2) + '/' + valor.substring(2)
  }
  if (valor.length >= 5) {
    valor = valor.substring(0, 5) + '/' + valor.substring(5, 9)
  }
  
  filtros.value[campo] = valor
}

const associacoesFiltradas = computed(() => {
  let filtered = associacoes.value

  if (filtros.value.status) {
    filtered = filtered.filter(a => a.status === filtros.value.status)
  }

  if (filtros.value.associado) {
    filtered = filtered.filter(a => 
      a.associado.toLowerCase().includes(filtros.value.associado.toLowerCase())
    )
  }

  if (filtros.value.dataInicio) {
    const dataInicioISO = converterDataParaISO(filtros.value.dataInicio)
    filtered = filtered.filter(a => a.dataInicio >= dataInicioISO)
  }

  if (filtros.value.dataFim) {
    const dataFimISO = converterDataParaISO(filtros.value.dataFim)
    filtered = filtered.filter(a => a.dataInicio <= dataFimISO)
  }

  return filtered
})

const loadAssociacoes = async () => {
  try {
    associacoes.value = await $fetch('/api/associacoes')
  } catch (error) {
    console.error('Erro ao carregar associações:', error)
  }
}

const editAssociacao = (associacao) => {
  navigateTo(`/associacoes/${associacao.id}/editar`)
}

const deleteAssociacao = (associacao) => {
  associacaoToDelete.value = associacao
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (associacaoToDelete.value) {
    try {
      await $fetch(`/api/associacoes/${associacaoToDelete.value.id}`, {
        method: 'DELETE'
      })
      
      // Recarregar lista
      await loadAssociacoes()
      
      showDeleteModal.value = false
      associacaoToDelete.value = null
    } catch (error) {
      console.error('Erro ao excluir associação:', error)
    }
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  associacaoToDelete.value = null
}

// Carregar dados ao montar o componente
onMounted(() => {
  loadAssociacoes()
})
</script>
