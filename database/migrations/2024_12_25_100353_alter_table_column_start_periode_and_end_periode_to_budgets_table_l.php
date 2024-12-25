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
        Schema::table('budgets', function (Blueprint $table) {
            $table->dropColumn('periode');
            $table->date('start_periode')->nullable()->after('category_id');
            $table->date('end_periode')->nullable()->after('start_periode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('budgets', function (Blueprint $table) {
            $table->string('periode')->after('category_id');
            $table->dropColumn('start_periode');
            $table->dropColumn('end_periode');
        });
    }
};
