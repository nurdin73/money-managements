<?php

namespace App\Services;

use Illuminate\Console\Command;
use Illuminate\Support\Pluralizer;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class Generator extends Command
{
  protected $files;
  public string $pathGen = 'app/Http/Controllers';
  public string $baseNamespace = "App\\Http";
  public string $type = 'Controller';

  public function __construct(Filesystem $files)
  {
    parent::__construct();
    $this->files = $files;
  }

  function checkModelExists($model): bool
  {
    $path = base_path("app/Models/" . $this->getSingularClassName($model) . '.php');
    if ($this->files->exists($path)) return true;
    return false;
  }

  function checkControllerExist($model): bool|string
  {
    $path = base_path("app/Http/Controllers/" . $this->getSingularClassName($model) . 'Controller.php');
    if ($this->files->exists($path)) return $path;
    return false;
  }

  function getNameFile()
  {
    $path = explode('/', $this->getPathRoute());
    if (count($path) == 0) return false;
    $basePath = $path[0];
    $nameFile = $basePath;
    if (count($path) > 1) {
      $nameFile = $path[1];
    }
    return $nameFile;
  }

  function getModelName()
  {
    $name = explode('/', $this->getSingularClassName($this->argument('model')));
    return $name[count($name) - 1];
  }

  function checkRouteIsExist(): bool|string
  {
    $path = explode('/', $this->getPathRoute());
    if (count($path) == 0) return false;
    $basePath = $path[0];
    $nameFile = $basePath;
    if (count($path) > 1) {
      $nameFile = $path[1];
    }
    if (empty($basePath)) {
      $basePath = $nameFile;
    }
    $baseRoute = "routes/v1";
    $filePath = base_path($baseRoute) . '/' . $basePath . '/' . "{$nameFile}.php";
    if ($this->files->exists($filePath)) return $filePath;
    return false;
  }

  public function getPathRoute()
  {
    $dir = strtolower($this->argument('model'));
    $explode = explode('/', $dir);
    $explodeForNameFile = explode('/', $this->argument('model'));
    $nameFile = $explodeForNameFile[count($explodeForNameFile) - 1];
    unset($explode[count($explode) - 1]);
    $join = implode('/', $explode) . '/' . Pluralizer::plural(Str::slug(Str::snake($nameFile)));
    return $join;
  }

  function getSourceFilePath($path)
  {
    return base_path($this->pathGen) . '/' . $this->getSingularClassName($path) . "{$this->type}.php";
  }

  function getStubPath($file)
  {
    return base_path("stubs/{$file}.stub");
  }

  function getFullNamespace($string)
  {
    $namespace = $this->getNamespace($string);
    return $this->baseNamespace . ($namespace != '' ? '\\' . $namespace : '');
  }

  function getNamespace($string)
  {
    $namespace = explode('/', $string);
    if (count($namespace) > 1) {
      array_pop($namespace);
      return $namespace = implode('\\', $namespace);
    }
    return $namespace = '';
  }

  function getSourceFile($type)
  {
    return $this->getStubContents($this->getStubPath($type), $this->getStubVariables());
  }

  function getStubContents($stub, $stubVariables = [])
  {
    $contents = file_get_contents($stub);
    foreach ($stubVariables as $variable => $replace) {
      $contents = str_replace("{{ $variable }}", $replace, $contents);
    }
    return $contents;
  }

  function getSingularClassName($name)
  {
    return ucwords(Pluralizer::singular($name));
  }

  protected function makeDirectory($path)
  {
    if (!$this->files->isDirectory($path)) {
      $this->files->makeDirectory($path, 0777, true, true);
    }

    return $path;
  }
}
