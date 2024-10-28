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

  // Define separator based on OS
  public string $separator;

  public function __construct(Filesystem $files)
  {
    parent::__construct();
    $this->files = $files;
    $this->separator = PHP_OS_FAMILY === 'Windows' ? '\\' : '/';
  }

  function checkModelExists($model): bool
  {
    $path = base_path("app" . $this->separator . "Models" . $this->separator . $this->getSingularClassName($model) . '.php');
    return $this->files->exists($path);
  }

  function checkControllerExist($model): bool|string
  {
    $path = base_path("app" . $this->separator . "Http" . $this->separator . "Controllers" . $this->separator . $this->getSingularClassName($model) . 'Controller.php');
    return $this->files->exists($path) ? $path : false;
  }

  function getNameFile()
  {
    $path = explode($this->separator, $this->getPathRoute());
    if (count($path) === 0) return false;
    $nameFile = $path[0];
    if (count($path) > 1) {
      $nameFile = $path[1];
    }
    return $nameFile;
  }

  function getModelName()
  {
    $name = explode($this->separator, $this->getSingularClassName($this->argument('model')));
    return end($name);
  }

  function checkRouteIsExist(): bool|string
  {
    $path = explode($this->separator, $this->getPathRoute());
    if (count($path) === 0) return false;
    $basePath = $path[0];
    $nameFile = $basePath;
    if (count($path) > 1) {
      $nameFile = $path[1];
    }
    if (empty($basePath)) {
      $basePath = $nameFile;
    }
    $baseRoute = "routes" . $this->separator . "v1";
    $filePath = base_path($baseRoute . $this->separator . $basePath . $this->separator . "{$nameFile}.php");
    return $this->files->exists($filePath) ? $filePath : false;
  }

  public function getPathRoute()
  {
    $dir = strtolower($this->argument('model'));
    $explode = explode('/', $dir);  // Logical separation for model names, unaffected by OS
    $nameFile = array_pop($explode);
    $join = implode($this->separator, $explode) . $this->separator . Pluralizer::plural(Str::slug(Str::snake($nameFile)));
    return $join;
  }

  function getSourceFilePath($path)
  {
    return base_path($this->pathGen) . $this->separator . $this->getSingularClassName($path) . "{$this->type}.php";
  }

  function getStubPath($file)
  {
    return base_path("stubs" . $this->separator . "{$file}.stub");
  }

  function getFullNamespace($string)
  {
    $namespace = $this->getNamespace($string);
    return $this->baseNamespace . ($namespace !== '' ? '\\' . $namespace : '');
  }

  function getNamespace($string)
  {
    $namespace = explode('/', $string);
    if (count($namespace) > 1) {
      array_pop($namespace);
      return implode('\\', $namespace);
    }
    return '';
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
