'use client'
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, MessageCircle, Headphones, FileQuestion, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SoportePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Abrir el chatbot automáticamente al cargar esta página
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('openSupportChat'));
  }, []);

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('openSupportChat'));
  };

  const faqs = [
    {
      id: 1,
      question: '¿Cómo puedo crear una cuenta en Game Connect?',
      answer: 'Para crear una cuenta, haz clic en el botón "Registrarse" en la esquina superior derecha de la página. Necesitarás proporcionar un correo electrónico válido, crear una contraseña segura y aceptar nuestros términos y condiciones.'
    },
    {
      id: 2,
      question: '¿Olvidé mi contraseña, qué hago?',
      answer: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?". Ingresa tu correo electrónico registrado y te enviaremos un enlace para restablecer tu contraseña.'
    },
    {
      id: 3,
      question: '¿Cómo reporto un bug o problema técnico?',
      answer: 'Puedes reportar problemas técnicos a través de nuestro chat de soporte o enviando un correo a soporte@gameconnect.com con capturas de pantalla y descripción detallada.'
    },
    {
      id: 4,
      question: '¿Puedo cambiar mi nombre de usuario?',
      answer: 'Sí, puedes cambiar tu nombre de usuario una vez cada 30 días desde la configuración de tu perfil.'
    }
  ];

  const supportCategories = [
    {
      icon: Headphones,
      title: 'Chat en Vivo',
      description: 'Habla con nuestro equipo en tiempo real',
      action: 'Iniciar Chat',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: FileQuestion,
      title: 'Preguntas Frecuentes',
      description: 'Encuentra respuestas rápidas a tus dudas',
      action: 'Ver FAQ',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Reportar Problema',
      description: 'Ayúdanos a mejorar reportando bugs',
      action: 'Reportar',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Centro de Soporte
          </h1>
          <p className="text-xl text-purple-300">
            Estamos aquí para ayudarte. ¿Cómo podemos asistirte hoy?
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6"></div>
        </div>

        {/* Support Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer group"
              onClick={() => index === 0 && handleOpenChat()}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-gray-300 mb-4">{category.description}</p>
              <button className="text-purple-400 font-semibold hover:text-purple-300 transition-colors flex items-center gap-2">
                {category.action}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-purple-300">
              Respuestas a las consultas más comunes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-purple-500/10 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="text-purple-400 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-purple-400 flex-shrink-0" size={24} />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-purple-500/20">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-purple-100 mb-6 text-lg">
            Nuestro equipo está listo para ayudarte. Inicia una conversación ahora.
          </p>
          <button
            onClick={handleOpenChat}
            className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <MessageCircle size={24} />
            Chatear con Soporte
          </button>
        </div>
      </div>
    </div>
  );
}