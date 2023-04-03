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
  relation: Relation
}

const props = defineProps<Props>()

</script>

<template>
  <div style="width: fit-content; background: cyan; min-width: 25%;">
    <h1> Expenses </h1>
    <h2 :text="relation.total"> {{ relation.total }}</h2>
    <div style="display: flex;">
      <div v-for="distribution in relation.distribution" :text="distribution.name"
        :style="{ width: distribution.percentage + '%', height: '16px', border: '1px solid #ccc', background: '#ed7900' }">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
