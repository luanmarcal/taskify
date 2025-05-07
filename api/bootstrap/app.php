<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Throwable $e, $request) {

            $status = 500;
            $response = ['message' => 'Erro interno.'];

            if ($e instanceof \Illuminate\Validation\ValidationException) {
                $status = 422;
                $response = [
                    'message' => 'invalid data.',
                    'errors' => $e->errors(),
                ];
            }

            if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                $status = 401;
                $response = ['message' => 'User not authenticated.'];
            }

            if ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                $status = 403;
                $response = ['message' => 'Access denied.'];
            }

            if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                $status = 404;
                $response = ['message' => 'Resource not found.'];
            }

            // debug mode
            // if (config('app.debug')) {
            //     $response['exception'] = get_class($e);
            //     $response['trace'] = collect($e->getTrace())->take(5);
            // }

            return response()->json($response, $status);
        });
    })->create();
