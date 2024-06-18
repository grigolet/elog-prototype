<?php

namespace Database\Factories;

use App\Models\FieldSchema;
use App\Models\Logbook;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Entry>
 */
class EntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $fields = [
            'System' => [
                'SubSystem' => fake()->randomElement(['RPC', 'DT', 'CSC', 'LHCb']),
                'Experiment' => fake()->randomElement(['ALICE', 'ATLAS', 'CMS', 'LHCb']),
            ],
            'Status' => fake()->randomElement(['Done', 'To do', 'In Progress']),
        ];

        return [
            'title' => fake()->words(3, true),
            'fields' => $fields,
            'description' => fake()->paragraph(),
            'user_id' => User::factory(),
            'field_schema_id' => FieldSchema::factory(),
            'logbook_id' => Logbook::factory(),
        ];
    }
}
