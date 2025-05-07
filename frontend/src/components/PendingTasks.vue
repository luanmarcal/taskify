<script setup>
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';

import TaskCard from '@/components/TaskCard.vue';

</script>

<template>
    <main>
        <TaskCard id="1" title="Pendente 1" description="Descrição da tarefa 1" completed="false" />
    </main>
</template>