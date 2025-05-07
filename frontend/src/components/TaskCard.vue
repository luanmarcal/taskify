<script setup>
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash } from 'lucide-vue-next';
import { Pencil } from 'lucide-vue-next';

defineProps({
    id: Number,
    title: String,
    description: String,
    completed: Boolean,
});
</script>

<template>
    <main>
        <div class="justify-around items-center">
            <div class="flex flex-row justify-between bg-secondary text-secondary-foreground shadow-xs rounded-2xl p-4">
                <!-- Checkbox e título -->
                <div class="flex items-center space-x-2">
                    <Checkbox id="checkbox" class="cursor-pointer bg-white" :checked="completed"
                        aria-label="Marcar como concluído" />
                    <Button variant="ghost" class="cursor-pointer">
                        <p class="font-bold text-lg truncate overflow-hidden whitespace-nowrap max-w-[15vw] hover:opacity-80"
                            :title="title">
                            {{ title }}
                        </p>
                    </Button>
                </div>

                <!-- Botões de ação -->
                <div class="flex items-center space-x-2">
                    <Button variant="ghost" class="cursor-pointer bg-white shadow-xs" size="icon"
                        aria-label="Editar tarefa">
                        <Pencil />
                    </Button>
                    <Button variant="ghost" class="cursor-pointer bg-white shadow-xs" size="icon"
                        aria-label="Excluir tarefa">
                        <Trash />
                    </Button>
                </div>
            </div>
        </div>
    </main>
</template>