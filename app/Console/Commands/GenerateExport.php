<?php

namespace App\Console\Commands;

use App\Services\Generator;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Pluralizer;
use Illuminate\Support\Str;

class GenerateExport extends Generator implements PromptsForMissingInput
{
    public string $pathGen = 'app/Exports';
    public string $baseNamespace = "App\\Exports";
    public string $type = 'Export';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen:export {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'command for generate export api';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->checkModelExists($this->argument('model'))) {
            $this->error("Model " . $this->argument('model') . ' Not exists');
            die;
        }
        if (!$pathController = $this->checkControllerExist($this->argument('model'))) {
            $this->error("Controller " . $this->argument('model') . 'Controller Not exists');
            die;
        }
        if (!$pathRoute = $this->checkRouteIsExist()) {
            $this->error("Route " . $this->argument('model') . ' Not exists');
            die;
        }
        $this->generateFileExport();
        $this->generateMethodExport($pathController);
        $this->generateRouteExport($pathRoute);
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'model' => ['Masukkan model?', 'Master/MUser'],
        ];
    }

    public function generateFileExport()
    {
        $namespace = $this->getNamespace($this->argument('model'));
        $content = $this->getStubContents($this->getStubPath('backend/export-custom'), [
            'modelName' => $this->getModelName(),
            'namespace' => $this->baseNamespace . ($namespace != '' ? '\\' . $namespace : ''),
        ]);
        $path = $this->getSourceFilePath($this->argument('model'));
        $this->makeDirectory(dirname($path));

        if ($this->files->exists($path)) return;
        $this->files->put($path, $content);
    }

    public function generateMethodExport($path)
    {
        $getSource = $this->files->get($path);
        $modelName = $this->getModelName();
        $getContentExport = $this->getStubContents($this->getStubPath('backend/export-function'), [
            'modelName' => $modelName,
            'path' => $this->getNameFile()
        ]);
        if (!Str::contains($getSource, "// export resources") || !Str::contains($getSource, "// export file content")) return;
        $getSource = str_replace("// export resources", $getContentExport, $getSource);
        $exportNamespace = "use App\Exports\\" . str_replace('/', '\\', $this->getSingularClassName($this->argument('model'))) . "Export;";
        $getSource = str_replace("// export file content", $exportNamespace, $getSource);
        $this->files->put($path, $getSource);
    }

    public function generateRouteExport($path)
    {
        $getSource = $this->files->get($path);
        if (!Str::contains($getSource, '// with export')) {
            return;
        }
        $modelName = $this->getModelName();
        $getSource = str_replace("// with export", "Route::get('/exports', [{$modelName}Controller::class, 'exports'])->name('exports');", $getSource);
        $this->files->put($path, $getSource);
    }
}
