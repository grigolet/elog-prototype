<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FieldSchema extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'layout'];

    protected $hidden = ['content', 'layout'];

    protected $appends = ['complete_content', 'complete_layout'];

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

    protected function CompleteContent(): Attribute
    {
        return Attribute::make(
            get: fn () => array_merge(
                $this->content,
                [
                    'properties' => array_merge(
                        ['title' => [
                            'type' => 'string',
                            'title' => 'Title',
                        ]],
                        $this->content['properties'],
                        [
                            'description' => [
                                'type' => 'string',
                            ],
                        ]
                    ),
                ]
            )
        );
    }

    protected function CompleteLayout(): Attribute
    {
        return Attribute::make(
            // populate need uischema for description visualization with text editor
            get: function () {
                return array_merge($this->layout, [
                    'title' => [
                        'ui:title' => '',
                    ],
                    'description' => [
                        'ui:title' => '',
                        'ui:description' => '',
                        'ui:widget' => 'CKEditor',
                    ],
                ]);
            }

        );
    }

    public function entry(): HasMany
    {
        return $this->hasMany(Entry::class);
    }

    public function logbook(): HasMany
    {
        return $this->hasMany(Logbook::class);
    }
}
