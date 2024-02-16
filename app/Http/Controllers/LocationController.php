<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Locations/Index', [
            'locations' => Location::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Locations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'locations.*.line_of_business' => 'required|string|max:255',
            'locations.*.aisle' => 'required|regex:/^[A-Za-z0-9]{2}$/',
            'locations.*.code' => 'required|regex:/^[A-Za-z0-9]{2}-\d{2}-\d{2}$/|unique:locations',
        ], [], [
            'locations.*.line_of_business' => strtolower(trans('Line of business')),
            'locations.*.aisle' => strtolower(trans('Aisle')),
            'locations.*.code' => strtolower(trans('Code')),
        ]);

        Location::insert($validated['locations']);

        return redirect(route('locations.index'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location): Response
    {
        return Inertia::render('Locations/Edit', [
            'location' => $location,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location): RedirectResponse
    {
        $validated = $request->validate([
            'line_of_business' => 'string|max:255',
            'aisle' => 'regex:/^[A-Za-z0-9]{2}$/',
            'code' => 'regex:/^[A-Za-z0-9]{2}-\d{2}-\d{2}$/|unique:locations,code,' . $location->id,
        ], [], [
            'line_of_business' => strtolower(trans('Line of business')),
            'aisle' => strtolower(trans('Aisle')),
            'code' => strtolower(trans('Code')),
        ]);

        $location->update($validated);

        return redirect(route('locations.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location): RedirectResponse
    {
        $location->delete();

        return redirect(route('locations.index'));
    }
}
