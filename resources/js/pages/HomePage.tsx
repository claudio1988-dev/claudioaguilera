import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Code, Cog, Database, Zap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Sun, Moon, CheckCircle, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Add custom CSS for Saturn-like orbiting animation
const orbitStyles = `
@keyframes orbit-a {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg); }
}

@keyframes orbit-b {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(140px) rotate(360deg); }
}

@keyframes orbit-c {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(160px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(160px) rotate(-360deg); }
}

@keyframes orbit-d {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(180px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(180px) rotate(360deg); }
}

@keyframes orbit-e {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(200px) rotate(-360deg); }
}

@keyframes orbit-f {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(220px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(220px) rotate(360deg); }
}

@keyframes orbit-g {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(240px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg) translateX(240px) rotate(-360deg); }
}

@keyframes orbit-h {
  from { transform: translate(-50%, -50%) rotate(0deg) translateX(260px) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg) translateX(260px) rotate(360deg); }
}

.draggable {
  cursor: grab;
  user-select: none;
}

.draggable:active {
  cursor: grabbing;
}

.orbiting {
  pointer-events: auto;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = orbitStyles;
  document.head.appendChild(styleSheet);
}

export default function HomePage() {
    const [darkMode, setDarkMode] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({ industry: '', goal: '', urgency: '' });
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [draggedSphere, setDraggedSphere] = useState<string | null>(null);
    const [spherePositions, setSpherePositions] = useState<Record<string, { x: number; y: number }>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    const handleQuizAnswer = (question: string, answer: string) => {
        setQuizAnswers(prev => ({ ...prev, [question]: answer }));
        if (quizStep < 2) {
            setQuizStep(prev => prev + 1);
        } else {
            setShowRecommendation(true);
        }
    };

    const getRecommendation = () => {
        const { industry, goal, urgency } = quizAnswers;
        if (goal === 'digitalizar') return 'Desarrollo Web Profesional';
        if (goal === 'automatizar') return 'Automatización de Procesos';
        if (goal === 'vender') return 'Tiendas E-commerce';
        if (goal === 'analizar') return 'Sistemas ERP/CRM a Medida';
        return 'Plataformas SaaS (LunaSuite)';
    };

    const handleDragStart = (e: React.DragEvent, sphereId: string) => {
        setDraggedSphere(sphereId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedSphere(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedSphere && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            setSpherePositions(prev => ({
                ...prev,
                [draggedSphere]: { x, y }
            }));
        }
    };

    return (
        <MainLayout>
            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/56954277834?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
                aria-label="Contactar por WhatsApp"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    ¡Hablemos por WhatsApp!
                </span>
            </a>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
                                    Claudio Aguilera
                                </h1>
                                <h2 className="text-xl md:text-2xl font-light mb-6 text-slate-300">
                                    Desarrollo Full-Stack para PyMEs
                                </h2>
                                <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                                    Impulso tu negocio con tecnología simple, eficiente y escalable.
                                    Soluciones SaaS como LunaSuite y sistemas a medida.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#servicios"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-colors group shadow-xl/20"
                                >
                                    Ver Servicios
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#contacto"
                                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-2xl hover:bg-slate-700 hover:text-white transition-colors shadow-xl/20"
                                >
                                    Solicitar presupuesto
                                </Link>
                            </div>
                        </div>

                        <div className="relative" ref={containerRef} onDragOver={handleDragOver} onDrop={handleDrop}>
                            <div className="w-96 h-96 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <img
                                    src="/storage/claudioaguilera.jpg"
                                    alt="Claudio Aguilera - Desarrollador Full Stack"
                                    className="w-72 h-72 object-cover rounded-full border-4 border-white/20 shadow-2xl"
                                />
                            </div>

                            {/* Interactive orbiting technology spheres */}
                            <div className="absolute inset-0">
                                {[
                                    { id: 'react', logo: '/storage/tecnologias/react.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-a 15s linear infinite' },
                                    { id: 'laravel', logo: '/storage/tecnologias/Laravel_logo-700x508.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-b 18s linear infinite' },
                                    { id: 'typescript', logo: '/storage/tecnologias/typescript.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-c 22s linear infinite' },
                                    { id: 'nodejs', logo: '/storage/tecnologias/node.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-d 16s linear infinite' },
                                    { id: 'postgres', logo: '/storage/tecnologias/postgresql.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-e 20s linear infinite' },
                                    { id: 'php', logo: '/storage/tecnologias/php.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-f 25s linear infinite' },
                                    { id: 'python', logo: '/storage/tecnologias/python.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-g 28s linear infinite' },
                                    { id: 'digitalocean', logo: '/storage/tecnologias/digitalocean.webp', color: 'slate', defaultPos: { top: '50%', left: '50%' }, animation: 'orbit-h 12s linear infinite' }
                                ].map((sphere) => {
                                    const position = spherePositions[sphere.id];
                                    const isDragged = draggedSphere === sphere.id;

                                    return (
                                        <div
                                            key={sphere.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, sphere.id)}
                                            onDragEnd={handleDragEnd}
                                            className={`absolute w-16 h-16 bg-${sphere.color}-500 rounded-full opacity-80 shadow-lg draggable orbiting ${isDragged ? 'scale-110 z-10' : ''}`}
                                            style={{
                                                ...sphere.defaultPos,
                                                ...(position && { top: '50%', left: '50%', transform: `translate(${position.x - 32}px, ${position.y - 32}px)` }),
                                                animation: position ? 'none' : sphere.animation,
                                                transform: position ? `translate(${position.x - 32}px, ${position.y - 32}px)` : undefined
                                            }}
                                        >
                                            <div className={`w-full h-full bg-gradient-to-br from-${sphere.color}-400 to-${sphere.color}-600 rounded-full flex items-center justify-center shadow-inner overflow-hidden`}>
                                                {sphere.logo.includes('.webp') || sphere.logo.includes('.png') || sphere.logo.includes('.jpg') ? (
                                                    <img
                                                        src={sphere.logo}
                                                        alt={`${sphere.id} logo`}
                                                        className="w-12 h-12 object-contain select-none"
                                                        draggable={false}
                                                    />
                                                ) : (
                                                    <span className="text-white text-2xl select-none">{sphere.logo}</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                        </div>
                    </div>
                </div>

                {/* Wave decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-12 fill-slate-50 dark:fill-slate-900">
                        <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                    </svg>
                </div>
            </section>

            {/* Servicios Section */}
            <section id="servicios" className="py-20 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-200 tracking-tight mb-4">
                            Servicios Especializados
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Soluciones tecnológicas adaptadas a las necesidades reales de tu empresa
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Code className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Desarrollo Web Profesional
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Sitios web modernos, rápidos y optimizados para conversiones y SEO.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Sitios rápidos y responsivos
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Optimización SEO técnica
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    UI moderna e intuitiva
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Cog className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Automatización de Procesos
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Elimina tareas repetitivas y optimiza flujos de trabajo empresariales.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Flujos sin papel
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Integraciones API
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Reportes automáticos
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Database className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Sistemas ERP/CRM a Medida
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Gestiona clientes, inventarios y operaciones con sistemas personalizados.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Módulos a medida
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Inventario y ventas
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Multi-sucursal
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl/20 hover:shadow-2xl transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Zap className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
                                Plataformas SaaS
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                Como LunaSuite: soluciones cloud escalables para múltiples usuarios.
                            </p>
                            <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Gestión integral
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Altamente escalable
                                </div>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Multi-tenant
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini Quiz Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-200 tracking-tight mb-4">
                            ¿Qué necesitas para tu empresa?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Responde 3 preguntas rápidas y te recomendamos la solución ideal
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-xl/20 border border-slate-200/50 dark:border-slate-700/50">
                        {!showRecommendation ? (
                            <div className="space-y-8">
                                {quizStep === 0 && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                                            ¿En qué industria está tu empresa?
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                                            {['Retail', 'Servicios', 'Manufactura', 'Otro'].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleQuizAnswer('industry', option.toLowerCase())}
                                                    className="p-4 bg-white dark:bg-slate-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors border border-slate-200 dark:border-slate-500"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {quizStep === 1 && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                                            ¿Cuál es tu objetivo principal?
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                                            {[
                                                { label: 'Digitalizar procesos', value: 'digitalizar' },
                                                { label: 'Automatizar tareas', value: 'automatizar' },
                                                { label: 'Vender online', value: 'vender' },
                                                { label: 'Mejorar análisis', value: 'analizar' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleQuizAnswer('goal', option.value)}
                                                    className="p-4 bg-white dark:bg-slate-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors border border-slate-200 dark:border-slate-500"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {quizStep === 2 && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                                            ¿Cuál es tu urgencia?
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            {[
                                                { label: 'Alta - Necesito ya', value: 'alta' },
                                                { label: 'Media - En 3-6 meses', value: 'media' },
                                                { label: 'Baja - Planeando futuro', value: 'baja' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleQuizAnswer('urgency', option.value)}
                                                    className="px-6 py-3 bg-white dark:bg-slate-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors border border-slate-200 dark:border-slate-500"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-6">
                                    <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-2">
                                        ¡Recomendación personalizada!
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-300">
                                        Basado en tus respuestas, te recomendamos:
                                    </p>
                                </div>

                                <div className="bg-indigo-500 text-white rounded-2xl p-6 mb-8">
                                    <h4 className="text-xl font-bold mb-2">{getRecommendation()}</h4>
                                    <p className="text-indigo-100">
                                        Esta solución se adapta perfectamente a tus necesidades de {quizAnswers.industry} con urgencia {quizAnswers.urgency}.
                                    </p>
                                </div>

                                <Link
                                    href={`/contact?industry=${quizAnswers.industry}&goal=${quizAnswers.goal}&urgency=${quizAnswers.urgency}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors group shadow-lg"
                                >
                                    Solicitar presupuesto personalizado
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>



            {/* CTA Final Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                        ¿Listo para digitalizar tu empresa?
                    </h2>
                    <p className="text-xl text-indigo-100 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Transforma tu negocio con soluciones tecnológicas a medida.
                        Desde LunaSuite hasta sistemas personalizados, te ayudo a crecer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#contacto"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors group shadow-xl/20"
                        >
                            Solicitar presupuesto
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="https://wa.me/56912345678?text=Hola%20Claudio,%20me%20gustaría%20saber%20más%20sobre%20tus%20servicios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-indigo-600 transition-colors shadow-xl/20"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}