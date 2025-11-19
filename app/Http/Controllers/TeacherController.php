<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Teacher;
use Illuminate\Support\Facades\Redirect;

class TeacherController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $teachers = Teacher::where('tenant_id', $tenantId)->get();

        return Inertia::render('teacher/index', [
            'teachers' => $teachers,
        ]);
    }
    public function store(Request $request)
    {
        $tenantId = Auth::user()->tenant_id;

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        Teacher::create([
            'tenant_id' => $tenantId,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'subject' => $request->subject,
            'phone' => $request->phone,
        ]);

        return Redirect::to('/teachers');
    }
    public function show(Teacher $teacher)
    {
        return Inertia::render('teacher/show', [
            'teacher' => $teacher,
        ]);
    }
    public function edit(Teacher $teacher)
    {
        return Inertia::render('teacher/edit', [
            'teacher' => $teacher,
        ]);
    }
    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $teacher->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'subject' => $request->subject,
            'phone' => $request->phone,
        ]);

        return Redirect::to('/teachers');
    }
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return Redirect::to('/teachers');
    }
}