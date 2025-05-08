<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Trash, Pencil, EyeOff } from 'lucide-vue-next';
import { useTaskStore } from '@/stores/task-store';
import { ref } from 'vue'
import type { TaskResponseInterface } from '@/stores/task-store';
import { useRouter } from 'vue-router';

const props = defineProps<{
    task: TaskResponseInterface;
}>();

const router = useRouter();
const showTask = ref(false as number | boolean);

const handleChange = (taskId: number | undefined, status: string | undefined) => {
    if (taskId === undefined) return;
    if (status === undefined) return;

    const taskStore = useTaskStore();
    console.log(taskId, status);
    status = status === 'done' ? 'pending' : 'done';
    taskStore.updateTaskStatus(taskId, status);
};

const handleShow = (taskId: number | boolean | undefined) => {
    if (taskId === undefined) return;
    showTask.value = showTask.value === taskId ? false : taskId;
};

const handleEdit = (taskToEdit: TaskResponseInterface) => {
    if (!taskToEdit) return;

    router.push({
        path: '/todo-list/edit-task',
        query: {
            id: taskToEdit.id,
            title: taskToEdit.title,
            description: taskToEdit.description,
            status: taskToEdit.status
        }
    });
};



const handleDelete = (taskId: number | undefined) => {
    if (taskId === undefined) return;
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
                        <Checkbox id="checkbox" class="cursor-pointer bg-white"
                            :model-value="props.task.status === 'done'"
                            @update:model-value="handleChange(props.task.id, props.task.status)" />

                        <p class="font-bold text-lg truncate overflow-hidden whitespace-nowrap max-w-[10vw]"
                            :title="props.task.title">
                            {{ props.task.title }}
                        </p>

                    </div>

                    <!-- Botões de ação -->
                    <div class="flex items-center space-x-2">
                        <Button v-if="props.task?.description" variant="secondary" class="cursor-pointer bg-white border"
                            size="icon" @click="handleShow(props.task.id)">
                            <Eye v-if="showTask !== props.task.id" />
                            <EyeOff v-else />
                        </Button>
                        <Button variant="secondary" class="cursor-pointer bg-white border" size="icon"
                            @click="handleEdit(props.task)">
                            <Pencil />
                        </Button>
                        <Button variant="secondary" class="cursor-pointer bg-white border" size="icon"
                            @click="handleDelete(props.task.id)">
                            <Trash />
                        </Button>
                    </div>
                </div>

                <!-- Descrição -->
                <div v-if="showTask === props.task.id" class="flex flex-col items-start p-4">
                    <p class="text-s break-words">
                        {{ props.task.description }}
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>