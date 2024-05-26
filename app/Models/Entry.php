<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Entry extends Model
{
    use HasFactory;

    protected $fillable = ['content'];
    // protected $appends = ['entry_description'];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'created_at' => 'datetime:Y-m-d H:i',
            'updated_at' => 'datetime:Y-m-d H:i',
        ];
    }

    protected function EntryDescription(): Attribute
    {
        /**
         * Return
         */
        return Attribute::make(
            get: fn () => Str::of($this->content['EntryDescription'] ?? '')->stripTags()->substr(0, 20));
    }

    public function field_schema(): BelongsTo
    {
        return $this->belongsTo(FieldSchema::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
