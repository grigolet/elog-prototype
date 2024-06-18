<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\FieldSchema;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Opis\JsonSchema\Errors\ErrorFormatter;
use Opis\JsonSchema\Validator;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // TODO: use pagination
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
            'content' => $last_schema->complete_content,
            'layout' => $last_schema->complete_layout,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Create the entry model
        $last_schema = FieldSchema::orderByDesc('created_at')->firstOrFail();
        $request->validate([
            'title' => ['required'],
            'fields' => ['json'],
        ]);

        $content = $request->get('content');
        $entry = new Entry([
            'title' => Arr::get($content, 'title'),
            'fields' => Arr::except($content, ['description', 'title']),
            'description' => Arr::get($content, 'description'),
        ]);

        $entry->field_schema()->associate($last_schema);
        // Here we should retrieve the user
        $entry->user()->associate(Auth::user());

        // Handle validation of last schema with entry
        $validator = new Validator();
        $result = $validator->validate($content, json_encode($last_schema->content));
        if (! $result->isValid()) {
            $error = $result->error();
            $formatter = new ErrorFormatter();

            return Inertia::render('Entry/Create', [
                'entry' => $entry,
                'schema' => $last_schema,
                'errors' => $formatter->format($error),
            ]);
        }

        // Save entry
        $entry->save();

        // Redirect to entry creation
        return Inertia::render('Entry/Show', [
            'entry' => $entry,
            'schema' => $last_schema,
            'message' => 'Entry '.$entry->id.' created',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $entry = Entry::findOrFail($id);
        $schema = $entry->field_schema;

        return Inertia::render('Entry/Show', [
            'entry_id' => $entry->id,
            'entry_content' => $entry->complete_content,
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

        return Inertia::render('Entry/Edit', [
            'entry_id' => $entry->id,
            'entry_content' => $entry->complete_content,
            'schema' => $schema,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entry $entry)
    {
        // Create the entry model
        $content = $request->get('content');
        $entry->update([
            'title' => Arr::only($content, 'title'),
            'fields' => Arr::except($content, ['description', 'title']),
            'description' => Arr::only($content, 'description'),
        ]);

        // One should validate the content with the schema

        // Here we should retrieve the user
        $entry->user()->associate(Auth::user());

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
    public function destroy(Entry $entry)
    {
        $entry->delete();

        return redirect()->back();
    }
}
