<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { Button } from '@/components/ui/button';
import { useTaskStore } from '@/stores/task-store';
import { onMounted } from 'vue';

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.fetchTasks();
});

</script>

<template>
    <main class="flex flex-col items-center justify-center space-y-8">

        <RouterLink to="/">
            <Button class="cursor-pointer" variant="ghost">
                <h1 class="text-3xl font-semibold font-righteous">Taskify</h1>
            </Button>
        </RouterLink>

        <div class="flex flex-col shadow-xl w-[80vw] h-[80vh] rounded-2xl p-4 bg-white max-w-5xl">
            
            <RouterView />
        </div>

    </main>
</template>