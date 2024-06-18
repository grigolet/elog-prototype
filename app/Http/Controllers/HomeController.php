<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
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
                    'edit_logbooks' => Auth::user()->can('edit logbooks'),
                    'delete_logbooks' => Auth::user()->can('delete logbooks'),
                    'create_entries' => Auth::user()->can('create entries'),
                ],
            ];

        } else {
            $response['logbooks'] = Logbook::all()->map(fn ($logbook) => ['id' => $logbook->id, 'name' => $logbook->name]);
        }

        return Inertia::render('Home', $response);
    }
}
