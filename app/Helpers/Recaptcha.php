<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class Recaptcha
{
  protected $url;
  protected $request;

  public function __construct()
  {
    $this->url = config('recaptcha.url');
    $this->request = new Request();
  }

  public function verify(String $token)
  {
    $body = [
      'secret' => config('recaptcha.secret'),
      'response' => $token,
      'remoteip' => $this->request->ip()
    ];
    $request = Http::asForm()->post($this->url, $body);
    $response = $request->json();
    if ($request->status() !== 200) {
      return false;
    }
    if (!$response['success']) return false;
    return true;
    // $curl = curl_init();
    // curl_setopt_array($curl, [
    //   CURLOPT_RETURNTRANSFER => 1,
    //   CURLOPT_URL => $this->url,
    //   CURLOPT_POST => 1,
    //   CURLOPT_POSTFIELDS => $body,
    // ]);
    // $response = curl_exec($curl);

    // curl_close($curl);

    // $json = json_decode($response, true);
    // if (!$json['success']) return false;
    // return $json['success'];
  }
}
