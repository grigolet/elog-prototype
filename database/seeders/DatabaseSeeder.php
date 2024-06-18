<?php

namespace Database\Seeders;

use App\Models\FieldSchema;
use App\Models\Logbook;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'create logbooks']);
        Permission::create(['name' => 'edit logbooks']);
        Permission::create(['name' => 'delete logbooks']);
        Permission::create(['name' => 'create entries']);
        Permission::create(['name' => 'edit entries']);
        Permission::create(['name' => 'delete entries']);
        Permission::create(['name' => 'view entries']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'admin']);
        $role1->givePermissionTo('create logbooks');
        $role1->givePermissionTo('edit logbooks');
        $role1->givePermissionTo('delete logbooks');
        $role1->givePermissionTo('view entries');
        $role1->givePermissionTo('create entries');
        $role1->givePermissionTo('edit entries');
        $role1->givePermissionTo('delete entries');

        // create roles and assign existing permissions
        $role2 = Role::create(['name' => 'editor']);
        $role2->givePermissionTo('view entries');
        $role2->givePermissionTo('create entries');
        $role2->givePermissionTo('edit entries');
        $role2->givePermissionTo('delete entries');

        // create roles and assign existing permissions
        $role3 = Role::create(['name' => 'viewer']);
        $role3->givePermissionTo('view entries');

        $role4 = Role::create(['name' => 'super-admin']);

        $user = User::factory()->create([
            'name' => 'Super Admin User',
            'username' => 'superadmin',
            'password' => 'superadmin',
            'email' => 'superadmin@example.com',
        ]);
        $user->assignRole('super-admin');

        $user = User::factory()->create([
            'name' => 'Admin User',
            'username' => 'admin',
            'password' => 'admin',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole('admin');

        $user = User::factory()->create([
            'name' => 'Editor User',
            'username' => 'editor',
            'password' => 'editor',
            'email' => 'editor@example.com',
        ]);
        $user->assignRole('editor');

        $user = User::factory()->create([
            'name' => 'Viewer User',
            'username' => 'viewer',
            'password' => 'viewer',
            'email' => 'viewer@example.com',
        ]);
        $user->assignRole('viewer');

        $field_schema = FieldSchema::factory()->create();
        Logbook::factory()->create([
            'field_schema_id' => $field_schema->id,
        ]);
    }
}
