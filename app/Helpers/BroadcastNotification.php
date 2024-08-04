<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

trait BroadcastNotification
{
  protected Model $entity;

  public function getUserIds(array $emails)
  {
    $userIds = DB::table('users')->whereIn('email', $emails)->pluck('id')->toArray();
    return $userIds;
  }

  public function getDeviceTokens(array $userIds)
  {
    $deviceTokens = DB::table('device_tokens')->whereIn('user_id', $userIds)->pluck('token')->toArray();
    return $deviceTokens;
  }
  /**
   * push notification
   *
   * @param array $emails
   * @param string $title
   * @param string $body
   * @return void
   */
  public function toPushNotification(array $emails, string $title, string $body, string $url = null)
  {
    $userIds = $this->getUserIds($emails);
    $deviceTokens = $this->getDeviceTokens($userIds);
    $this->storeNotification($userIds, $title, $body, $url);
    if (count($deviceTokens) > 0) {
      $firebase = new FirebaseNotification($deviceTokens);
      $firebase->setTitle($title);
      $firebase->setBody($body);
      if ($url) $firebase->setUrlAction($url);
      $firebase->send();
    }
  }

  /**
   * store notification to database
   *
   * @param array $userIds
   * @param string $title
   * @param string $body
   * @return void
   */
  public function storeNotification(array $userIds, string $title, string $body, string $url = null)
  {
    $notifications = collect($userIds)->map(function ($user) use ($title, $body, $url) {
      return [
        'user_id' => $user,
        'reference_type' => get_class($this->getEntity()),
        'reference_id' => $this->getEntity()->id,
        'type' => 'info',
        'title' => $title,
        'description' => $body,
        'url' => $url,
        'created_at' => now(),
        'updated_at' => now(),
      ];
    })->toArray();

    DB::table('notifications')->insert($notifications);
  }

  /**
   * Get the value of entity
   *
   * @return Model
   */
  public function getEntity(): Model
  {
    return $this->entity;
  }

  /**
   * Set the value of entity
   *
   * @param Model $entity
   *
   * @return self
   */
  public function setEntity(Model $entity): self
  {
    $this->entity = $entity;

    return $this;
  }
}
