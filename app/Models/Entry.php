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

    protected $fillable = ['title', 'description', 'fields', 'content'];

    protected $appends = [' complete_content'];

    protected $hidden = ['content'];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'fields' => 'array',
            'created_at' => 'datetime:Y-m-d H:i',
            'updated_at' => 'datetime:Y-m-d H:i',
        ];
    }

    // protected function EntryDescription(): Attribute
    // {
    //     /**
    //      * Return
    //      */
    //     return Attribute::make(
    //         get: fn () => Str::of($this->content['EntryDescription'] ?? '')->stripTags()->substr(0, 20));
    // }

    protected function CompleteContent(): Attribute
    {
        return Attribute::make(
            get: fn () => array_merge(
                $this->fields,
                [
                    'title' => $this->title,
                    'description' => $this->description,
                ]
            )
        );
    }

    public function field_schema(): BelongsTo
    {
        return $this->belongsTo(FieldSchema::class);
    }

    public function logbook(): BelongsTo
    {
        return $this->belongsTo(Logbook::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
