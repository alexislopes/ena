import { ref } from "vue";

export const useResourcesStore = defineStore('resources', () => {
  const resources = ref([])

  return { resources }
});