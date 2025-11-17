<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Cursos</h1>
      <NuxtLink
        to="/cursos/novo"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Novo Curso
      </NuxtLink>
    </div>

    <DataTable
      title="Lista de Cursos"
      :columns="columns"
      :data="cursos"
      @add="navigateTo('/cursos/novo')"
      @edit="editCurso"
      @delete="deleteCurso"
    >
      <template #cell-tipo="{ value }">
        <span :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          value === 'PSICANALISTA' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        ]">
          {{ value === 'PSICANALISTA' ? 'Psicanalista' : 'Terapeuta' }}
        </span>
      </template>
    </DataTable>

    <!-- Modal de confirmação -->
    <Modal
      :is-open="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita."
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
  { key: 'tipo', label: 'Tipo' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'createdAt', label: 'Criado em' }
]

const cursos = ref([])
const showDeleteModal = ref(false)
const cursoToDelete = ref(null)

const loadCursos = async () => {
  try {
    cursos.value = await $fetch('/api/cursos')
  } catch (error) {
    console.error('Erro ao carregar cursos:', error)
  }
}

const editCurso = (curso) => {
  navigateTo(`/cursos/${curso.id}/editar`)
}

const deleteCurso = (curso) => {
  cursoToDelete.value = curso
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (cursoToDelete.value) {
    try {
      await $fetch(`/api/cursos/${cursoToDelete.value.id}`, {
        method: 'DELETE'
      })
      
      // Recarregar lista
      await loadCursos()
      
      showDeleteModal.value = false
      cursoToDelete.value = null
    } catch (error) {
      console.error('Erro ao excluir curso:', error)
    }
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  cursoToDelete.value = null
}

// Carregar dados ao montar o componente
onMounted(() => {
  loadCursos()
})
</script>
