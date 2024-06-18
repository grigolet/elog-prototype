<?php

use App\Models\FieldSchema;
use App\Models\Logbook;
use App\Models\User;
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
        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title', 512);
            $table->json('fields')->nullable();
            $table->text('description')->fullText()->nullable();
            $table->foreignIdFor(User::class)
                ->constrained()
                ->cascadeOnUpdate();
            $table->foreignIdFor(FieldSchema::class)
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignIdFor(Logbook::class)
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entries');
    }
};
