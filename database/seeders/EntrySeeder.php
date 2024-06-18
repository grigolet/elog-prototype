<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\FieldSchema;
use App\Models\Logbook;
use Illuminate\Database\Seeder;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $field_schema = FieldSchema::factory()->create();
        $logbooks = Logbook::factory(5)->recycle($field_schema)->create();
        Entry::factory(10)
            ->recycle([$field_schema, $logbooks])
            ->create();
    }
}
