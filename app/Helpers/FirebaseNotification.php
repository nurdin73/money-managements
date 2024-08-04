<?php

namespace App\Helpers;

use App\Models\Global\DeviceToken;
use App\Repositories\Global\DeviceTokenRepository;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ItemNotFoundException;

class FirebaseNotification
{
  protected array $deviceTokens = [];
  protected string $urlAction = '';
  protected string $title = '';
  protected string $body = '';
  protected string $icon = '';
  protected string $image = '';
  protected array|null $data = null;
  protected $request;

  public function __construct(array $deviceTokens = [], array|null $data = null)
  {
    $this->deviceTokens = $deviceTokens;
    $this->title = "Notification From " . config('app.name');
    $this->body = "Test Of Notification";
    $this->data = $data;
    $this->request = new HttpRequest();
  }

  public function deviceTokenRepository()
  {
    return DeviceToken::query();
  }

  public function register($userId, string $deviceToken)
  {
    $this->deviceTokenRepository()->updateOrCreate([
      'user_id' => $userId,
      'device' => $this->request->userAgent(),
    ], [
      'token' => $deviceToken
    ]);
    $this->subscribe([$deviceToken], "news");
  }

  public function send()
  {
    if (count($this->getDeviceTokens()) == 0) return;
    // $body = json_encode($notifications);
    $body = [
      'registration_ids' => $this->getDeviceTokens(),
      'notification' => [
        'title' => $this->getTitle(),
        'body' => $this->getBody(),
        'icon' => $this->getIcon(),
        'image' => $this->getImage()
      ],
    ];
    if ($this->getData()) {
      $body['data'] = $this->getData();
    }

    $body = json_encode($body);
    $request = new Request("POST", config('services.firebase_notification.send_url'), $this->headers(), $body);
    $promise = $this->client()->sendAsync($request)->then(function ($response) {
      Log::info("send notif firebase \n " . $response->getBody()->getContents());
    });
    $promise->wait();
    return "success";
  }

  public function subscribe(array $tokens, String $topic)
  {
    if (count($tokens) > 0) {
      $body = json_encode([
        'to' => "/topics/$topic",
        'registration_tokens' => $tokens
      ]);
      $request = new Request("POST", config('services.firebase_notification.subscribe_url'), $this->headers(), $body);
      $promise = $this->client()->sendAsync($request)->then(function ($res) use ($topic) {
        Log::info("Subscribe to topic $topic \n" . $res->getBody());
      });
      $promise->wait();
    }
  }

  public function unsubscribe(array $tokens, String $topic)
  {
    if (count($tokens) > 0) {
      $body = json_encode([
        'to' => "/topics/$topic",
        'registration_tokens' => $tokens
      ]);
      $request = new Request('POST', config('services.firebase_notification.unsubscribe_url'), $this->headers(), $body);
      $promise = $this->client()->sendAsync($request)->then(function ($res) use ($topic) {
        Log::info("Unsubscribe topic $topic \n" . $res->getBody());
      });
      $promise->wait();
    }
  }

  protected function client()
  {
    return new Client(['verify' => false]);
  }

  public function headers()
  {
    return [
      "Authorization" => "key=" . config('services.firebase_notification.key'),
      "Content-Type" => "application/json"
    ];
  }

  /**
   * Get the value of deviceTokens
   *
   * @return array
   */
  public function getDeviceTokens(): array
  {
    $deviceTokens = [];
    foreach ($this->deviceTokens as $token) {
      $deviceTokens[] = $token;
    }
    return $deviceTokens;
    // return $this->deviceTokens;
  }

  /**
   * Set the value of deviceTokens
   *
   * @param array $deviceTokens
   *
   * @return self
   */
  public function setDeviceTokens(array $deviceTokens): self
  {
    $this->deviceTokens = $deviceTokens;

    return $this;
  }

  /**
   * Get the value of urlAction
   *
   * @return string
   */
  public function getUrlAction(): string
  {
    return $this->urlAction;
  }

  /**
   * Set the value of urlAction
   *
   * @param string $urlAction
   *
   * @return self
   */
  public function setUrlAction(string $urlAction): self
  {
    $this->urlAction = $urlAction;

    return $this;
  }

  /**
   * Get the value of title
   *
   * @return string
   */
  public function getTitle(): string
  {
    return $this->title;
  }

  /**
   * Set the value of title
   *
   * @param string $title
   *
   * @return self
   */
  public function setTitle(string $title): self
  {
    $this->title = $title;

    return $this;
  }

  /**
   * Get the value of body
   *
   * @return string
   */
  public function getBody(): string
  {
    return $this->body;
  }

  /**
   * Set the value of body
   *
   * @param string $body
   *
   * @return self
   */
  public function setBody(string $body): self
  {
    $this->body = $body;

    return $this;
  }

  /**
   * Get the value of icon
   *
   * @return string
   */
  public function getIcon(): string
  {
    return $this->icon;
  }

  /**
   * Set the value of icon
   *
   * @param string $icon
   *
   * @return self
   */
  public function setIcon(string $icon): self
  {
    $this->icon = $icon;

    return $this;
  }

  /**
   * Get the value of data
   *
   * @return array|null
   */
  public function getData(): array|null
  {
    return $this->data;
  }

  /**
   * Set the value of data
   *
   * @param array|null $data
   *
   * @return self
   */
  public function setData(array|null $data): self
  {
    $this->data = $data;

    return $this;
  }

  /**
   * Get the value of image
   *
   * @return string
   */
  public function getImage(): string
  {
    return $this->image;
  }

  /**
   * Set the value of image
   *
   * @param string $image
   *
   * @return self
   */
  public function setImage(string $image): self
  {
    $this->image = $image;

    return $this;
  }
}
