<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use Illuminate\Support\Facades\Redirect;

class StudentController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $students = Student::where('tenant_id', $tenantId)->get();

        return Inertia::render('student/index', [
            'students' => $students,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'grade' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
        ]);
        $student = Student::create([
            'tenant_id' => Auth::user()->tenant_id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'date_of_birth' => $validated['date_of_birth'],
            'grade' => $validated['grade'],
            'phone' => $validated['phone'],
                
        ]);
        return Redirect::to('/students');
    }
    public function show(Student $student)
    {
        return Inertia::render('student/show', [
            'student' => $student,
        ]);
    }
    public function edit(Student $student)
    {
        return Inertia::render('student/edit', [
            'student' => $student,
        ]);
    }
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'grade' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
        ]);
        $student->update($validated);
        return Redirect::to('/students');
    }    
    public function destroy(Student $student)
    {
        $student->delete();
        return Redirect::to('/students');
    }   
}