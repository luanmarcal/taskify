<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { TaskResponseInterface } from '@/stores/task-store';
import FormTask from '@/components/FormTask.vue';

const route = useRoute();

const taskNow = route.query ? {
    id: Number(route.query.id),
    title: String(route.query.title),
    description: String(route.query.description),
    status: String(route.query.status)
} as TaskResponseInterface : undefined;
</script>

<template>
    <main class="flex flex-col items-center justify-center space-y-8">
        <div class="flex flex-col items-center w-[80vw] h-[80vh] rounded-2xl p-4 max-w-lg gap-5">
            <img src="@/assets/logo.png" alt="Logo" class="max-w-28" />
            <h1 class="text-2xl font-semibold">Editar Tarefa</h1>
            <FormTask class="w-full h-full" typeForm="edit" :task="taskNow" />
        </div>
    </main>
</template>
