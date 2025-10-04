'use client'
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Minimize2, HelpCircle } from 'lucide-react';

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '¡Hola! 👋 Soy tu asistente de soporte gaming. ¿En qué puedo ayudarte hoy?',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Escuchar evento para abrir el chat desde cualquier lugar
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    
    window.addEventListener('openSupportChat', handleOpenChat);
    
    return () => {
      window.removeEventListener('openSupportChat', handleOpenChat);
    };
  }, []);

  const quickReplies = [
    { id: 1, text: '¿Cómo crear una cuenta?', icon: '👤' },
    { id: 2, text: '¿Problemas con el login?', icon: '🔐' },
    { id: 3, text: '¿Reportar un bug?', icon: '🐛' },
    { id: 4, text: '¿Sugerencias?', icon: '💡' }
  ];

  const botResponses = {
    'cuenta': 'Para crear una cuenta, haz clic en el botón "Registrarse" en la esquina superior derecha. Solo necesitas un email válido y una contraseña segura. 🎮',
    'login': 'Si tienes problemas para iniciar sesión, verifica tu correo y contraseña. También puedes usar la opción "¿Olvidaste tu contraseña?" para recuperarla. 🔑',
    'bug': 'Gracias por reportar. Por favor, envíanos un correo a soporte@gameconnect.com con capturas de pantalla y una descripción detallada del problema. 🛠️',
    'sugerencia': '¡Nos encanta escuchar tus ideas! Puedes enviar tus sugerencias a feedback@gameconnect.com. 💭',
    'hola': '¡Hola! 😊 ¿En qué puedo ayudarte hoy?',
    'gracias': '¡De nada! Si necesitas algo más, aquí estaré. ¡Feliz gaming! 🎮✨',
    'default': 'Entiendo tu consulta. Para una atención más personalizada, contáctanos en soporte@gameconnect.com o llámanos al +57 1 234 5678. ⚡'
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage('');

    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let botResponse = botResponses.default;

      if (lowerInput.includes('cuenta') || lowerInput.includes('registr')) {
        botResponse = botResponses.cuenta;
      } else if (lowerInput.includes('login') || lowerInput.includes('contraseña') || lowerInput.includes('sesión')) {
        botResponse = botResponses.login;
      } else if (lowerInput.includes('bug') || lowerInput.includes('error') || lowerInput.includes('problema')) {
        botResponse = botResponses.bug;
      } else if (lowerInput.includes('sugerencia') || lowerInput.includes('idea') || lowerInput.includes('mejora')) {
        botResponse = botResponses.sugerencia;
      } else if (lowerInput.includes('hola') || lowerInput.includes('hey')) {
        botResponse = botResponses.hola;
      } else if (lowerInput.includes('gracias') || lowerInput.includes('thank')) {
        botResponse = botResponses.gracias;
      }

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (text) => {
    setInputMessage(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button - SIEMPRE VISIBLE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 z-50 group animate-bounce hover:animate-none"
          aria-label="Abrir soporte"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-slate-800 rounded-2xl shadow-2xl z-50 border border-purple-500/30 overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">Soporte Gaming</h3>
                <p className="text-purple-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  En línea
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Minimizar"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Quick Replies */}
              <div className="bg-slate-900/50 p-3 border-b border-purple-500/20">
                <p className="text-purple-300 text-xs mb-2 flex items-center gap-1">
                  <HelpCircle size={14} />
                  Preguntas frecuentes:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map(reply => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.text)}
                      className="bg-slate-800 hover:bg-purple-600/30 text-white text-xs p-2 rounded-lg transition-colors border border-purple-500/20 hover:border-purple-500/50 flex items-center gap-1"
                    >
                      <span>{reply.icon}</span>
                      <span className="truncate">{reply.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="h-[380px] overflow-y-auto p-4 space-y-4 bg-slate-900/30">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'bot' ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-slate-700'}`}>
                      {message.type === 'bot' ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
                    </div>
                    <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                      <div className={`p-3 rounded-2xl ${message.type === 'bot' ? 'bg-slate-800 text-gray-200' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{message.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-slate-900/50 border-t border-purple-500/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-500/20"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                    aria-label="Enviar"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}