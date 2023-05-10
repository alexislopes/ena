<script lang="ts" setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';

import { computed, ref, watch } from 'vue';
const client = useSupabaseClient()
const { data: contas } = await useAsyncData('contas', async () => {
  const { data } = await client.from('contas').select()
  return data
})

const props = defineProps({
  conta: { type: String },
  orcamento: { type: Number },
  descricao: { type: String },
  prazo: { type: String }
})



const emit = defineEmits(['update:conta', 'update:orcamento', 'update:descricao', 'update:prazo', 'submit'])

const { conta, orcamento, descricao, prazo } = toRefs(props)

const selectedConta = ref()

watch(selectedConta, () => {
  emit('update:conta', contas.value?.find(conta => conta.nome === selectedConta.value).id)
})
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
<div class="flex flex-col items-center rounded-md justify-center h-fit w-1/3 bg-surface text-white">
  <div class="w-full p-4 relative">
    Conta
    <Combobox v-model="selectedConta">
      <ComboboxInput class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
        @change="query = $event.target.value" />
      <ComboboxOptions
        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="person in filteredConta" :key="person.id" :value="person.nome">
          {{ person.nome }}
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
    <label class="text-white flex flex-col" for="">
      Orçamento
      <input class="text-black" :value="orcamento" @input="$emit('update:orcamento', $event.target.value)" type="number">
    </label>
    <label class="text-white flex flex-col" for="">
      Descrição
      <input  class="text-black" :value="descricao" @input="$emit('update:descricao', $event.target.value)" type="text">
    </label>
    <div>
      <label class="text-white flex flex-col" for="">
        Prazo
        <input class="text-black" :value="prazo" @input="$emit('update:prazo', $event.target.value)" type="date">
      </label>
    </div>
    <button @click="$emit('submit')" class="w-full pt-3">Criar objetivo</button>
  </div>
</div>
</template>

<style scoped></style>
