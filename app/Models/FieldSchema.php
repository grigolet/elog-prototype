<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FieldSchema extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'layout'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'content' => 'array',
            'layout' => 'array',
        ];
    }

    public function entry(): HasMany
    {
        return $this->hasMany(Entry::class);
    }
}
