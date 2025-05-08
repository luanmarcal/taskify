<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore, type TaskResponseInterface } from '@/stores/task-store';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const props = defineProps<{
    typeForm: 'edit' | 'create',
    task?: TaskResponseInterface
}>();

const title = ref(props.task?.title ?? '');
const description = ref(props.task?.description ?? '');

const taskStore = useTaskStore();
const router = useRouter();

const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!props.task && props.typeForm === 'edit') {
        toast.error('Erro ao processar tarefa');
        return;
    }

    if (!title.value.trim()) {
        toast.error('Por favor, preencha o título da tarefa.');
        return;
    }

    if (props.typeForm === 'create') {
        taskStore.addTask({
            title: title.value,
            description: description.value,
            status: 'pending',
        });
    } else if (props.typeForm === 'edit' && props.task) {
        taskStore.editTask(props.task.id, {
            title: title.value,
            description: description.value,
            status: props.task.status
        });
    }

    router.push('/todo-list');
};
</script>

<template>
    <main class="flex flex-col items-center justify-center space-y-8">
        <div class="flex flex-col items-center w-full h-full rounded-2xl p-4 max-w-lg gap-5">
            <form @submit="handleSubmit" class="flex flex-col items-center justify-center space-y-4 mt-8 w-full">
                <Input v-model="title" type="text" placeholder="Título" class="rounded-2xl h-12" />
                <Input v-model="description" type="text" placeholder="Insira uma breve descrição da tarefa"
                    class="rounded-2xl h-16" />
                <Button class="font-semibold rounded-2xl cursor-pointer px-4 py-2 w-full" variant="default"
                    type="submit">
                    Confirmar
                </Button>
                <RouterLink to="/todo-list" class="w-full">
                    <Button class="font-semibold rounded-2xl cursor-pointer px-4 py-2 w-full" variant="outline">
                        Cancelar
                    </Button>
                </RouterLink>
            </form>
        </div>
    </main>
</template>