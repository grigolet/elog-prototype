<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LogbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get logbooks + 3 entries
        $response = [];
        if (Auth::check()) {
            $response = [
                'logbooks' => Logbook::all()->map(function (Logbook $logbook) {
                    return [
                        'id' => $logbook->id,
                        'name' => $logbook->name,
                        'entries' => $logbook->entries()->get()->map(fn ($entry) => [
                            'id' => $entry->id,
                            'title' => $entry->title,
                            'username' => $entry->user->username,
                            'updated_at' => $entry->updated_at->toDayDateTimeString(),
                            'can_view_entry' => Auth::user()->can('view entries') || $entry->user->is(Auth::user()),
                            'can_edit_entry' => Auth::user()->can('edit entries') || $entry->user->is(Auth::user()),
                            'can_delete_entry' => Auth::user()->can('delete entries') || $entry->user->is(Auth::user()),
                        ]),
                    ];
                }),
                'can' => [
                    'create_logbooks' => Auth::user()->can('create logbooks'),
                    'edit_logbooks' => Auth::user()->can('edit logbooks'),
                    'delete_logbooks' => Auth::user()->can('delete logbooks'),
                    'create_entries' => Auth::user()->can('create entries'),
                ],
            ];

        } else {
            $response['logbooks'] = Logbook::all()->map(fn ($logbook) => ['id' => $logbook->id, 'name' => $logbook->name]);
        }

        return Inertia::render('Logbook/Index', $response);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Logbook/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        dd($request->validate([
            'name' => 'required',
            'schema' => 'required|json',
            'uiSchema' => 'required|json',
        ]));

    }

    /**
     * Display the specified resource.
     */
    public function show(Logbook $logbook)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Logbook $logbook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Logbook $logbook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logbook $logbook)
    {
        //
    }
}
