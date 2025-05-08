<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/task-store';
import TaskCard from '@/components/TaskCard.vue';
import LoadingSpinner from './LoadingSpinner.vue';

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.fetchTasksPending();
});
</script>

<template>
    <main class="space-y-4">
        <LoadingSpinner v-if="!taskStore.isPendingLoaded" />
        <div v-if="taskStore.tasksPending.length === 0 && taskStore.isPendingLoaded"
            class="flex justify-center item-center flex-col opacity-80">
            <p class="font-semibold text-lg max-w-xs self-center">
                Lista de tarefas pendentes vazia...
            </p>
            <img src="@/assets/empty-list.png" alt="Lista vazia" class="max-w-3xs self-center" />
        </div>
        <TaskCard v-for="taskNow in taskStore.tasksPending" :key="taskNow.id" :task="taskNow" />
    </main>
</template>