<?php

namespace App\Console\Commands;

use App\Services\Generator;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class GeneratorView extends Generator implements PromptsForMissingInput
{
    protected $rootFolder = '';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen:view {api} {columns}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate View CRUD';

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
        $rootFolder = $this->choice('Pilih Root Folder', ['master-data', 'transactions', 'managements']);
        $this->rootFolder = $rootFolder;

        $this->generateColumns();
        $this->generateConstants();
        $this->generateForm();
        $this->generateModal();
        $this->generateUtil();
        $this->generate();

        $this->appendToRoute();
        $path = $this->getPathUrl();
        $this->info("generate views success");
        $this->info("View berhasil digenerate. berikut halaman lengkap untuk melihatnya: $path");
    }

    protected function getPathUrl()
    {
        $basePath = '';
        if ($this->rootFolder === 'master-data') {
            $basePath = "master/";
        }
        if ($this->rootFolder === 'transactions') {
            $basePath = 'transactions/';
        }
        if ($this->rootFolder === 'managements') {
            $basePath = 'managements/';
        }
        $path = $this->getNameFolder();

        return $basePath . $path;
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'api' => ['Base Api Url path?', '/master/samples'],
            'columns' => ['Masukkan Kolom! (gunakan (,) untuk memisahkan antar kolom dan (:) untuk memberikan tipe data', 'name,is_active:boolean,code:boolean:nullable']
        ];
    }

    protected function appendToRoute()
    {
        $path = $this->getNameFolder();
        $pageTitle = Str::plural($this->getTitle());
        $pageName = Str::ucfirst($this->getActionName());
        $combine = $this->getStubContents($this->getStubPath('frontend/route.combine'), [
            'path' => $path,
            'pageTitle' => $pageTitle,
            'pageName' => $pageName
        ]);
        $import = $this->getStubContents($this->getStubPath('frontend/route.import'), [
            'pageName' => $pageName,
            'path' => $path
        ]);
        $rootModule = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.view_path') . DIRECTORY_SEPARATOR . $this->rootFolder . DIRECTORY_SEPARATOR . 'index.tsx';
        if ($this->files->exists($rootModule)) {
            $content = $this->files->get($rootModule);
            if (!Str::contains($content, "{$pageName}Page")) {
                $content = Str::replace('//:end-import: jangan dihapus!', $import, $content);
                $content = Str::replace('{/* end-combine: jangan dihapus! */}', $combine, $content);
                $this->files->put($rootModule, $content);
            }
        }
    }

    // for form validation
    protected function generateConstants()
    {
        $defaultValues = $this->getDefaultValues();
        $fieldValidations = $this->getFieldValidations();
        $generateSourceFile = $this->getStubContents($this->getStubPath('frontend/constants'), [
            'defaultValues' => $defaultValues,
            'fieldValidations' => $fieldValidations
        ]);
        $path = $this->getPath();
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . 'constants.ts')) {
            $this->files->put($path . DIRECTORY_SEPARATOR . 'constants.ts', $generateSourceFile);
            return;
        }
    }

    protected function getFieldValidations()
    {
        $columns = $this->argument('columns');
        $columns = explode(',', $columns);
        $columns = collect($columns)->filter(function ($col) {
            return !in_array($col, ['no', 'created_date']);
        })->map(function ($col) {
            $column = explode(':', $col);
            $id = $column[0];
            $typeData = $column[1] ?? "mixed";
            $validation = $column[2] ?? 'required';
            return "{$id}: Yup.{$typeData}().{$validation}(),";
        })->join("\n    ");
        return $columns;
    }

    protected function getDefaultValues()
    {
        $columns = $this->argument('columns');
        $columns = explode(',', $columns);
        $columns = collect($columns)->filter(function ($col) {
            return !in_array($col, ['no', 'created_date']);
        })->map(function ($col) {
            $column = explode(':', $col);
            $id = $column[0];
            $typeData = "null";
            if ($id == 'is_active') $typeData = 'true';
            return "{$id}: {$typeData},";
        })->join("\n    ");
        return $columns;
    }

    // for generate field input
    protected function generateForm()
    {
        $actionName = Str::ucfirst($this->getActionName());
        $fields = $this->getFields();
        $generateSourceFile = $this->getStubContents($this->getStubPath('frontend/form'), [
            'actionName' => $actionName,
            'fields' => $fields
        ]);
        $path = $this->getPath();
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . 'form.tsx')) {
            $this->files->put($path . DIRECTORY_SEPARATOR . 'form.tsx', $generateSourceFile);
        }
    }

    protected function getFields()
    {
        $columns = $this->argument('columns');
        $columns = explode(',', $columns);
        $columns = collect($columns)->filter(function ($col) {
            return !in_array($col, ['no', 'created_date']);
        })->map(function ($col) {
            $column = explode(':', $col);
            $id = $column[0];

            $typeData = $column[1] ?? "text";
            $defaultValueAttr = "defaultValue";
            $validation = $column[2] ?? 'required';
            if ($validation == 'nullable') $validation = null;
            if ($id == 'is_active') $typeData = 'switch';
            if ($typeData == 'string') $typeData = 'text';
            if ($id == 'password') $typeData = 'password';
            if ($typeData == 'switch') $defaultValueAttr = 'checked';
            $generateField = $this->getStubContents($this->getStubPath('frontend/field'), [
                'label' => Str::ucfirst(Str::title(Str::replace('_', ' ', $id))),
                'type' => $typeData,
                'validation' => $validation !== null ? "\n                {$validation}" : $validation,
                'fieldName' => $id,
                'defaultValueAttr' => $defaultValueAttr
            ]);
            return $generateField;
        })->join("\n            ");
        return $columns;
    }

    // for generate modal
    protected function generateModal()
    {
        $generateSourceFile = $this->getStubContents($this->getStubPath('frontend/modal'), [
            'actionName' => Str::ucfirst($this->getActionName()),
            'directoryRedux' => config('gen.redux_path') . '/' . $this->getApiPath(),
            'moduleTitle' => $this->getTitle(),
            'formComponent' => Str::ucfirst($this->getActionName())
        ]);

        $path = $this->getPath();
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . 'modal.tsx')) {
            $this->files->put($path . DIRECTORY_SEPARATOR . 'modal.tsx', $generateSourceFile);
            return;
        }
    }

    protected function getTitle()
    {
        return Str::replace('_', ' ', Str::title(Str::snake(Str::ucfirst($this->getActionName()))));
    }

    // for generate hooks
    protected function generateUtil()
    {
        $actionName = Str::ucfirst($this->getActionName());
        $generateSourceFile = $this->getStubContents($this->getStubPath('frontend/utils'), [
            'actionName' => $actionName
        ]);
        $path = $this->getPath();
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . 'utils.tsx')) {
            $this->files->put($path . DIRECTORY_SEPARATOR . 'utils.tsx', $generateSourceFile);
            return;
        }
    }

    // for generate base file
    protected function generate()
    {
        $actionName = Str::ucfirst($this->getActionName());
        $reducerName = Str::plural($this->getActionName());
        $moduleTitle = $this->getTitle();
        $generateSourceFile = $this->getStubContents($this->getStubPath('frontend/index'), [
            'actionName' => $actionName,
            'reducerName' => Str::lcfirst($reducerName),
            'moduleTitle' => $moduleTitle,
            'directoryAction' => config('gen.redux_path') . '/' . $this->getApiPath()
        ]);
        $path = $this->getPath();
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . 'index.tsx')) {
            $this->files->put($path . DIRECTORY_SEPARATOR . 'index.tsx', $generateSourceFile);
            return;
        }
    }

    protected function generateColumns()
    {
        $columns = $this->getColumns();
        $columnData = $this->getColumnType();

        $generateSourceFile = $this->getStubContents($this->getStubPath('frontend/columns'), [
            'columnData' => $columnData,
            'columns' => $columns,
            'columnTypeName' => Str::ucfirst($this->getActionName())
        ]);
        $path = $this->getPath();
        if (!$this->files->exists($path . DIRECTORY_SEPARATOR . 'columns.tsx')) {
            $this->files->put($path . DIRECTORY_SEPARATOR . 'columns.tsx', $generateSourceFile);
        }
        return;
    }

    protected function getPath()
    {
        $path = config('gen.path_frontend') . DIRECTORY_SEPARATOR . config('gen.view_path') . DIRECTORY_SEPARATOR . $this->rootFolder . DIRECTORY_SEPARATOR . 'modules' . DIRECTORY_SEPARATOR . $this->getNameFolder();
        $this->makeDirectory($path);
        return $path;
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

    protected function getNameFolder()
    {
        $str = $this->argument('api');
        if (Str::startsWith($str, '/')) {
            $str = Str::substrReplace($str, '', 0, 1);
        }
        $str = Str::replace('/', '-', $str);
        $str = Str::trim($str);
        return $str;
    }

    protected function getColumnType()
    {
        $columns = $this->argument('columns');
        $columns = explode(',', $columns);
        $columns = collect($columns)->map(function ($col) {
            $column = explode(':', $col);
            $id = $column[0];
            $typeData = $column[1] ?? "any";
            return "{$id}: {$typeData}";
        })->join("\n    ");
        return $columns;
    }

    protected function getColumns()
    {
        $columns = $this->argument('columns');
        $columns = explode(',', $columns);
        $columns = collect($columns)->map(function ($col) {
            $column = explode(':', $col);
            $label = Str::title(Str::replace('_', ' ', $column[0]));
            $id = $column[0];
            if ($column[0] == 'created_date') {
                return "{
        label: '{$label}',
        id: '{$id}',
        render: (data) => dayjs(data.created_date).format('DD/MM/YYYY'),
        filters: {
            type: 'date',
        },
    },";
            }
            if ($column[0] == 'no') {
                return "{
        label: '{$label}',
        id: '{$id}',
    },";
            }
            if ($column[0] == 'is_active') {
                return "{
        label: '{$label}',
        id: '{$id}',
        center: true,
        render: (data) => (
            <Badge className='text-white' color={data.is_active ? 'success' : 'danger'}>
                {data.is_active ? 'Aktif' : 'Non Aktif'}
            </Badge>
        ),
        filters: {
            type: 'select',
            options: [
                {
                    label: 'Aktif',
                    value: true,
                },
                {
                    label: 'Non Active',
                    value: false,
                },
                {
                    label: 'All',
                    value: undefined,
                },
            ],
        },
    },";
            }
            return "{
        label: '{$label}',
        id: '{$id}',
        filters: {
            type: 'input',
        },
    },";
        })->join("\n    ");
        return $columns;
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
}
