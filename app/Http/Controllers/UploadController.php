<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->file('upload');
        if ($file->isValid()) {
            $path = $file->store('entries-assets', 'public');

            return response()->json([
                'url' => Storage::url($path),

            ]);
        } else {
            return response()->json([
                'error' => ['message' => $file->getError()],
            ]);
        }
    }
}
