<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function send(Request $request)
    {
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

        try {
            Mail::to('claudio.datos@gmail.com')->send(
                new ContactFormMail($request->all())
            );

            return back()->with('success', '¡Mensaje enviado exitosamente! Te responderé pronto.');
        } catch (\Exception $e) {
            Log::error('Error al enviar correo de contacto: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'])->withInput();
        }
    }
}

