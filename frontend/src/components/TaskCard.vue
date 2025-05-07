<script setup>
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash } from 'lucide-vue-next';
import { Pencil } from 'lucide-vue-next';
import { useTaskStore } from '@/stores/task-store';

defineProps({
    id: Number,
    title: String,
    description: String,
    status: String,
});

const handleChange = (taskId, status) => {
    const taskStore = useTaskStore();
    console.log(taskId, status);
    status = status === 'done' ? 'pending' : 'done';
    taskStore.updateTaskStatus(taskId, status);
};

const handleEdit = (taskId) => {
    // const taskStore = useTaskStore();
    // taskStore.setTaskToEdit(taskId);
};

const handleDelete = (taskId) => {
    const taskStore = useTaskStore();
    taskStore.deleteTask(taskId);
};
</script>

<template>
    <main>
        <div class="justify-around items-center">
            <div class="flex flex-row justify-between bg-secondary text-secondary-foreground shadow-xs rounded-2xl p-4">
                <!-- Checkbox e título -->
                <div class="flex items-center space-x-2">
                    <Checkbox id="checkbox" class="cursor-pointer bg-white" :model-value="status === 'done'"
                        @update:model-value="handleChange(id, status)" />
                    <Button variant="ghost" class="cursor-pointer">
                        <p class="font-bold text-lg truncate overflow-hidden whitespace-nowrap hover:opacity-80 max-w-[10vw]"
                            :title="title">
                            {{ title }}
                        </p>
                    </Button>
                </div>

                <!-- Botões de ação -->
                <div class="flex items-center space-x-2">
                    <Button variant="ghost" class="cursor-pointer bg-white shadow-xs" size="icon"
                        @click="handleEdit(id)">
                        <Pencil />
                    </Button>
                    <Button variant="ghost" class="cursor-pointer bg-white shadow-xs" size="icon"
                        @click="handleDelete(id)">
                        <Trash />
                    </Button>
                </div>
            </div>
        </div>
    </main>
</template>