<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
</script>

<template>
  <main>

    <div class="flex flex-col items-center justify-center">
      <h1 class="text-3xl font-semibold">Taskify</h1>
      <img src="@/assets/logo.png" alt="Logo" class="max-w-3xs" />
      <p class="text-center font-semibold text-lg max-w-xs">
        A maneira de começar é parar de falar e começar a fazer.
      </p>
    </div>
    <div class="flex flex-col items-center justify-center space-y-4 mt-16">
      <RouterLink to="/todo-list">
        <Button class="w-48 font-semibold rounded-2xl cursor-pointer" variant="default">
          Começar
        </Button>
      </RouterLink>
    </div>

  </main>
</template>
