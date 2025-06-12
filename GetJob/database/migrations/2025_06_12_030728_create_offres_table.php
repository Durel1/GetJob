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
        Schema::create('offres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruteur_id')->constrained('recruteurs')->onDelete('cascade');
            $table->string('titre');
            $table->text('description');
            $table->string('lieu');
            $table->string('type_contrat');         // Ex: CDI, CDD, Stage, etc.
            $table->timestamp('date_expiration')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offres');
    }
};
