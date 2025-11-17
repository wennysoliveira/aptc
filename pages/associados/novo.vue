<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Novo Associado</h1>
      <p class="mt-1 text-sm text-gray-500">Preencha os dados do novo associado</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Dados Pessoais</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="nome"
            v-model="form.nome"
            label="Nome Completo"
            placeholder="Digite o nome completo"
            required
            :error="errors.nome"
          />
          
          <FormInput
            id="email"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            required
            :error="errors.email"
          />
          
          <FormInput
            id="telefone"
            v-model="form.telefone"
            label="Telefone"
            placeholder="(11) 99999-9999"
            :error="errors.telefone"
          />
          
          <FormInput
            id="cpf"
            v-model="form.cpf"
            label="CPF"
            placeholder="000.000.000-00"
            required
            :error="errors.cpf"
          />
          
          <FormInput
            id="dataNascimento"
            v-model="form.dataNascimento"
            label="Data de Nascimento"
            type="date"
            :error="errors.dataNascimento"
          />
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Endereço</h3>
        
        <div class="space-y-6">
          <FormInput
            id="endereco"
            v-model="form.endereco"
            label="Endereço"
            placeholder="Rua, número, complemento"
            :error="errors.endereco"
          />
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              id="cidade"
              v-model="form.cidade"
              label="Cidade"
              placeholder="Nome da cidade"
              :error="errors.cidade"
            />
            
            <FormInput
              id="estado"
              v-model="form.estado"
              label="Estado"
              placeholder="UF"
              :error="errors.estado"
            />
            
            <FormInput
              id="cep"
              v-model="form.cep"
              label="CEP"
              placeholder="00000-000"
              :error="errors.cep"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Cursos</h3>
        
        <div class="space-y-4">
          <div v-for="(curso, index) in form.cursos" :key="index" class="flex items-center space-x-4">
            <div class="flex-1">
              <FormInput
                :id="`curso-${index}`"
                v-model="curso.nome"
                :label="`Curso ${index + 1}`"
                placeholder="Nome do curso"
              />
            </div>
            <div class="flex-1">
              <FormInput
                :id="`instituicao-${index}`"
                v-model="curso.instituicao"
                label="Instituição"
                placeholder="Nome da instituição"
              />
            </div>
            <button
              type="button"
              @click="removeCurso(index)"
              class="p-2 text-red-600 hover:text-red-900"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <button
            type="button"
            @click="addCurso"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Adicionar Curso
          </button>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <NuxtLink
          to="/associados"
          class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancelar
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-50"
        >
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
  endereco: '',
  cidade: '',
  estado: '',
  cep: '',
  cursos: [{ nome: '', instituicao: '' }]
})

const errors = ref({})
const loading = ref(false)

const addCurso = () => {
  form.value.cursos.push({ nome: '', instituicao: '' })
}

const removeCurso = (index) => {
  if (form.value.cursos.length > 1) {
    form.value.cursos.splice(index, 1)
  }
}

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.nome) {
    errors.value.nome = 'Nome é obrigatório'
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email é obrigatório'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Email inválido'
  }
  
  if (!form.value.cpf) {
    errors.value.cpf = 'CPF é obrigatório'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    const response = await $fetch('/api/associados', {
      method: 'POST',
      body: form.value
    })
    
    if (response.success) {
      await navigateTo('/associados')
    }
  } catch (error) {
    console.error('Erro ao criar associado:', error)
  } finally {
    loading.value = false
  }
}
</script>
