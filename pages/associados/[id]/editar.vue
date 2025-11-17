<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Editar Associado</h1>
        <p class="text-gray-600">Atualize as informações do associado</p>
      </div>
      <NuxtLink to="/associados" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
        Voltar
      </NuxtLink>
    </div>

    <!-- Formulário -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <form @submit.prevent="salvarAssociado" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nome -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <input 
              v-model="form.nome" 
              type="text" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o nome completo"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@exemplo.com"
            />
          </div>

          <!-- Telefone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input 
              v-model="form.telefone" 
              type="tel" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(11) 99999-9999"
            />
          </div>

          <!-- CPF -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
            <input 
              v-model="form.cpf" 
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="000.000.000-00"
            />
          </div>

          <!-- Data de Nascimento -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
            <input 
              v-model="form.dataNascimento" 
              type="date" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Cidade -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
            <input 
              v-model="form.cidade" 
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="São Paulo"
            />
          </div>

          <!-- Estado -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select 
              v-model="form.estado" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione o estado</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="BA">Bahia</option>
              <option value="GO">Goiás</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="PE">Pernambuco</option>
              <option value="CE">Ceará</option>
              <option value="PA">Pará</option>
              <option value="AM">Amazonas</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="PB">Paraíba</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
              <option value="AC">Acre</option>
              <option value="PI">Piauí</option>
              <option value="RN">Rio Grande do Norte</option>
            </select>
          </div>

          <!-- CEP -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">CEP</label>
            <input 
              v-model="form.cep" 
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="00000-000"
            />
          </div>

          <!-- Endereço -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
            <input 
              v-model="form.endereco" 
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rua, número, bairro"
            />
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <NuxtLink to="/associados" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancelar
          </NuxtLink>
          <button 
            type="submit" 
            :disabled="loading"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// Dados do formulário
const form = ref({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
  cidade: '',
  estado: '',
  cep: '',
  endereco: ''
})

const loading = ref(false)

// Carregar dados do associado
onMounted(async () => {
  try {
    const associado = await $fetch(`/api/associados/${route.params.id}`)
    form.value = {
      nome: associado.nome || '',
      email: associado.email || '',
      telefone: associado.telefone || '',
      cpf: associado.cpf || '',
      dataNascimento: associado.dataNascimento || '',
      cidade: associado.cidade || '',
      estado: associado.estado || '',
      cep: associado.cep || '',
      endereco: associado.endereco || ''
    }
  } catch (error) {
    console.error('Erro ao carregar associado:', error)
    // Redirecionar para lista se não encontrar
    await router.push('/associados')
  }
})

// Salvar alterações
const salvarAssociado = async () => {
  loading.value = true
  
  try {
    await $fetch(`/api/associados/${route.params.id}`, {
      method: 'PUT',
      body: form.value
    })
    
    // Redirecionar para a lista após salvar
    await router.push('/associados')
  } catch (error) {
    console.error('Erro ao salvar associado:', error)
    alert('Erro ao salvar as alterações. Tente novamente.')
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'default'
})
</script>
