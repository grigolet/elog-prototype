<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Logbook extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function field_schema(): BelongsTo
    {
        return $this->belongsTo(FieldSchema::class);
    }

    public function entries(): HasMany
    {
        return $this->hasMany(Entry::class);
    }
}
