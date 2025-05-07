<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main
    class="flex-1 flex flex-col items-center justify-center p-4 h-screen w-screen bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0]">
    <RouterView />
    <Footer />
  </main>
</template>
