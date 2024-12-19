<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(\App\Repositories\Master\UserRepository::class, \App\Repositories\Master\UserRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\Master\ModuleRepository::class, \App\Repositories\Master\ModuleRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\Master\RoleRepository::class, \App\Repositories\Master\RoleRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\Master\ModulePrevilegeRepository::class, \App\Repositories\Master\ModulePrevilegeRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\Transaction\IncomeExpenseRepository::class, \App\Repositories\Transaction\IncomeExpenseRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\Transaction\BudgetRepository::class, \App\Repositories\Transaction\BudgetRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\Master\CategoryRepository::class, \App\Repositories\Master\CategoryRepositoryEloquent::class);
        //:end-bindings:
    }
}
