<?php

namespace App\Http\Controllers;

use App\Models\Accident;
use Illuminate\Http\Request;

class AccidentController extends Controller
{
    public function index()
    {
        return response()->json(Accident::all());
    }

    public function store(Request $request)
    {
        $accident = Accident::create([
            'caseName' => $request->caseName,
            'location' => $request->location,
            'details' => $request->details,
            'status' => $request->status ?? 'Pending',
            'coords' => $request->coords ? json_encode($request->coords) : null,
        ]);

        return response()->json($accident, 201);
    }

    public function update(Request $request, $id)
    {
        $accident = Accident::findOrFail($id);
        $accident->update([
            'caseName' => $request->caseName,
            'location' => $request->location,
            'details' => $request->details,
            'status' => $request->status,
            'coords' => $request->coords ? json_encode($request->coords) : $accident->coords,
        ]);

        return response()->json($accident);
    }

    public function destroy($id)
    {
        $accident = Accident::findOrFail($id);
        $accident->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
