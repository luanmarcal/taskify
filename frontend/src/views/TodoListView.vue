<script setup>
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus } from 'lucide-vue-next';
import CompletedTasks from '@/components/CompletedTasks.vue'
import PendingTasks from '@/components/PendingTasks.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
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
            <div class="justify-around items-center my-4">
                <RouterLink to="/todo-list">
                    <Button class="font-bold rounded-2xl cursor-pointer w-full" variant="default">
                        <Plus class=" w-4 h-4" />
                        <p class="font-bold">
                            Adicionar Tarefa
                        </p>
                    </Button>
                </RouterLink>
            </div>

            <Tabs default-value="pending"
                class="flex flex-col items-center justify-center rounded-2xl w-full h-full p-4 overflow-auto space-y-2"
                orientation="vertical">

                <TabsList class="w-full rounded-2xl min-h-[6vh] p-2">
                    <TabsTrigger value="pending" class="cursor-pointer rounded-2xl">
                        Pendentes
                    </TabsTrigger>

                    <TabsTrigger value="completed" class="cursor-pointer rounded-2xl">
                        Concluídas
                    </TabsTrigger>
                </TabsList>

                <ScrollArea
                    class="flex flex-col items-center justify-around rounded-2xl w-full h-full p-4 overflow-auto border">

                    <TabsContent value="pending" class="flex flex-col items-center justify-around space-y-4">
                        <PendingTasks class="w-full h-full" />
                    </TabsContent>

                    <TabsContent value="completed" class="flex flex-col items-center space-y-4">
                        <CompletedTasks class="w-full h-full" />
                    </TabsContent>

                </ScrollArea>
            </Tabs>
        </div>

    </main>
</template>