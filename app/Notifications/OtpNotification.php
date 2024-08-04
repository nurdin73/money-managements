<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OtpNotification extends Notification implements ShouldQueue
{
    protected string $otp;
    protected string $typeVerification = 'otp';
    protected string $key;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $otp, string $key, string $typeVerification = 'otp')
    {
        $this->otp = $otp;
        $this->typeVerification = $typeVerification;
        $this->key = $key;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $content = [
            'subject' => 'OTP Code',
            'greeting' => 'Berikut OTP baru Anda',
            'title' => "Anda telah meminta OTP baru",
            'name' => 'OTP'
        ];
        if ($this->typeVerification === 'forgot-password') {
            $content = [
                'subject' => "Forgot Password",
                'greeting' => 'Kode verifikasi Anda adalah',
                'title' => "Anda telah mencoba mereset password",
                'name' => 'verifikasi'
            ];
        }
        if ($this->typeVerification === 'register') {
            $content = [
                'subject' => "Verification Email",
                'greeting' => 'Kode verifikasi Anda adalah',
                'title' => 'Selamat bergabung di ' . config('app.name'),
                'name' => 'verifikasi'
            ];
        }
        $expire = config('otp.expire');
        $message = (new MailMessage)
            ->subject($content['subject'])
            ->greeting("Halo, $notifiable->fullname")
            ->line($content['title'])
            ->line("{$content['greeting']} :")
            ->line("<span style='font-size:30px; color: #007bff; font-weight: bold; text-align: center;'>{$this->otp}</span>");
        if ($this->typeVerification === 'register') {
            $frontendUrl = config('app.app_frontend_url');
            $url = "{$frontendUrl}/auth/register/verification-account/{$this->key}?email={$notifiable->email}";
            $message = $message->action('Verifikasi akun', $url);
        }
        $message = $message->line("Kode {$content['name']} hanya berlaku dalam {$expire} menit kedepan. Untuk alasan keamanan mohon tidak membagikan kode {$content['name']} tersebut dengan siapapun");
        return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
