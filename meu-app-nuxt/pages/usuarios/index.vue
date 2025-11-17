<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Usuários do Sistema</h1>
      <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Novo Usuário
      </button>
    </div>

    <DataTable
      title="Lista de Usuários"
      :columns="columns"
      :data="usuarios"
      @add="navigateTo('/usuarios/novo')"
      @edit="editUsuario"
      @delete="deleteUsuario"
    >
      <template #cell-role="{ value }">
        <span :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          value === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        ]">
          {{ value === 'ADMIN' ? 'Administrador' : 'Associado' }}
        </span>
      </template>
      
      <template #cell-status="{ value }">
        <span :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          value === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        ]">
          {{ value === 'ativo' ? 'Ativo' : 'Inativo' }}
        </span>
      </template>
    </DataTable>

    <!-- Modal de confirmação -->
    <Modal
      :is-open="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
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
  { key: 'role', label: 'Função' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Criado em' }
]

const usuarios = ref([])
const showDeleteModal = ref(false)
const usuarioToDelete = ref(null)

const loadUsuarios = async () => {
  try {
    usuarios.value = await $fetch('/api/usuarios')
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  }
}

const editUsuario = (usuario) => {
  navigateTo(`/usuarios/${usuario.id}/editar`)
}

const deleteUsuario = (usuario) => {
  usuarioToDelete.value = usuario
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (usuarioToDelete.value) {
    try {
      await $fetch(`/api/usuarios/${usuarioToDelete.value.id}`, {
        method: 'DELETE'
      })
      
      // Recarregar lista
      await loadUsuarios()
      
      showDeleteModal.value = false
      usuarioToDelete.value = null
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
    }
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  usuarioToDelete.value = null
}

// Carregar dados ao montar o componente
onMounted(() => {
  loadUsuarios()
})
</script>
