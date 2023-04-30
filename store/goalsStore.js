import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const useGoalsStore = defineStore('goals', () => {
  const goals = ref(useStorage('goals', []))

  function createGoal(goal) {
    goals.value.push(goal)
  }

  return { createGoal, goals }
});