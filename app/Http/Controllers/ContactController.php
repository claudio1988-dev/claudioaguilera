<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use App\Mail\BudgetFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'empresa' => 'nullable|string|max:255',
                'servicio' => 'nullable|string|max:255',
                'mensaje' => 'required|string|max:5000',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }

            // Verificar que la configuración de correo esté disponible
            $mailer = config('mail.default');
            if (!$mailer || $mailer === 'log') {
                Log::warning('Mailer no configurado correctamente. Usando: ' . $mailer);
            }

            Mail::to('claudio.datos@gmail.com')->send(
                new ContactFormMail($request->all())
            );

            return back()->with('success', '¡Mensaje enviado exitosamente! Te responderé pronto.');
        } catch (\Illuminate\Contracts\Mail\MailerException $e) {
            Log::error('Error de Mailer al enviar correo de contacto: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'config' => [
                    'mailer' => config('mail.default'),
                    'resend_key' => config('services.resend.key') ? 'configurado' : 'no configurado',
                ]
            ]);
            return back()->withErrors(['message' => 'Error de configuración de correo. Por favor, contacta al administrador.'])->withInput();
        } catch (\Exception $e) {
            Log::error('Error general al enviar correo de contacto: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withErrors(['message' => 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'])->withInput();
        }
    }

    public function sendBudget(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'company' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:255',
                'projectType' => 'required|string|max:255',
                'budget' => 'nullable|string|max:255',
                'timeline' => 'nullable|string|max:255',
                'description' => 'required|string|max:5000',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            Mail::to('claudio.datos@gmail.com')->send(
                new BudgetFormMail($request->all())
            );

            return response()->json(['success' => true, 'message' => '¡Solicitud de presupuesto enviada exitosamente! Te responderé pronto.']);
        } catch (\Illuminate\Contracts\Mail\MailerException $e) {
            Log::error('Error de Mailer al enviar correo de presupuesto: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'config' => [
                    'mailer' => config('mail.default'),
                    'resend_key' => config('services.resend.key') ? 'configurado' : 'no configurado',
                ]
            ]);
            return response()->json(['errors' => ['message' => 'Error de configuración de correo. Por favor, contacta al administrador.']], 500);
        } catch (\Exception $e) {
            Log::error('Error general al enviar correo de presupuesto: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['errors' => ['message' => 'Hubo un error al enviar la solicitud. Por favor, intenta nuevamente.']], 500);
        }
    }
}

