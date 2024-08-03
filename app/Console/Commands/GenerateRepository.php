<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Pluralizer;

class GenerateRepository extends Command
{
    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();
        $this->files = $files;
    }
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen:repository {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create repository laravel only';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->checkModelExists()) {
            $this->error("Model " . $this->argument('model') . ' Not exists');
            die;
        }
        $pathRepo = $this->getSourceFilePath();
        $pathElo = $this->getSourceFilePath('RepositoryEloquent');
        // $this->info($pathRepo);
        $this->makeDirectory(dirname($pathRepo));
        $this->makeDirectory(dirname($pathElo));

        $contentRepo = $this->getSourceFile();
        $contentEloquent = $this->getSourceFile('eloquent-repository');

        if (!$this->files->exists($pathRepo)) {
            $this->files->put($pathRepo, $contentRepo);
            $this->info("Repository file created");
        } else {
            $this->error("File {$pathRepo} already exists");
            die;
        }

        if (!$this->files->exists($pathElo)) {
            $this->files->put($pathElo, $contentEloquent);
            $this->info("Repository Eloquent file created");
        } else {
            $this->error("File {$pathElo} already exists");
            die;
        }

        Artisan::call("make:bindings {$this->argument('model')}");
        Artisan::call("make:resource {$this->argument('model')}Resource");
        Artisan::call("make:request {$this->argument('model')}Request");
    }

    function checkModelExists(): bool
    {
        $path = base_path("app/Models/" . $this->getSingularClassName($this->argument('model')) . '.php');
        if ($this->files->exists($path)) return true;
        return false;
    }

    function getSourceFilePath($type = 'Repository')
    {
        return base_path('app/Repositories') . '/' . $this->getSingularClassName($this->argument('model')) . "{$type}.php";
    }

    function getStubPath($file = 'repository')
    {
        return base_path("stubs/{$file}.stub");
    }

    function getStubVariables($type = 'repo')
    {
        $name = explode('/', $this->getSingularClassName($this->argument('model')));
        $namespace = $this->getNamespace($this->argument('model'));
        return [
            'namespace' => "App\\Repositories" . ($namespace != '' ? '\\' . $namespace : ''),
            'model' => str_replace('/', '\\', $this->getSingularClassName($this->argument('model'))),
            'modelName' => $name[count($name) - 1],
        ];
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

    function getSourceFile($type = 'repository')
    {
        return $this->getStubContents($this->getStubPath("backend/$type"), $this->getStubVariables());
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
