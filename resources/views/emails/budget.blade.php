<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva solicitud de presupuesto</title>
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
            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
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
            color: #4F46E5;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border-left: 3px solid #7C3AED;
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
        <h1>Nueva solicitud de presupuesto</h1>
        <p>Has recibido una nueva solicitud de presupuesto desde tu sitio web</p>
    </div>
    
    <div class="content">
        <div class="field">
            <div class="field-label">Nombre:</div>
            <div class="field-value">{{ $data['name'] ?? 'No especificado' }}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">{{ $data['email'] ?? 'No especificado' }}</div>
        </div>
        
        @if(!empty($data['company']))
        <div class="field">
            <div class="field-label">Empresa:</div>
            <div class="field-value">{{ $data['company'] }}</div>
        </div>
        @endif
        
        @if(!empty($data['phone']))
        <div class="field">
            <div class="field-label">Teléfono:</div>
            <div class="field-value">{{ $data['phone'] }}</div>
        </div>
        @endif
        
        <div class="field">
            <div class="field-label">Tipo de proyecto:</div>
            <div class="field-value">
                @if($data['projectType'] == 'web') Sitio Web Corporativo
                @elseif($data['projectType'] == 'ecommerce') Tienda E-commerce
                @elseif($data['projectType'] == 'erp') Sistema ERP/CRM
                @elseif($data['projectType'] == 'app') Aplicación Móvil/Web
                @elseif($data['projectType'] == 'automation') Automatización de Procesos
                @else Otro
                @endif
            </div>
        </div>
        
        @if(!empty($data['budget']))
        <div class="field">
            <div class="field-label">Presupuesto aproximado:</div>
            <div class="field-value">
                @if($data['budget'] == 'small') Hasta $1.000.000
                @elseif($data['budget'] == 'medium') $1.000.000 - $3.000.000
                @elseif($data['budget'] == 'large') $3.000.000 - $5.000.000
                @elseif($data['budget'] == 'enterprise') Más de $5.000.000
                @else {{ $data['budget'] }}
                @endif
            </div>
        </div>
        @endif
        
        @if(!empty($data['timeline']))
        <div class="field">
            <div class="field-label">Plazo deseado:</div>
            <div class="field-value">
                @if($data['timeline'] == 'urgent') Urgente (1-2 semanas)
                @elseif($data['timeline'] == 'quick') Rápido (1 mes)
                @elseif($data['timeline'] == 'normal') Normal (2-3 meses)
                @elseif($data['timeline'] == 'relaxed') Sin prisa (3+ meses)
                @else {{ $data['timeline'] }}
                @endif
            </div>
        </div>
        @endif
        
        <div class="field">
            <div class="field-label">Descripción del proyecto:</div>
            <div class="field-value">{{ $data['description'] ?? 'No especificado' }}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Este correo fue enviado desde el formulario de solicitud de presupuesto de tu sitio web.</p>
        <p>Fecha: {{ now()->format('d/m/Y H:i:s') }}</p>
    </div>
</body>
</html>

