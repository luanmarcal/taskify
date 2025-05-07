<script setup>
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Trash, Pencil, EyeOff } from 'lucide-vue-next';
import { useTaskStore } from '@/stores/task-store';
import { ref } from 'vue'

defineProps({
    id: Number,
    title: String,
    description: String,
    status: String,
});

const showTask = ref(false);

const handleChange = (taskId, status) => {
    const taskStore = useTaskStore();
    console.log(taskId, status);
    status = status === 'done' ? 'pending' : 'done';
    taskStore.updateTaskStatus(taskId, status);
};

const handleShow = (taskId) => {
    showTask.value = showTask.value === taskId ? false : taskId;
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
            <div class="flex flex-col bg-accent text-accent-foreground rounded-2xl p-4">
                <div class="flex flex-row justify-between bg-secondary text-secondary-foreground rounded-2xl">
                    <!-- Checkbox e título -->
                    <div class="flex items-center space-x-2">
                        <Checkbox id="checkbox" class="cursor-pointer bg-white" :model-value="status === 'done'"
                            @update:model-value="handleChange(id, status)" />

                        <p class="font-bold text-lg truncate overflow-hidden whitespace-nowrap max-w-[10vw]"
                            :title="title">
                            {{ title }}
                        </p>

                    </div>

                    <!-- Botões de ação -->
                    <div class="flex items-center space-x-2">
                        <Button variant="secondary" class="cursor-pointer bg-white border" size="icon"
                            @click="handleShow(id)">
                            <Eye v-if="showTask !== id" />
                            <EyeOff v-else />
                        </Button>
                        <Button variant="secondary" class="cursor-pointer bg-white border" size="icon"
                            @click="handleEdit(id)">
                            <Pencil />
                        </Button>
                        <Button variant="secondary" class="cursor-pointer bg-white border" size="icon"
                            @click="handleDelete(id)">
                            <Trash />
                        </Button>
                    </div>
                </div>

                <!-- Descrição -->
                <div v-if="showTask === id" class="flex flex-col items-start p-4">
                    <p class="text-s break-words">
                        {{ description }}
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>