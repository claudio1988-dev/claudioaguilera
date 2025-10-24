import { Link } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface MainLayoutProps {
    children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <nav className="bg-white shadow-lg dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/logoclaudioaguilera.png"
                                    alt="Claudio Aguilera Logo"
                                    className="h-8 w-auto bg-gray-800 dark:bg-gray-900 rounded p-1"
                                />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="#inicio"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="#servicios"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            >
                                Servicios
                            </Link>
                            <Link
                                href="#portafolio"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            >
                                Portafolio
                            </Link>
                            <Link
                                href="#sobre-mi"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            >
                                Sobre mí
                            </Link>
                            <Link
                                href="#contacto"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Contacto
                            </Link>
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:text-gray-900"
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-700">
                        <Link
                            href="#inicio"
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="#servicios"
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            Servicios
                        </Link>
                        <Link
                            href="#portafolio"
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            Portafolio
                        </Link>
                        <Link
                            href="#sobre-mi"
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            Sobre mí
                        </Link>
                        <Link
                            href="#contacto"
                            className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md"
                        >
                            Contacto
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                {/* Inicio Section */}
                <section id="inicio" className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Desarrollo software a medida para optimizar tu negocio
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                                Especialista en soluciones tecnológicas para PyMEs: desde sistemas de gestión hasta plataformas e-commerce que impulsan tu crecimiento.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="#servicios"
                                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    Ver Servicios
                                </Link>
                                <Link
                                    href="#contacto"
                                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    Solicitar Presupuesto
                                </Link>
                            </div>
                        </div>

                        {/* Servicios destacados */}
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🏢</div>
                                <h3 className="text-xl font-semibold mb-2">Sistemas de Gestión</h3>
                                <p className="text-blue-100">Software a medida para controlar inventarios, ventas y operaciones</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🛒</div>
                                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                                <p className="text-blue-100">Tiendas online modernas que aumentan tus ventas</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">💻</div>
                                <h3 className="text-xl font-semibold mb-2">Sitios Web</h3>
                                <p className="text-blue-100">Presencia digital profesional para tu empresa</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Servicios Section */}
                <section id="servicios" className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Servicios para tu Empresa
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Soluciones tecnológicas adaptadas a las necesidades de las PyMEs, con enfoque en resultados y eficiencia.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Sistemas ERP y CRM
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Gestiona clientes, pedidos e inventario en una sola plataforma. Automatiza procesos y reduce errores administrativos.
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Control de inventarios en tiempo real</li>
                                    <li>• Gestión de clientes y ventas</li>
                                    <li>• Reportes automáticos</li>
                                    <li>• Integración con otras herramientas</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">🛍️</div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Tiendas E-commerce
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Vende 24/7 con una tienda online moderna, segura y fácil de usar. Aumenta tus ingresos con comercio electrónico.
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Catálogo de productos intuitivo</li>
                                    <li>• Pasarelas de pago seguras</li>
                                    <li>• Gestión de envíos integrada</li>
                                    <li>• Panel de administración completo</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">🌐</div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Sitios Web Corporativos
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Presencia digital profesional que genera confianza y atrae nuevos clientes para tu negocio.
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Diseño responsive y moderno</li>
                                    <li>• Optimización SEO</li>
                                    <li>• Formularios de contacto</li>
                                    <li>• Integración con redes sociales</li>
                                </ul>
                            </div>
                        </div>

                        {/* ¿Qué puedo desarrollar para tu empresa? */}
                        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                                ¿Qué puedo desarrollar para tu empresa?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Necesitas optimizar tu gestión interna?</strong> Desarrollo sistemas que automatizan procesos administrativos y reducen tiempos operativos.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Quieres vender por Internet?</strong> Creo tiendas e-commerce completas con gestión de productos, pagos y envíos.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Buscas presencia digital profesional?</strong> Diseño sitios web corporativos que generan confianza y atraen clientes.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>¿Tienes una idea específica?</strong> Desarrollo soluciones a medida adaptadas a tu presupuesto y necesidades.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Portafolio Section */}
                <section id="portafolio" className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Portafolio de Proyectos
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Casos de éxito que demuestran cómo mis soluciones tecnológicas han impulsado el crecimiento de empresas como la tuya.
                            </p>
                        </div>

                        {/* Proyecto destacado: LunaSuite */}
                        <div className="mb-16">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                                <div className="md:flex">
                                    <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
                                        <div className="text-6xl mb-4">🚀</div>
                                        <h3 className="text-3xl font-bold mb-4">LunaSuite</h3>
                                        <p className="text-blue-100 mb-6">
                                            Sistema de Gestión Empresarial completo
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Gestión de clientes y pedidos</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Control de inventario en tiempo real</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Reportes y análisis automáticos</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                                <span>Interfaz intuitiva y moderna</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 p-8">
                                        <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                            Caso de Éxito
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            Desarrollé LunaSuite para una empresa de distribución que necesitaba digitalizar sus procesos.
                                            Anteriormente manejaban todo en hojas de cálculo, lo que generaba errores y pérdida de tiempo.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-blue-600">50%</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">Reducción en tiempos de reporte</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-green-600">30%</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">Aumento en eficiencia administrativa</div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                            <p className="text-sm italic text-gray-700 dark:text-gray-300">
                                                "LunaSuite transformó completamente nuestra gestión. Ahora tenemos control total de nuestros procesos
                                                y hemos reducido significativamente los errores administrativos."
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
                                                - María González, Gerente General
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Otros proyectos */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                                    <span className="text-white text-4xl">🛒</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Tienda Online - Ferretería Express
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        E-commerce completo con catálogo de productos, carrito de compras y sistema de pagos integrado.
                                        La tienda aumentó las ventas online en un 200% en los primeros 6 meses.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                                            React
                                        </span>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm dark:bg-orange-900 dark:text-orange-200">
                                            Laravel
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm dark:bg-green-900 dark:text-green-200">
                                            Stripe
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver proyecto
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                            Código fuente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                                    <span className="text-white text-4xl">🏢</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Sistema de Gestión - Consultora ABC
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Software a medida para gestión de proyectos, clientes y facturación.
                                        Automatizó procesos que antes tomaban 4 horas diarias, liberando tiempo para actividades estratégicas.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                                            Vue.js
                                        </span>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm dark:bg-orange-900 dark:text-orange-200">
                                            Laravel
                                        </span>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm dark:bg-yellow-900 dark:text-yellow-200">
                                            MySQL
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver proyecto
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                            Código fuente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-r from-indigo-400 to-cyan-500 flex items-center justify-center">
                                    <span className="text-white text-4xl">📱</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Sitio Web Corporativo - TechSolutions
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Sitio web responsive con diseño moderno, optimización SEO y formulario de contacto.
                                        Aumentó las consultas comerciales en un 150% gracias a mejor presencia digital.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                                            React
                                        </span>
                                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm dark:bg-cyan-900 dark:text-cyan-200">
                                            Tailwind
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm dark:bg-purple-900 dark:text-purple-200">
                                            Next.js
                                        </span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            Ver proyecto
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                            Código fuente
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sobre mí Section */}
                <section id="sobre-mi" className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Sobre mí
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Desarrollador especializado en soluciones tecnológicas para PyMEs.
                                Entiendo los desafíos únicos de las pequeñas y medianas empresas.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Mi experiencia con PyMEs
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Con más de 5 años desarrollando soluciones tecnológicas, me especializo en entender
                                    las necesidades reales de las PyMEs. He ayudado a numerosas empresas a digitalizar
                                    sus procesos, optimizar operaciones y aumentar su competitividad en el mercado.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Mi enfoque es práctico: desarrollo soluciones que se adaptan a tu presupuesto,
                                    escalan con tu crecimiento y resuelven problemas concretos de tu negocio.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600">50+</div>
                                        <div className="text-gray-600 dark:text-gray-300">Proyectos completados</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-600">30+</div>
                                        <div className="text-gray-600 dark:text-gray-300">PyMEs satisfechas</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Tecnologías que domino
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { name: 'React', desc: 'Interfaces modernas y rápidas' },
                                        { name: 'Laravel', desc: 'Backend robusto y escalable' },
                                        { name: 'Node.js', desc: 'APIs y aplicaciones en tiempo real' },
                                        { name: 'TypeScript', desc: 'Código más seguro y mantenible' },
                                        { name: 'Tailwind CSS', desc: 'Diseños responsive profesionales' },
                                        { name: 'PostgreSQL', desc: 'Bases de datos confiables' },
                                        { name: 'AWS', desc: 'Infraestructura cloud' },
                                        { name: 'Docker', desc: 'Despliegues consistentes' }
                                    ].map((tech) => (
                                        <div key={tech.name} className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">{tech.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{tech.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Testimonios */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                                Lo que dicen mis clientes
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            MG
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">María González</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">Gerente General - Empresa de Distribución</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 italic">
                                        "Claudio transformó completamente nuestra gestión con LunaSuite. Pasamos de hojas de cálculo
                                        caóticas a un sistema profesional que nos da control total. Recomiendo sus servicios a cualquier PyME."
                                    </p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            JP
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Juan Pérez</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">Propietario - Ferretería Express</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 italic">
                                        "La tienda online que desarrolló Claudio duplicó nuestras ventas. Ahora vendemos 24/7 y
                                        tenemos clientes de toda la región. Su conocimiento del negocio minorista es invaluable."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Contacto Section */}
                <section id="contacto" className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Contacto
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                ¿Interesado en trabajar juntos? Me encantaría escuchar sobre tu proyecto.
                                Ponte en contacto conmigo.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Información de contacto
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Email</div>
                                            <div className="text-gray-600 dark:text-gray-300">claudio@example.com</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Teléfono</div>
                                            <div className="text-gray-600 dark:text-gray-300">+56 9 1234 5678</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Ubicación</div>
                                            <div className="text-gray-600 dark:text-gray-300">Santiago, Chile</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <form className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Mensaje
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            placeholder="Tu mensaje..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Enviar mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold mb-4">Claudio Aguilera</h3>
                            <p className="text-gray-400 mb-4">
                                Desarrollador Full-Stack apasionado por crear soluciones digitales innovadoras
                                y experiencias de usuario excepcionales.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://github.com/claudioaguilera" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/claudioaguilera" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
                            <ul className="space-y-2">
                                <li><Link href="#inicio" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
                                <li><Link href="#servicios" className="text-gray-400 hover:text-white transition-colors">Servicios</Link></li>
                                <li><Link href="#portafolio" className="text-gray-400 hover:text-white transition-colors">Portafolio</Link></li>
                                <li><Link href="#sobre-mi" className="text-gray-400 hover:text-white transition-colors">Sobre mí</Link></li>
                                <li><Link href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Tecnologías</h4>
                            <ul className="space-y-2">
                                <li><span className="text-gray-400">React</span></li>
                                <li><span className="text-gray-400">Laravel</span></li>
                                <li><span className="text-gray-400">TypeScript</span></li>
                                <li><span className="text-gray-400">Node.js</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2024 Claudio Aguilera. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}