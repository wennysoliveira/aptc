<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Nova Associação</h1>
        <p class="text-gray-600">Cadastre uma nova associação</p>
      </div>
      <NuxtLink to="/associacoes" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
        Voltar
      </NuxtLink>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <form @submit.prevent="salvarAssociacao" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Associado -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Associado *</label>
            <select 
              v-model="form.associadoId" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione um associado</option>
              <option v-for="associado in associados" :key="associado.id" :value="associado.id">
                {{ associado.nome }}
              </option>
            </select>
          </div>

          <!-- Data de Início -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data de Início *</label>
            <input 
              v-model="form.dataInicio" 
              type="date" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Data de Validade -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data de Validade *</label>
            <input 
              v-model="form.dataValidade" 
              type="date" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Valor Pago -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor Pago *</label>
            <input 
              v-model="form.valorPago" 
              type="number" 
              step="0.01"
              min="0"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="500.00"
            />
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select 
              v-model="form.status" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ATIVA">Ativa</option>
              <option value="VENCIDA">Vencida</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          <!-- Observações -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea 
              v-model="form.observacoes" 
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Observações adicionais sobre a associação..."
            ></textarea>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <NuxtLink to="/associacoes" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancelar
          </NuxtLink>
          <button 
            type="submit" 
            :disabled="loading"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar Associação</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

// Dados do formulário
const form = ref({
  associadoId: '',
  dataInicio: '',
  dataValidade: '',
  valorPago: '',
  status: 'ATIVA',
  observacoes: ''
})

const loading = ref(false)
const associados = ref([])

// Carregar associados
const loadAssociados = async () => {
  try {
    associados.value = await $fetch('/api/associados')
  } catch (error) {
    console.error('Erro ao carregar associados:', error)
  }
}

// Salvar associação
const salvarAssociacao = async () => {
  loading.value = true
  
  try {
    await $fetch('/api/associacoes', {
      method: 'POST',
      body: form.value
    })
    
    // Redirecionar para a lista após salvar
    await router.push('/associacoes')
  } catch (error) {
    console.error('Erro ao salvar associação:', error)
    alert('Erro ao salvar a associação. Tente novamente.')
  } finally {
    loading.value = false
  }
}

// Carregar dados ao montar o componente
onMounted(() => {
  loadAssociados()
})

definePageMeta({
  layout: 'default'
})
</script>
