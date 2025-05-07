<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/task-store';
import TaskCard from '@/components/TaskCard.vue';

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.fetchTasksDone();
});
</script>

<template>
    <main class="space-y-4">
        <div v-if="taskStore.tasksDone.length === 0">Carregando tarefas...</div>
        <TaskCard v-for="task in taskStore.tasksDone" :key="task.id" :id="task.id" :title="task.title"
            :description="task.description" :status="task.status" />
    </main>
</template>