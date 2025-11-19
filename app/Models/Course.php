<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';

    protected $primaryKey = 'course_id';

    public $timestamps = false;
    protected $fillable = [
        'tenant_id',
        'course_name',
        'teacher_id',
    ];

    // public function tenant()
    // {
    //     return $this->belongsTo(Tenant::class, 'tenant_id');
    // }

    // public function teacher()
    // {
    //     return $this->belongsTo(Teacher::class, 'teacher_id');
    // }
}
