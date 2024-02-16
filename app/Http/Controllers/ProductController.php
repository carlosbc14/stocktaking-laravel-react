<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Products/Index', [
            'products' => Product::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'products.*.code_sku' => 'required|unique:products|string|max:255',
            'products.*.description' => 'required|string|max:255',
            'products.*.institution' => 'required|string|max:255',
        ], [], [
            'products.*.code_sku' => strtolower(trans('Code') . ' SKU'),
            'products.*.description' => strtolower(trans('Description')),
            'products.*.institution' => strtolower(trans('Institution')),
        ]);

        Product::insert($validated['products']);

        return redirect(route('products.index'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'code_sku' => 'string|max:255|unique:products,code_sku,' . $product->id,
            'description' => 'string|max:255',
            'institution' => 'string|max:255',
        ], [], [
            'code_sku' => strtolower(trans('Code') . ' SKU'),
            'description' => strtolower(trans('Description')),
            'institution' => strtolower(trans('Institution')),
        ]);

        $product->update($validated);

        return redirect(route('products.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect(route('products.index'));
    }
}
