<?php

namespace App\Console\Commands;

use App\Services\Generator;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class GeneratorRedux extends Generator implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen:redux {api}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate redux file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $routes = collect(Route::getRoutes())->filter(function ($item) {
            return Str::contains($item->uri(), Str::trim($this->argument('api')));
        })->first();
        if (!$routes) {
            $this->error("API url salah atau belum terdaftar!");
            return;
        }
        $path = $this->getPathDirectory();
        $this->makeDirectory($path);

        // generate
        $this->generateAction();
        $this->generateReducer();
        $this->generateService();
        $this->generateSaga();

        // append to reducers,sagas
        $this->appendToReducers();
        $this->appendToSagas();
        $this->appendToActions();
    }

    protected function appendToActions()
    {
        $basePath = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.redux_path');
        $path = $basePath . DIRECTORY_SEPARATOR . 'actions.tsx';
        if ($this->files->exists($path)) {
            $content = $this->files->get($path);
            $findPathOfActions = $this->getApiPath();
            $generate = $this->getStubContents($this->getStubPath('frontend/redux/action.import'), [
                'path' => $findPathOfActions
            ]);
            if (!Str::contains($content, $findPathOfActions)) {
                $content = Str::replace("//:end-import: jangan dihapus!", $generate, $content);
                $this->files->put($path, $content);
            }
        }
    }

    protected function appendToSagas()
    {
        $basePath = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.redux_path');
        $path = $basePath . DIRECTORY_SEPARATOR . 'sagas.tsx';
        if ($this->files->exists($path)) {
            $content = $this->files->get($path);
            $getActionName = Str::camel($this->getActionName());
            // import
            $getContentFile = $this->getStubContents($this->getStubPath('frontend/redux/sagas.import'), [
                'actionName' => $getActionName,
                'api' => $this->getApiPath()
            ]);
            if (Str::contains($content, "{$getActionName}sSaga")) {
                return;
            }
            $content = Str::replace('//:end-import: jangan dihapus!', $getContentFile, $content);
            // combine
            $getContentCombine = $this->getStubContents($this->getStubPath('frontend/redux/sagas.combine'), [
                'actionName' => $getActionName,
            ]);
            $content = Str::replace('//:end-combine: jangan dihapus!', $getContentCombine, $content);
            $this->files->put($path, $content);
            return;
        }
        $this->info("Sagas file tidak tersedia");
    }

    protected function appendToReducers()
    {
        $basePath = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.redux_path');
        $path = $basePath . DIRECTORY_SEPARATOR . 'reducers.tsx';
        if ($this->files->exists($path)) {
            $content = $this->files->get($path);
            $getActionName = Str::camel($this->getActionName());
            // import
            $getContentFile = $this->getStubContents($this->getStubPath('frontend/redux/reducers.import'), [
                'actionName' => $getActionName,
                'api' => $this->getApiPath()
            ]);
            if (Str::contains($content, "{$getActionName}sApp")) {
                return;
            }
            $content = Str::replace('//:end-import: jangan dihapus!', $getContentFile, $content);
            // combine
            $getContentCombine = $this->getStubContents($this->getStubPath('frontend/redux/reducers.combine'), [
                'actionName' => $getActionName,
            ]);
            $content = Str::replace('//:end-combine: jangan dihapus!', $getContentCombine, $content);
            $this->files->put($path, $content);
            return;
        }
        $this->info("Reducers file tidak tersedia");
    }

    protected function getPathDirectory()
    {
        $basePath = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.redux_path');

        return $basePath . $this->getApi();
    }

    protected function generateService()
    {
        $actionName = Str::ucfirst($this->getActionName());
        $api = $this->getApi();
        $generate = $this->getStubContents($this->getStubPath('frontend/redux/services'), [
            'api' => $api,
            'actionName' => $actionName
        ]);
        $path = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.service_api_path');
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . "{$actionName}Service.ts")) {
            $this->files->put($path . DIRECTORY_SEPARATOR . "{$actionName}Service.ts", $generate);
            return;
        }
        $this->info("Service file sudah tersedia");
    }

    protected function generateAction()
    {
        $getContentFile = $this->getActionSourceFile();
        $path = $this->getPathDirectory() . DIRECTORY_SEPARATOR . 'action.tsx';
        if (!$this->files->exists($path)) {
            $this->files->put($path, $getContentFile);
            return;
        }
        $this->info("Action File sudah tersedia");
    }

    protected function generateReducer()
    {
        $getContentFile = $this->getStubContents($this->getStubPath('frontend/redux/reducer'), [
            'logName' => $this->getLogName()
        ]);
        $path = $this->getPathDirectory() . DIRECTORY_SEPARATOR . 'reducer.tsx';
        if (!$this->files->exists($path)) {
            $this->files->put($path, $getContentFile);
            return;
        }
        $this->info("Reducer File sudah tersedia");
    }

    protected function generateSaga()
    {
        $getContentFile = $this->getStubContents($this->getStubPath('frontend/redux/saga'), [
            'actionName' => $this->getActionName(),
            'logName' => $this->getLogName(),
            'api' => $this->getApi()
        ]);
        $path = $this->getPathDirectory() . DIRECTORY_SEPARATOR . 'saga.tsx';
        if (!$this->files->exists($path)) {
            $this->files->put($path, $getContentFile);
            return;
        }
        $this->info("Saga File sudah tersedia");
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'api' => ['Base Api Url path?', '/master/samples'],
        ];
    }

    public function getActionSourceFile()
    {
        return $this->getStubContents($this->getStubPath('frontend/redux/action'), $this->getActionVariables());
    }

    public function getActionVariables(): array
    {
        return [
            'actionName' => $this->getActionName(),
            'logName' => $this->getLogName()
        ];
    }

    public function getLogName()
    {
        $str = $this->argument('api');
        if (Str::startsWith($str, '/')) {
            $str = Str::substrReplace($str, '', 0, 1);
        }
        $str = Str::replace('/', '_', $str);
        $str = Str::camel($str);
        $str = Str::snake($str);
        $str = Str::upper($str);
        $str = Str::trim($str);
        return $str;
    }

    protected function getApi()
    {
        $str = $this->argument('api');
        if (!Str::startsWith($str, '/')) {
            $str = "/$str";
        }
        $str = Str::trim($str);
        return $str;
    }

    protected function getApiPath()
    {
        $str = $this->argument('api');
        if (Str::startsWith($str, '/')) {
            $str = Str::substrReplace($str, '', 0, 1);
        }
        $str = Str::trim($str);
        return $str;
    }

    public function getActionName()
    {
        $str = $this->argument('api');
        if (Str::startsWith($str, '/')) {
            $str = Str::substrReplace($str, '', 0, 1);
        }
        $str = Str::replace('/', '_', $str);
        $str = Str::camel($str);
        $str = Str::singular($str);
        $str = Str::ucfirst($str);
        $str = Str::trim($str);
        return $str;
    }
}
