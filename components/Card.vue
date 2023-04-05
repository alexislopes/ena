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

const { relation } = toRefs(props)

const valor = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(relation.value.total);
})

</script>

<template>
          <div class="w-fit bg-[#fefefe] min-w-[15%] rounded shadow-lg p-2 flex flex-col gap-2">
            <h1> {{ title }} </h1>
            <h2 :text="relation.total"> {{ valor }}</h2>
            <div v-if="relation.total" style="display: flex;">
              <div v-for="distribution in relation.distribution.filter(f => f.percentage)" :text="distribution.name" class="bg-amber-500 rounded-full h-2"
                :style="{ width: distribution.percentage + '%', border: '1px solid #ccc' }">
                <p class="text-xs">{{ distribution.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
