<?php

namespace App\Helpers;

use App\Models\Global\AutoNumber;
use App\Models\Master\User;
use Illuminate\Support\Str;

class GenerateAutoNumber
{
  protected string $prefix = '';
  protected string $key = '';
  protected string $random = '';
  protected string $template = ':prefix:time:sequence';
  protected array $data = [];

  public function __construct(string $key, string $template)
  {
    $this->key = $key;
    $this->prefix = 'INVA';
    $this->template = $template;
  }



  /**
   * Get the value of prefix
   *
   * @return string
   */
  public function getPrefix(): string
  {
    return $this->prefix;
  }

  /**
   * Set the value of prefix
   *
   * @param string $prefix
   *
   * @return self
   */
  public function setPrefix(string $prefix): self
  {
    $this->prefix = $prefix;

    return $this;
  }

  /**
   * Get the value of key
   *
   * @return string
   */
  public function getKey(): string
  {
    return $this->key;
  }

  /**
   * Set the value of key
   *
   * @param string $key
   *
   * @return self
   */
  public function setKey(string $key): self
  {
    $this->key = $key;

    return $this;
  }

  public function create(): string
  {
    $autoNumber = AutoNumber::where('key', $this->getKey())->first();
    if (!$autoNumber) {
      $autoNumber = AutoNumber::create([
        'key' => $this->getKey(),
        'template' => $this->getTemplate()
      ]);
    }
    $autoNumber->template = $this->getTemplate();
    $autoNumber->sequence += 1;
    $template = $autoNumber->template;
    foreach ($this->getData() as $key => $value) {
      $template = str_replace(":{$key}", $value, $template);
    }
    $template = str_replace(":sequence", sprintf("%05s", $autoNumber->sequence), $template);
    $template = str_replace(":time", time(), $template);
    $template = str_replace(":prefix", $this->getPrefix(), $template);
    if ($this->getRandom() != '') {
      $template = str_replace(":random", $this->getCodeForUser(), $template);
    }
    $autoNumber->save();
    return $template;
  }

  public function getCodeForUser()
  {
    $user = User::where('code', $this->getPrefix() . $this->getRandom())->first();
    if ($user) {
      $this->setRandom(Str::upper(Str::random(6)));
      return $this->getCodeForUser();
    }
    return $this->getRandom();
  }

  /**
   * Get the value of template
   *
   * @return string
   */
  public function getTemplate(): string
  {
    return $this->template;
  }

  /**
   * Set the value of template
   *
   * @param string $template
   *
   * @return self
   */
  public function setTemplate(string $template): self
  {
    $this->template = $template;

    return $this;
  }

  /**
   * Get the value of data
   *
   * @return array
   */
  public function getData(): array
  {
    return $this->data;
  }

  /**
   * Set the value of data
   *
   * @param array $data
   *
   * @return self
   */
  public function setData(array $data): self
  {
    $this->data = $data;

    return $this;
  }

  /**
   * Get the value of random
   *
   * @return string
   */
  public function getRandom(): string
  {
    return $this->random;
  }

  /**
   * Set the value of random
   *
   * @param string $random
   *
   * @return self
   */
  public function setRandom(string $random): self
  {
    $this->random = $random;

    return $this;
  }
}
