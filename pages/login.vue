<script lang="ts" setup>
definePageMeta({ layout: false })
const client = useSupabaseAuthClient()
const router = useRouter()

const login = async (provider: 'github' | 'google' | 'gitlab' | 'bitbucket') => {
  const { error } = await client.auth.signInWithOAuth({ provider })
  if (error) {
    return alert('Something went wrong !')
  }

  router.push('/home')
}
</script>

<template>
<div class="flex align-center justify-center w-full h-[100vh]">
  <button @click="login('google')">Login</button>
</div>
</template>

<style scoped></style>
