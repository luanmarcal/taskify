<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
import { Toaster } from '@/components/ui/sonner'

</script>

<template>
  <main
    class="flex-1 flex flex-col items-center justify-center p-4 h-screen w-screen bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] space-y-5">
    <RouterView />
    <Footer />
    <Toaster class="pointer-events-auto" />
  </main>
</template>
