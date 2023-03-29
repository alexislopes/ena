<script  setup>
import { v4 as uuidv4 } from 'uuid';
import { ref } from "vue";
import { useResourcesStore } from "../store/resourcesStore.js";

const store = useResourcesStore();

const agregador = ref("");

function createResource() {
  console.log(store.resources)
  store.resources.push({ agregador: agregador.value, id: uuidv4() })
}
</script>

<template>
  <div>
    <label>
      Agregador
      <input type="text" v-model="agregador" name="" id="">
    </label>
    <button @click="createResource">+</button>
  </div>
  <div v-for="resource in store.resources" :key="resource.agregador">{{ resource.agregador }}</div>
</template>

<style scoped></style>
