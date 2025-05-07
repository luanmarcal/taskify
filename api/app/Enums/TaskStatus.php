<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Pending = 'pending';
    case Done = 'done';

    /**
     * Retorna os valores válidos do enum.
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
