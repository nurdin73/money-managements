<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Facades\Artisan;

class GeneratorApi extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gen {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate api command';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $middleware = '';
        if ($this->confirm('Apakah api ini menggunakan middleware?')) {
            $middleware = $this->ask('Middleware apa yang ingin di tambahkan di api ini? (gunakan (,) untuk memisahkan!');
        }
        Artisan::call("make:model {$this->argument('model')} -fm");
        Artisan::call("gen:repository {$this->argument('model')}");
        Artisan::call("gen:controller {$this->argument('model')}");
        Artisan::call("gen:route {$this->argument('model')} --middleware={$middleware}");
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'model' => ['Model apa yang ingin di generate api?', 'Master/MUser'],
        ];
    }
}
