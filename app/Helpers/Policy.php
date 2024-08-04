<?php

namespace App\Helpers;

use App\Models\Master\User;

trait Policy
{
  public function viewAny(?User $user)
  {
    if ($user?->is_admin) {
      return $user->allowRead();
    }
    return true;
  }

  public function view(User $user)
  {
    if ($user->is_admin) {
      return $user->allowRead();
    }
    return true;
  }

  public function update(User $user)
  {
    if ($user->is_admin) return $user->allowUpdate();
    return true;
  }

  public function create(User $user)
  {
    if ($user->is_admin) return $user->allowCreate();
    return true;
  }

  public function delete(User $user)
  {
    if ($user->is_admin) return $user->allowDelete();
    return true;
  }
}
