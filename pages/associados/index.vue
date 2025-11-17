<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Associados</h1>
      <NuxtLink
        to="/associados/novo"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Novo Associado
      </NuxtLink>
    </div>

    <DataTable
      title="Lista de Associados"
      :columns="columns"
      :data="associados"
      @add="navigateTo('/associados/novo')"
      @edit="editAssociado"
      @delete="deleteAssociado"
      @certificate="viewCertificate"
    >
      <template #cell-status="{ value }">
        <span :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          value === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        ]">
          {{ value === 'ativo' ? 'Ativo' : 'Inativo' }}
        </span>
      </template>
      
      <template #cell-cursos="{ value }">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="curso in value"
            :key="curso"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {{ curso }}
          </span>
        </div>
      </template>
    </DataTable>

    <!-- Modal de confirmação -->
    <Modal
      :is-open="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este associado? Esta ação não pode ser desfeita."
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
  { key: 'nome', label: 'Nome' },
  { key: 'email', label: 'Email' },
  { key: 'cidade', label: 'Cidade' },
  { key: 'estado', label: 'Estado' },
  { key: 'status', label: 'Status' },
  { key: 'cursos', label: 'Cursos' }
]

const associados = ref([])
const showDeleteModal = ref(false)
const associadoToDelete = ref(null)

const loadAssociados = async () => {
  try {
    associados.value = await $fetch('/api/associados')
  } catch (error) {
    console.error('Erro ao carregar associados:', error)
  }
}

const editAssociado = (associado) => {
  navigateTo(`/associados/${associado.id}/editar`)
}

       const viewCertificate = async (associado) => {
         try {
           if (associado.status !== 'ativo') {
             alert('Apenas associados ativos podem ter certificados gerados.')
             return
           }

           // Fazer requisição POST para gerar PDF
           const response = await $fetch('/api/certificados/gerar', {
             method: 'POST',
             body: {
               associadoId: associado.id
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

const deleteAssociado = (associado) => {
  associadoToDelete.value = associado
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (associadoToDelete.value) {
    try {
      await $fetch(`/api/associados/${associadoToDelete.value.id}`, {
        method: 'DELETE'
      })
      
      // Recarregar lista
      await loadAssociados()
      
      showDeleteModal.value = false
      associadoToDelete.value = null
    } catch (error) {
      console.error('Erro ao excluir associado:', error)
    }
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  associadoToDelete.value = null
}

// Carregar dados ao montar o componente
onMounted(() => {
  loadAssociados()
})
</script>
