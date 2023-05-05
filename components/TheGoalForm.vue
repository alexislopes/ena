<script lang="ts" setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { computed, ref } from 'vue'
const client = useSupabaseClient()
const { data: contas } = await useAsyncData('contas', async () => {
  const { data } = await client.from('contas').select()
  return data
})

const selectedConta = ref()
const query = ref('')

const filteredConta = computed(() =>
  query.value === ''
    ? contas
    : contas.value.filter((conta) => {
      return conta.nome.toLowerCase().includes(query.value.toLowerCase())
    })
)
</script>

<template>
  <div>
    <Combobox v-model="selectedConta">
    <ComboboxInput @change="query = $event.target.value" />
    <ComboboxOptions>
      <ComboboxOption
        v-for="person in filteredConta"
        :key="person.id"
        :value="person.nome"
      >
        {{ person.nome }}
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
  </div>
</template>

<style scoped></style>
