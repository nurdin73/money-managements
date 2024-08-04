<?php

namespace App\Models\Global;

use App\Models\Master\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'reference_type', 'reference_id', 'type', 'title', 'description', 'url'];

    public function read()
    {
        return $this->belongsTo(ReadNotification::class, 'id', 'notification_id')->where('user_id', auth()->id());
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reference(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'reference_type', 'reference_id');
    }
}
