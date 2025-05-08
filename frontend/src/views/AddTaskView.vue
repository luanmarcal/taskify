<script setup lang="ts">
import FormTask from '@/components/FormTask.vue';

</script>

<template>
    <main class="flex flex-col items-center justify-center space-y-8">
        <div class="flex flex-col items-center w-[80vw] h-[80vh] rounded-2xl p-4 max-w-lg gap-5">
            <img src="@/assets/logo.png" alt="Logo" class="max-w-28" />
            <h1 class="text-2xl font-semibold">Adicionar Tarefa</h1>
            <FormTask class="w-full h-full" typeForm="create" />
        </div>
    </main>
</template>

<style scoped></style>