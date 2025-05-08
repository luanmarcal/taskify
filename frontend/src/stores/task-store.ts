import { defineStore } from 'pinia';
import axios from 'axios';
import { toast } from 'vue-sonner';

export const API_URL = 'http://localhost:8000/api/v1';

export interface TaskInterface {
    title: string;
    description: string;
    status: string;
}

export interface TaskResponseInterface extends TaskInterface {
    id: number;
}

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasksPending: [] as TaskResponseInterface[],
        tasksDone: [] as TaskResponseInterface[],
        tasks: [] as TaskResponseInterface[],
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
                toast.success('Tasks pendentes carregadas com sucesso!');
            } catch (error) {
                console.error('Erro ao buscar as tasks pendentes:', error);
                toast.error('Erro ao buscar as tasks pendentes!');
            }
        },
        async fetchTasksDone() {
            if (this.isDoneLoaded) return this.tasksDone;
            try {
                const response = await axios.get(`${API_URL}/tasks?status=done`);
                this.tasksDone = response.data.data;
                this.isDoneLoaded = true;
                toast.success('Tasks concluídas carregadas com sucesso!');
            } catch (error) {
                console.error('Erro ao buscar as tasks concluídas:', error);
                toast.error('Erro ao buscar as tasks concluídas!');
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
                toast.success('Status da task atualizado com sucesso!');
            } catch (error) {
                console.error('Erro ao atualizar o status da task:', error);
                toast.error('Erro ao atualizar o status da task!');
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
                toast.success('Task deletada com sucesso!');
            } catch (error) {
                console.error('Erro ao deletar a task:', error);
                toast.error('Erro ao deletar a task!');
            }
        },
        async addTask(task: TaskInterface) {
            try {
                const response = await axios.post(`${API_URL}/tasks`, task);
                this.tasks.push(response.data.data);
                this.tasksPending.push(response.data.data);
                toast.success('Task adicionada com sucesso!');
            } catch (error) {
                console.error('Erro ao adicionar a task:', error);
                toast.error('Erro ao adicionar a task!');
            }
        },
        async editTask(taskId: number, updatedTask: TaskInterface) {
            try {
                const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

                if (taskIndex === -1) {
                    throw new Error('Task não encontrada');
                }

                const updatedTaskWithId = { ...updatedTask, id: taskId };
                this.tasks[taskIndex] = updatedTaskWithId;

                if (updatedTaskWithId.status === 'pending') {
                    this.tasksPending = this.tasksPending.filter(task => task.id !== taskId);
                    this.tasksPending.push(updatedTaskWithId);
                } else if (updatedTaskWithId.status === 'done') {
                    this.tasksDone = this.tasksDone.filter(task => task.id !== taskId);
                    this.tasksDone.push(updatedTaskWithId);
                }

                const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);

                if (response.status !== 200) {
                    throw new Error('Erro ao editar a task');
                }

                toast.success('Task editada com sucesso!');
            } catch (error) {
                console.error('Erro ao editar a task:', error);
                toast.error('Erro ao editar a task!');
            }
        },
    },
});