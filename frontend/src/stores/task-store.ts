import { defineStore } from 'pinia';
import axios from 'axios';

export const API_URL = 'http://localhost:8000/api/v1';

export interface TaskInterface {
    id: number;
    title: string;
    description: string;
    status: string;
}

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasksPending: [] as TaskInterface[],
        tasksDone: [] as TaskInterface[],
        tasks: [] as TaskInterface[],
        isPendingLoaded: false,
        isDoneLoaded: false,
        isTasksLoaded: false
    }),
    actions: {
        async fetchTasks() {
            if (this.isTasksLoaded) return this.tasks;
            try {
                const response = await axios.get(`${API_URL}/tasks`);
                this.tasks = response.data.data;
                this.isTasksLoaded = true;
            } catch (error) {
                console.error('Erro ao buscar as tasks:', error);
            }
        },
        async fetchTasksPending() {
            if (this.isPendingLoaded) return this.tasksPending;
            try {
                const response = await axios.get(`${API_URL}/tasks?status=pending`);
                this.tasksPending = response.data.data;
                this.isPendingLoaded = true;
            } catch (error) {
                console.error('Erro ao buscar as tasks pendentes:', error);
            }
        },
        async fetchTasksDone() {
            if (this.isDoneLoaded) return this.tasksDone;
            try {
                const response = await axios.get(`${API_URL}/tasks?status=done`);
                this.tasksDone = response.data.data;
                this.isDoneLoaded = true;
            } catch (error) {
                console.error('Erro ao buscar as tasks concluídas:', error);
            }
        },
        async updateTaskStatus(taskId: number, status: string) {
            try {
                const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

                if (taskIndex === -1) {
                    throw new Error('Task não encontrada');
                }

                const updatedTask = { ...this.tasks[taskIndex], status };
                this.tasks[taskIndex] = updatedTask;

                this.tasksPending = this.tasksPending.filter((task) => task.id !== taskId);
                this.tasksDone = this.tasksDone.filter((task) => task.id !== taskId);

                if (status === 'pending') {
                    this.tasksPending.push(updatedTask);
                } else if (status === 'done') {
                    this.tasksDone.push(updatedTask);
                }

                const response = await axios.put(`${API_URL}/tasks/${taskId}`, { status });

                if (response.status !== 200) {
                    throw new Error('Erro ao atualizar o status da task');
                }
            } catch (error) {
                console.error('Erro ao atualizar o status da task:', error);
            }
        },
        async deleteTask(taskId: number) {
            try {
                const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

                if (taskIndex === -1) {
                    throw new Error('Task não encontrada');
                }

                this.tasks.splice(taskIndex, 1);
                this.tasksPending = this.tasksPending.filter((task) => task.id !== taskId);
                this.tasksDone = this.tasksDone.filter((task) => task.id !== taskId);

                const response = await axios.delete(`${API_URL}/tasks/${taskId}`);

                if (response.status !== 200) {
                    throw new Error('Erro ao deletar a task');
                }
            } catch (error) {
                console.error('Erro ao deletar a task:', error);
            }
        },
    },
});