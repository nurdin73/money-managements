<?php

namespace App\Console\Commands;

use App\Services\Generator;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Pluralizer;
use Illuminate\Support\Str;

class GenerateRouteApi extends Generator implements PromptsForMissingInput
{
    public string $pathGen = 'routes/v1';
    public string $baseNamespace = "App\\Http\\Controllers";
    public string $type = '';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen:route {model} {--middleware=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate API Route';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->checkModelExists($this->argument('model'))) {
            $this->error("Model " . $this->argument('model') . ' Not exists');
            die;
        }
        $path = $this->getSourceFilePath($this->getPathRoute());
        // $this->info($path);
        if ($this->files->exists($path)) return;
        $this->makeDirectory(dirname($path));

        $contentRepo = $this->getSourceFile('backend/route');

        if (!$this->files->exists($path)) {
            $this->files->put($path, $contentRepo);
            $this->info("Route API file created");
        } else {
            $this->error("File {$path} already exists");
            die;
        }

        // generate file
        $this->generateRouteBinding();
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'model' => ['Masukkan model?', 'Master/MUser'],
        ];
    }

    function generateRouteBinding()
    {
        $path = explode('/', $this->getPathRoute());
        if (count($path) == 0) return;
        $basePath = $path[0];
        $nameFile = $basePath;
        if (count($path) > 1) {
            $nameFile = $path[1];
        }
        if (empty($basePath)) {
            $basePath = $nameFile;
        }
        $filePathIndex = base_path($this->pathGen) . '/' . $basePath . '/' . "index.php";
        if ($this->files->exists($filePathIndex)) {
            $content = $this->getStubContents($this->getStubPath('backend/baseroute'), [
                'path' => $nameFile
            ]);
            $getSource = $this->files->get($filePathIndex);
            $getSource = str_replace("//:end-bindings:", $content, $getSource);
            $this->files->put($filePathIndex, $getSource);
            return;
        }
        $content = $this->getStubContents($this->getStubPath('backend/newroute'), [
            'path' => $nameFile
        ]);
        $this->makeDirectory(dirname($filePathIndex));
        $this->files->put($filePathIndex, $content);
        return;
    }

    function getSourceFilePath($path)
    {
        return base_path($this->pathGen) . '/' . $path . "{$this->type}.php";
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

    function getStubVariables()
    {
        $name = explode('/', $this->getSingularClassName($this->argument('model')));
        return [
            'namespace' => $this->getFullNamespace($this->argument('model')),
            'modelName' => $name[count($name) - 1],
            'middleware' => $this->getMiddleware(),
        ];
    }

    function getMiddleware()
    {
        if ($middleware = $this->option('middleware')) {
            $middlewares = explode(',', $middleware);
            return collect($middlewares)->map(fn ($m) => "'{$m}'")->join(",");
        }
        return '';
    }
}
