<?php

namespace App\Providers;

use App\Services\Sha1Hasher;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->customString();
        $this->app->make('hash')->extend('sha1', function () {
            return new Sha1Hasher();
        });
    }

    protected function customString()
    {
        Str::macro('getPathUrl', function ($path) {
            if (filter_var($path, FILTER_VALIDATE_URL)) return $path;
            if (config('filesystems.default') == 's3') return Storage::url($path);
            if (filter_var($path, FILTER_VALIDATE_URL)) return $path;
            if (config('filesystems.default') == 's3') return Storage::url($path);
            if (config('app.env') === 'local') return asset("storage/{$path}");
            return secure_asset("storage/{$path}");
        });
    }
}
