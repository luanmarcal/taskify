<?php

namespace App\Services\Contracts;

interface TaskServiceInterface
{
    public function getAllTasks(?string $status = null): array;
    public function createTask(array $data): array;
    public function getTaskById(string $id): array;
    public function updateTask(string $id, array $data): array;
    public function deleteTask(string $id): bool;
}
