export default defineNuxtRouteMiddleware((to) => {
  // Páginas públicas que não precisam de autenticação
  const publicPages = ['/login']
  
  if (publicPages.includes(to.path)) {
    return
  }
  
  // Por enquanto, sempre permitir acesso para testes
  return
})
