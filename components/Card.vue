<script lang="ts" setup>

interface Distribution {
  name: string,
  percentage: number,
  color: string
}

interface Relation {
  total: number,
  distribution: Distribution[]
}

interface Props {
  title: string
  relation: Relation
}

const props = defineProps<Props>()
import { useFinancial } from "../composables/useFinancial"
import { useTransactionsStore } from "../store/transactionsStore"

const store = useTransactionsStore()

const { currency } = useFinancial()

const { relation } = toRefs(props)
</script>

<template>
<Box class="min-w-[15%]">
  <div class="flex flex-col p-6 w-full">
    <h1 class="card__title"> {{ title }} </h1>
    <span class="text-sm text-white mb-4">Total no período</span>
    <h2 :text="relation.total" class="text-4xl text-white font-medium leading-10"> {{ currency(Math.abs(relation.total)) }}</h2>
    <h2 v-if="relation.total" :text="relation.total" class="text-md text-white font-medium leading-10"> {{ currency(Math.abs(relation.total) / store.denominador[store.type].valor) }}/{{ store.denominador[store.type].titulo }}</h2>
    <hr class="my-4 border-[#3e3e3e]">
    <div class="flex gap-3 flex-col">
      <div class="flex flex-col gap-1"  v-for="distribution in relation.distribution.filter(f => f.percentage)" :text="distribution.name">
        <div class="flex justify-between items-center">  
          <span class="text-sm text-white font-medium">{{ distribution.name }}</span>
          <span class="text-xs text-white font-medium">{{ currency((distribution.percentage / 100) * relation.total) }}</span>
        </div>
        <Progress :progress="distribution.percentage"/>
      </div>
    </div>
    </div>
</Box>
</template>

<style scoped>

</style>
