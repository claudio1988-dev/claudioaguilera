<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #01D0FF 0%, #0085EE 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            color: #0085EE;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border-left: 3px solid #01D0FF;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nuevo mensaje de contacto</h1>
        <p>Has recibido un nuevo mensaje desde tu sitio web</p>
    </div>
    
    <div class="content">
        <div class="field">
            <div class="field-label">Nombre:</div>
            <div class="field-value">{{ $data['nombre'] ?? 'No especificado' }}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">{{ $data['email'] ?? 'No especificado' }}</div>
        </div>
        
        @if(!empty($data['empresa']))
        <div class="field">
            <div class="field-label">Empresa:</div>
            <div class="field-value">{{ $data['empresa'] }}</div>
        </div>
        @endif
        
        @if(!empty($data['servicio']))
        <div class="field">
            <div class="field-label">Servicio de interés:</div>
            <div class="field-value">
                @if($data['servicio'] == 'erp') Sistema ERP/CRM
                @elseif($data['servicio'] == 'ecommerce') Tienda E-commerce
                @elseif($data['servicio'] == 'web') Sitio Web Corporativo
                @else Otro proyecto
                @endif
            </div>
        </div>
        @endif
        
        <div class="field">
            <div class="field-label">Mensaje:</div>
            <div class="field-value">{{ $data['mensaje'] ?? 'No especificado' }}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Este correo fue enviado desde el formulario de contacto de tu sitio web.</p>
        <p>Fecha: {{ now()->format('d/m/Y H:i:s') }}</p>
    </div>
</body>
</html>

