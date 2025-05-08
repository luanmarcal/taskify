import HomeView from '@/views/HomeView.vue'
import TodoListView from '@/views/TodoListView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddTaskView from '@/views/AddTaskView.vue'
import TodoListLayout from '@/views/TodoListLayout.vue'
import EditTaskView from '@/views/EditTaskView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/todo-list',
            name: 'todo-list',
            component: TodoListLayout,
            children: [
                {
                    path: '',
                    name: 'todo-list-view',
                    component: TodoListView,
                },
                {
                    path: '/todo-list/add-task',
                    name: 'add-task',
                    component: AddTaskView,
                },
                {
                    path: '/todo-list/edit-task',
                    name: 'edit-task',
                    component: EditTaskView
                }
            ],
        },
    ],
})

export default router
