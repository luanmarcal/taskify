<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Services\Contracts\TaskServiceInterface;

class TaskController extends Controller
{
    protected TaskServiceInterface $taskService;

    public function __construct(TaskServiceInterface $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index()
    {
        $status = request()->get('status');

        $tasks = $this->taskService->getAllTasks($status);

        return response([
            'data' => $tasks,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskService->createTask($request->validated());

        return response([
            'data' => $task,
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = $this->taskService->getTaskById($id);

        return response([
            'data' => $task,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id)
    {
        $task = $this->taskService->updateTask($id, $request->validated());

        return response([
            'data' => $task,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->taskService->deleteTask($id);

            return response([
                'message' => 'Task deleted successfully',
                'id' => $id,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response([
                'message' => 'Task not found',
                'id' => $id,
            ], 404);
        } catch (\Exception $e) {
            return response([
                'message' => 'Failed to delete task',
                'error' => $e->getMessage(),
                'id' => $id,
            ], 500);
        }
    }
}
