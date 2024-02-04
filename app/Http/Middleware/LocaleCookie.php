<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LocaleCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $locale = $request->cookie('locale', app()->getLocale());
        $locale = $request->cookie('locale');

        if ($locale == 'es' || $locale == 'en') {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
