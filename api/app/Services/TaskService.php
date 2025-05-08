<?php

namespace App\Services;

use App\Models\Task;
use App\Services\Contracts\TaskServiceInterface;

class TaskService implements TaskServiceInterface
{
    protected Task $task;
    private const TASK_FIELDS = ['id', 'title', 'description', 'status'];

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function getAllTasks(?string $status = null): array
    {
        return Task::select(self::TASK_FIELDS)
            ->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->get()
            ->toArray();
    }

    public function createTask(array $data): array
    {
        $data['description'] = $data['description'] ?? '';
        $task = $this->task->create($data);

        return $task->only(self::TASK_FIELDS);
    }

    public function getTaskById(string $id): array
    {
        $task = $this->task->findOrFail($id);

        return $task->only(self::TASK_FIELDS);
    }

    public function updateTask(string $id, array $data): array
    {
        $data['description'] = $data['description'] ?? '';
        $task = $this->task->findOrFail($id);
        $task->update($data);

        return $task->only(self::TASK_FIELDS);
    }

    public function deleteTask(string $id): bool
    {
        $task = $this->task->findOrFail($id);
        return $task->delete();
    }
}
