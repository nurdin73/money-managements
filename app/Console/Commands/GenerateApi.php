<?php

namespace App\Console\Commands;

use App\Services\Generator;
use Illuminate\Contracts\Console\PromptsForMissingInput;

class GenerateApi extends Generator implements PromptsForMissingInput
{
    public string $pathGen = 'app/Http/Controllers';
    public string $baseNamespace = "App\\Http";
    public string $type = 'Controller';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen:controller {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Api Controller';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->checkModelExists($this->argument('model'))) {
            $this->error("Model " . $this->argument('model') . ' Not exists');
            die;
        }
        $pathController = $this->getSourceFilePath($this->argument('model'));
        // $this->info($pathController);
        $this->makeDirectory(dirname($pathController));

        $contentRepo = $this->getSourceFile('backend/controller.custom');

        if (!$this->files->exists($pathController)) {
            $this->files->put($pathController, $contentRepo);
            $this->info("Controller file created");
        } else {
            $this->error("File {$pathController} already exists");
            die;
        }
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'model' => ['Masukkan model?', 'Master/MUser'],
        ];
    }

    function getStubVariables()
    {
        $name = explode('/', $this->getSingularClassName($this->argument('model')));
        $namespace = $this->getNamespace($this->argument('model'));
        return [
            'namespace' => "App\\Http\\Controllers" . ($namespace != '' ? '\\' . $namespace : ''),
            'model' => str_replace('/', '\\', $this->getSingularClassName($this->argument('model'))),
            'modelName' => $name[count($name) - 1],
        ];
    }
}
