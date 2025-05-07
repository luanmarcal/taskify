<script setup>
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';

import TaskCard from '@/components/TaskCard.vue';

</script>

<template>
    <main class="space-y-4">
        <TaskCard id="1" title="Concluída 1" description="Descrição da tarefa 1" completed="false" />
        <TaskCard id="2" title="Concluída 2" description="Descrição da tarefa 2" completed="false" />
    </main>
</template>