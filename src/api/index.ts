import { createFetch } from '@vueuse/core'

function createApiClient() {
  return createFetch({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  })
}

export const $api = createApiClient()
