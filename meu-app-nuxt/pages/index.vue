<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl shadow-2xl">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Bem-vindo ao Sistema APTC
          </h1>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
            Gerencie associados, cursos e associações de forma eficiente e profissional.
          </p>
          <div class="flex justify-center space-x-4">
            <NuxtLink to="/associados/novo" class="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Novo Associado
            </NuxtLink>
            <NuxtLink to="/associacoes" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Ver Associações
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Associados Ativos -->
      <div class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Associados Ativos</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.associadosAtivos }}</p>
              <p class="text-xs text-green-600 mt-1">+12% este mês</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Vencendo em 30 dias -->
      <div class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Vencendo em 30 dias</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.vencendo30Dias }}</p>
              <p class="text-xs text-yellow-600 mt-1">Atenção necessária</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Associações Vencidas -->
      <div class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-red-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Associações Vencidas</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.associacoesVencidas }}</p>
              <p class="text-xs text-red-600 mt-1">Requer ação</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Receita do Mês -->
      <div class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Receita do Mês</p>
              <p class="text-3xl font-bold text-gray-900">R$ {{ stats.receitaMes.toLocaleString() }}</p>
              <p class="text-xs text-green-600 mt-1">+8% vs mês anterior</p>
            </div>
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-900">Ações Rápidas</h3>
        <div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink to="/associados/novo" class="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 border border-blue-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-900 group-hover:text-blue-700">Novo Associado</h4>
              <p class="text-sm text-gray-600">Cadastrar novo membro</p>
            </div>
          </div>
          <p class="text-xs text-gray-500">Adicione um novo profissional à associação</p>
        </NuxtLink>

        <NuxtLink to="/associacoes" class="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105 border border-green-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-900 group-hover:text-green-700">Nova Associação</h4>
              <p class="text-sm text-gray-600">Registrar associação</p>
            </div>
          </div>
          <p class="text-xs text-gray-500">Crie uma nova associação para um membro</p>
        </NuxtLink>

        <NuxtLink to="/relatorios" class="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 border border-purple-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-900 group-hover:text-purple-700">Relatórios</h4>
              <p class="text-sm text-gray-600">Gerar relatórios</p>
            </div>
          </div>
          <p class="text-xs text-gray-500">Visualize dados e estatísticas do sistema</p>
        </NuxtLink>
      </div>
    </div>

    <!-- Alertas de Vencimento -->
    <div v-if="alertas.length > 0" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">Alertas de Vencimento</h3>
        </div>
      </div>
      <div class="divide-y divide-gray-100">
        <div v-for="alerta in alertas" :key="alerta.id" class="px-8 py-6 hover:bg-gray-50 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  alerta.tipo === 'vencendo' ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 'bg-gradient-to-br from-red-100 to-red-200'
                ]">
                  <svg :class="[
                    'w-6 h-6',
                    alerta.tipo === 'vencendo' ? 'text-yellow-600' : 'text-red-600'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-lg font-semibold text-gray-900">{{ alerta.associado }}</p>
                <p class="text-sm text-gray-600">{{ alerta.mensagem }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                alerta.tipo === 'vencendo' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              ]">
                {{ alerta.tipo === 'vencendo' ? 'Vencendo' : 'Vencida' }}
              </span>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Renovar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Últimas Associações -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">Últimas Associações</h3>
        </div>
      </div>
      <div class="divide-y divide-gray-100">
        <div v-for="associacao in ultimasAssociacoes" :key="associacao.id" class="px-8 py-6 hover:bg-gray-50 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <span class="text-lg font-bold text-gray-700">{{ associacao.associado.charAt(0) }}</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-lg font-semibold text-gray-900">{{ associacao.associado }}</p>
                <p class="text-sm text-gray-600">{{ associacao.data }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-lg font-bold text-gray-900">R$ {{ associacao.valor.toLocaleString() }}</p>
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  associacao.status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ associacao.status === 'ativa' ? 'Ativa' : 'Vencida' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráfico de Estatísticas -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">Visão Geral do Sistema</h3>
        </div>
      </div>
      <div class="p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Gráfico de Barras Simples -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Associações por Mês</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <span class="text-sm text-gray-600 w-16">Jan</span>
                <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                  <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full" style="width: 75%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">15</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-gray-600 w-16">Fev</span>
                <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                  <div class="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full" style="width: 60%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">12</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-gray-600 w-16">Mar</span>
                <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                  <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full" style="width: 90%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">18</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-gray-600 w-16">Abr</span>
                <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                  <div class="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full" style="width: 45%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">9</span>
              </div>
            </div>
          </div>

          <!-- Status das Associações -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Status das Associações</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span class="font-medium text-gray-900">Ativas</span>
                </div>
                <span class="text-2xl font-bold text-green-600">23</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span class="font-medium text-gray-900">Vencendo</span>
                </div>
                <span class="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span class="font-medium text-gray-900">Vencidas</span>
                </div>
                <span class="text-2xl font-bold text-red-600">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock data para demonstração
const stats = ref({
  associadosAtivos: 25,
  vencendo30Dias: 3,
  associacoesVencidas: 2,
  receitaMes: 15000
})

const alertas = ref([
  {
    id: 1,
    associado: 'Dr. João Silva',
    mensagem: 'Associação vence em 15 dias',
    tipo: 'vencendo'
  },
  {
    id: 2,
    associado: 'Dra. Maria Santos',
    mensagem: 'Associação venceu há 5 dias',
    tipo: 'vencida'
  }
])

const ultimasAssociacoes = ref([
  {
    id: 1,
    associado: 'Dr. Carlos Oliveira',
    data: '15/01/2024',
    valor: 500,
    status: 'ativa'
  },
  {
    id: 2,
    associado: 'Dra. Ana Costa',
    data: '10/01/2024',
    valor: 500,
    status: 'ativa'
  },
  {
    id: 3,
    associado: 'Dr. Pedro Lima',
    data: '05/01/2024',
    valor: 500,
    status: 'vencida'
  }
])

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDelay {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delay {
  animation: fadeInDelay 0.8s ease-out;
}

/* Hover effects for cards */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}
</style>
