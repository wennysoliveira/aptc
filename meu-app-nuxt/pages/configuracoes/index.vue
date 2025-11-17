<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Configurações Gerais -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Configurações Gerais</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Associação</label>
            <input
              type="text"
              value="Associação dos Psicanalistas e Terapeutas Cristãos"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor da Associação (R$)</label>
            <input
              type="number"
              value="500"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Prazo de Validade (meses)</label>
            <input
              type="number"
              value="12"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Configurações de Notificação -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Notificações</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Alertas de Vencimento</p>
              <p class="text-sm text-gray-500">Enviar alertas antes do vencimento</p>
            </div>
            <input type="checkbox" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Dias antes do vencimento</label>
            <input
              type="number"
              value="30"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Email de Notificação</p>
              <p class="text-sm text-gray-500">Enviar emails automáticos</p>
            </div>
            <input type="checkbox" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          </div>
        </div>
      </div>

      <!-- Backup e Segurança -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Backup e Segurança</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Backup Automático</p>
              <p class="text-sm text-gray-500">Fazer backup diário dos dados</p>
            </div>
            <input type="checkbox" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Frequência do Backup</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
          
          <button class="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
            Fazer Backup Agora
          </button>
        </div>
      </div>

      <!-- Informações do Sistema -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Informações do Sistema</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Versão do Sistema</span>
            <span class="text-sm font-medium text-gray-900">1.0.0</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Última Atualização</span>
            <span class="text-sm font-medium text-gray-900">15/01/2024</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Total de Associados</span>
            <span class="text-sm font-medium text-gray-900">25</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Associações Ativas</span>
            <span class="text-sm font-medium text-gray-900">23</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de Ação -->
    <div class="flex justify-end space-x-4">
      <button class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Cancelar
      </button>
      <button class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800">
        Salvar Configurações
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
