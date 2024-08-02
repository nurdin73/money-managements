<?php

namespace App\Services;

use Illuminate\Console\Command;
use Illuminate\Support\Pluralizer;
use Illuminate\Filesystem\Filesystem;

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
    info($this->files->exists($path));
    if ($this->files->exists($path)) return true;
    return false;
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
