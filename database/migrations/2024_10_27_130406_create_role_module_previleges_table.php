<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('role_module_previleges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_module_id')->constrained('role_modules')->cascadeOnDelete();
            $table->foreignId('module_previlege_id')->constrained('module_previleges')->cascadeOnDelete();
            $table->string('created_by')->nullable();
            $table->string('modified_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_module_previleges');
    }
};
