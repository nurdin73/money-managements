<?php

namespace App\Observers;

class AuthorObserver
{
    protected $author;

    public function __construct()
    {
        $user = auth()->user();
        $this->author = "guest";

        if (!blank($user)) {
            $this->author = sprintf(
                '%s | %s | %s',
                $user->id,
                trim(sprintf('%s %s', $user->name)),
                $user->email
            );
        }
    }

    public function updating($model)
    {
        $model->modified_by = $this->author;
    }

    public function creating($model)
    {
        $model->created_by = $this->author;
    }
}
