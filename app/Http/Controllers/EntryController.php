<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\FieldSchema;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entries = Entry::all();

        return Inertia::render('Entry/Index', [
            'entries' => $entries,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // Always return the last schema
        $last_schema = FieldSchema::orderByDesc('created_at')->firstOrFail();

        return Inertia::render('Entry/Create', [
            'content' => $last_schema->content,
            'layout' => $last_schema->layout,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Create the entry model
        $last_schema = FieldSchema::orderByDesc('created_at')->firstOrFail();
        $entry = new Entry(['content' => $request->get('content')]);
        $entry->field_schema()->associate($last_schema);

        // Here we should retrieve the user
        $user = User::find(1);
        $entry->user()->associate($user);

        // Handle validation of last schema with entry

        // Save entry
        $entry->save();

        // Redirect to entry creation
        return Inertia::render('Entry/Create', [
            'content' => $last_schema->content,
            'layout' => $last_schema->layout,
            'created_entry' => $entry,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $entry = Entry::findOrFail($id);
        $schema = $entry->field_schema;

        // Here we should retrieve the user
        $user = User::find(1);
        $entry->user()->associate($user);

        return Inertia::render('Entry/Show', [
            'entry' => $entry,
            'schema' => $schema,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $entry = Entry::findOrFail($id);
        $schema = $entry->field_schema;

        // Here we should retrieve the user
        $user = User::find(1);
        $entry->user()->associate($user);

        return Inertia::render('Entry/Edit', [
            'entry' => $entry,
            'schema' => $schema,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entry $entry)
    {
        // Create the entry model
        $entry->content = $request->content;

        // One should validate the content with the schema

        // Here we should retrieve the user
        $user = User::find(1);
        $entry->user()->associate($user);

        // Save data to db
        $entry->save();

        return Inertia::render('Entry/Show', [
            'entry' => $entry,
            'schema' => $entry->field_schema,
            'message' => 'Entry updated.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
