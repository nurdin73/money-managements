<?php

namespace App;

enum ActionBudgetHistory
{
    case CREATE;
    case UPDATE;
    case DELETE;
    case EXCEED;

    public static function getAction($action): string
    {
        return match ($action) {
            self::CREATE => 'CREATE',
            self::UPDATE => 'UPDATE',
            self::DELETE => 'DELETE',
            self::EXCEED => 'EXCEED',
        };
    }
}
