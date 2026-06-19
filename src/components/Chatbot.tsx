import React, { useState, useRef, useEffect } from 'react';
import { parseSymptoms, defaultResponseEn, defaultResponseTe, defaultResponseHi, defaultResponseTa, defaultResponseKn } from '../data/triageRules';
import type { TriageResult } from '../data/triageRules';
import { Send, AlertCircle, Lock, ShieldAlert, Volume2, Mic, Square } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  triage?: TriageResult | null;
}

interface ChatbotProps {
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
  isOffline: boolean;
  isModelDownloaded: boolean;
  triggerEmergencyAlert: () => void;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const Chatbot: React.FC<ChatbotProps> = ({
  language,
  isOffline,
  isModelDownloaded,
  triggerEmergencyAlert
}) => {
  const t = {
    en: {
      botWelcome: "Hello! I am your Rural Health Assistant. I can help with first aid guidance, symptom triage, and emergency advice fully offline. Please describe how you are feeling.",
      disclaimer: "AI Guidance only. For severe conditions, go directly to a doctor or use the red SOS tab.",
      speak: "Speak",
      placeholder: isOffline ? "Ask offline chatbot..." : "Ask chatbot online...",
      symptomWarning: "CRITICAL SYMPTOM DETECTED",
      warningDetail: "The symptoms you described look serious. Please seek medical assistance immediately.",
      triggerSOS: "Trigger Doctor Alert Now",
      speechUnsupported: "⚠️ Voice recognition is not supported in this browser.",
      listening: "Listening...",
      speakFirstAid: "First Aid Steps:"
    },
    te: {
      botWelcome: "నమస్కారం! నేను మీ ఆరోగ్య సహాయకుడిని. ఆసుపత్రికి వెళ్లేలోపు చేయాల్సిన సాయం మరియు ప్రథమ చికిత్సల సమాచారం నా దగ్గర ఉంది. మీ సమస్యను నాతో పంచుకోండి.",
      disclaimer: "ఇది కేవలం సమాచారం కొరకు మాత్రమే. కఠిన సమస్యలకు వెంటనే ప్రభుత్వ ఆసుపత్రికి వెళ్ళండి.",
      speak: "వినిపించు",
      placeholder: isOffline ? "ఆఫ్‌లైన్ చాట్‌బాట్‌ను అడగండి..." : "చాట్‌బాట్‌ను అడగండి...",
      symptomWarning: "అత్యవసర చికిత్స అవసరం",
      warningDetail: "మీరు చెప్పిన లక్షణాలు తీవ్రమైనవిగా కనిపిస్తున్నాయి. దయచేసి ఆలస్యం చేయకుండా డాక్టర్ వద్దకు వెళ్ళండి.",
      triggerSOS: "వెంటనే డాక్టర్లకి సమాచారం పంపు",
      speechUnsupported: "⚠️ ఈ బ్రౌజర్‌లో వాయిస్ సపోర్ట్ లేదు.",
      listening: "వింటున్నాను...",
      speakFirstAid: "చేయాల్సిన పనులు:"
    },
    hi: {
      botWelcome: "नमस्ते! मैं आपका ग्रामीण स्वास्थ्य सहायक हूँ। मैं आपको प्राथमिक चिकित्सा मार्गदर्शन, लक्षणों की गंभीरता की जांच और आपातकालीन सलाह पूरी तरह से ऑफ़लाइन प्रदान कर सकता हूँ। कृपया बताएं कि आप कैसा महसूस कर रहे हैं।",
      disclaimer: "केवल एआई मार्गदर्शन। गंभीर स्थितियों के लिए, सीधे डॉक्टर के पास जाएं या लाल एसओएस टैब का उपयोग करें।",
      speak: "सुनें",
      placeholder: isOffline ? "ऑफ़लाइन चैटबॉट से पूछें..." : "ऑनलाइन चैटबॉट से पूछें...",
      symptomWarning: "गंभीर लक्षण पाया गया",
      warningDetail: "आपके द्वारा वर्णित लक्षण गंभीर दिख रहे हैं। कृपया तुरंत चिकित्सा सहायता लें।",
      triggerSOS: "तुरंत डॉक्टर अलर्ट भेजें",
      speechUnsupported: "⚠️ इस ब्राउज़र में आवाज पहचान समर्थित नहीं है।",
      listening: "सुन रहा हूँ...",
      speakFirstAid: "प्राथमिक चिकित्सा कदम:"
    },
    ta: {
      botWelcome: "வணக்கம்! நான் உங்கள் கிராமப்புற சுகாதார உதவியாளர். முதலுதவி வழிகாட்டுதல், நோய் அறிகுறிகளின் தீவிரம் மற்றும் அவசர ஆலோசனைகளை முழுமையாக ஆஃப்லைனில் என்னால் வழங்க முடியும். உங்களுக்கு என்ன பிரச்சனை என்று கூறுங்கள்.",
      disclaimer: "AI வழிகாட்டுதல் மட்டுமே. கடுமையான நிலைகளுக்கு, நேரடியாக மருத்துவரிடம் செல்லவும் அல்லது அவசர SOS தாவலைப் பயன்படுத்தவும்.",
      speak: "கேள்",
      placeholder: isOffline ? "ஆஃப்லைன் சாட்பாட்டிடம் கேளுங்கள்..." : "ஆன்லைன் சாட்பாட்டிடம் கேளுங்கள்...",
      symptomWarning: "அபாயகரமான அறிகுறி கண்டறியப்பட்டது",
      warningDetail: "நீங்கள் விவரித்த அறிகுறிகள் தீவிரமாகத் தெரிகின்றன. தயவுசெய்து உடனடியாக மருத்துவ உதவியை நாடுங்கள்.",
      triggerSOS: "உடனடியாக மருத்துவர் எச்சரிக்கையை இயக்கு",
      speechUnsupported: "⚠️ இந்த உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை.",
      listening: "கேட்கிறது...",
      speakFirstAid: "முதலுதவி முறைகள்:"
    },
    kn: {
      botWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಸಹಾಯಕರಾಗಿದ್ದೇನೆ. ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಮಾರ್ಗದರ್ಶನ, ರೋಗಲಕ್ಷಣಗಳ ತೀವ್ರತೆ ಮತ್ತು ತುರ್ತು ಸಲಹೆಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ನೀಡಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ತಿಳಿಸಿ.",
      disclaimer: "ಎಐ ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ. ತೀವ್ರ ತೊಂದರೆಗಳಿಗಾಗಿ ನೇರವಾಗಿ ವೈದ್ಯರ ಬಳಿ ಹೋಗಿ ಅಥವಾ ಕೆಂಪು SOS ಬಟನ್ ಬಳಸಿ.",
      speak: "ಕೇಳಿ",
      placeholder: isOffline ? "ಆಫ್‌ಲೈನ್ ಚಾಟ್‌ಬಾಟ್‌ಗೆ ಕೇಳಿ..." : "ಚಾಟ್‌ಬಾಟ್‌ಗೆ ಕೇಳಿ...",
      symptomWarning: "ಅಪಾಯಕಾರಿ ರೋಗಲಕ್ಷಣ ಪತ್ತೆಯಾಗಿದೆ",
      warningDetail: "ನೀವು ಹೇಳಿದ ಲಕ್ಷಣಗಳು ತೀವ್ರವಾಗಿವೆ. ದಯವಿಟ್ಟು ವಿಳಂಬವಿಲ್ಲದೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      triggerSOS: "ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಅಲರ್ಟ್ ಕಳುಹಿಸಿ",
      speechUnsupported: "⚠️ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
      listening: "ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...",
      speakFirstAid: "ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಹಂತಗಳು:"
    }
  };

  const labels = t[language] || t.en;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Messages based on language change
  useEffect(() => {
    const welcomeText = labels.botWelcome;
    setMessages([
      {
        sender: 'bot',
        text: welcomeText
      }
    ]);
  }, [language]);

  // Load voices early to prevent TTS delay / failure on Chrome
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    
    // Map application language to speech recognition language
    const langMap = { en: 'en-US', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN' };
    rec.lang = langMap[language] || 'en-US';

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInputValue(transcript);
      }
    };

    rec.onerror = (err: any) => {
      console.error('STT Error:', err);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(labels.speechUnsupported);
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      recognitionRef.current.start();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue('');

    // Add User message
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    // Simulate local inference
    setTimeout(() => {
      const triageResult = parseSymptoms(userText);
      
      let botResponse = '';

      if (triageResult) {
        if (language === 'te') {
          botResponse = triageResult.adviceTe + "\n\n" + labels.speakFirstAid + "\n" + triageResult.firstAidTe.map((s, i) => `${i+1}. ${s}`).join('\n') + "\n\nతదుపరి చర్య: " + triageResult.actionNeededTe;
        } else if (language === 'hi') {
          botResponse = (triageResult.adviceHi || triageResult.advice) + "\n\n" + labels.speakFirstAid + "\n" + (triageResult.firstAidHi || triageResult.firstAid).map((s, i) => `${i+1}. ${s}`).join('\n') + "\n\nकार्रवाई आवश्यक: " + (triageResult.actionNeededHi || triageResult.actionNeeded);
        } else if (language === 'ta') {
          botResponse = (triageResult.adviceTa || triageResult.advice) + "\n\n" + labels.speakFirstAid + "\n" + (triageResult.firstAidTa || triageResult.firstAid).map((s, i) => `${i+1}. ${s}`).join('\n') + "\n\nதேவையான நடவடிக்கை: " + (triageResult.actionNeededTa || triageResult.actionNeeded);
        } else if (language === 'kn') {
          botResponse = (triageResult.adviceKn || triageResult.advice) + "\n\n" + labels.speakFirstAid + "\n" + (triageResult.firstAidKn || triageResult.firstAid).map((s, i) => `${i+1}. ${s}`).join('\n') + "\n\nಅಗತ್ಯವಿರುವ ಕ್ರಮ: " + (triageResult.actionNeededKn || triageResult.actionNeeded);
        } else {
          botResponse = triageResult.advice + "\n\n" + labels.speakFirstAid + "\n" + triageResult.firstAid.map((s, i) => `${i+1}. ${s}`).join('\n') + "\n\nAction Needed: " + triageResult.actionNeeded;
        }
      } else {
        if (language === 'te') botResponse = defaultResponseTe;
        else if (language === 'hi') botResponse = defaultResponseHi;
        else if (language === 'ta') botResponse = defaultResponseTa;
        else if (language === 'kn') botResponse = defaultResponseKn;
        else botResponse = defaultResponseEn;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          triage: triageResult
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();

    // Clean formatting and emojis from text for better TTS reading
    const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");

    const langMap = { en: 'en-US', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN' };
    const targetLangCode = langMap[language] || 'en-US';

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = targetLangCode;
    utterance.rate = 0.85;

    // Retrieve voices and assign target language voice specifically to prevent defaulting
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(targetLangCode.split('-')[0]));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  if (!isModelDownloaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '24px', textAlign: 'center', background: 'var(--color-bg-primary)', height: 'calc(100vh - 70px)' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', border: '1px dashed #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <Lock size={32} style={{ color: '#f59e0b' }} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
          {language === 'en' ? 'Offline AI Chatbot Locked' : language === 'te' ? 'ఆఫ్‌లైన్ చాట్‌బాట్ లాక్ చేయబడింది' : language === 'hi' ? 'ऑफ़लाइन एआई चैटबॉट लॉक है' : language === 'ta' ? 'ஆஃப்லைன் ஏஐ சாட்பாட் பூட்டப்பட்டுள்ளது' : 'ಆಫ್‌ಲೈನ್ ಎಐ ಚಾಟ್‌ಬಾಟ್ ಲಾಕ್ ಆಗಿದೆ'}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '16px', maxWidth: '380px' }}>
          {language === 'en' 
            ? 'To chat with the AI assistant without internet, you must first download the lightweight model (approx. 850 MB). Go to the top card to download.' 
            : language === 'te' ? 'ఇంటర్నెట్ లేకుండా చాట్‌బాట్ వాడటానికి ముందుగా మీరు 850 ఎంబీ గల మోడల్‌ని డౌన్‌లోడ్ చేసుకోవాలి. పై భాగంలో డౌన్‌లోడ్ బటన్ ఉంటుంది.'
            : language === 'hi' ? 'बिना इंटरनेट के एआई सहायक के साथ चैट करने के लिए, आपको पहले लाइटवेट मॉडल (लगभग 850 एमबी) डाउनलोड करना होगा। डाउनलोड करने के लिए शीर्ष कार्ड पर जाएं।'
            : language === 'ta' ? 'இணையம் இல்லாமல் ஏஐ உதவியாளருடன் அரட்டையடிக்க, நீங்கள் முதலில் இலகுரக மாதிரியை (சுமார் 850 எம்பி) பதிவிறக்க வேண்டும். பதிவிறக்க மேல் கார்டுக்குச் செல்லவும்.'
            : 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಎಐ ಸಹಾಯಕನೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಲು, ನೀವು ಮೊದಲು ಲೈಟ್‌ವೇಟ್ ಮಾಡೆಲ್ (ಅಂದಾಜು 850 ಎಂಬಿ) ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬೇಕು. ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಮೇಲಿನ ಕಾರ್ಡ್‌ಗೆ ಹೋಗಿ.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', background: 'var(--color-bg-primary)' }}>
      {/* Disclaimer Header */}
      <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', padding: '10px 24px', display: 'flex', gap: '8px', alignItems: 'center', zIndex: 10 }}>
        <AlertCircle size={16} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: '1.3' }}>
          {labels.disclaimer}
        </span>
      </div>

      {/* Messages Feed */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, index) => {
          const isBot = msg.sender === 'bot';
          
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: isBot ? 'flex-start' : 'flex-end' }}>
              <div 
                className={isBot ? 'chat-bubble chat-bubble-bot' : 'chat-bubble chat-bubble-user'}
                style={{ whiteSpace: 'pre-line', fontSize: '13px', padding: '14px 18px', maxWidth: '70%' }}
              >
                {msg.text}
                
                {isBot && (
                  <button 
                    onClick={() => speakText(msg.text)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', marginTop: '8px', padding: '2px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 'bold' }}
                  >
                    <Volume2 size={12} />
                    {labels.speak}
                  </button>
                )}
              </div>

              {/* High severity warning banner card */}
              {isBot && msg.triage?.severity === 'high' && (
                <div className="glass-card" style={{ maxWidth: '70%', padding: '16px', border: '1px solid var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)', color: '#f8fafc', fontSize: '12px', marginTop: '6px', marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-danger)', fontWeight: 'bold' }}>
                    <ShieldAlert size={16} />
                    <span>{labels.symptomWarning}</span>
                  </div>
                  <p>{labels.warningDetail}</p>
                  <button 
                    onClick={triggerEmergencyAlert}
                    className="btn btn-danger" 
                    style={{ padding: '8px 16px', fontSize: '11px', borderRadius: '8px', width: 'auto', alignSelf: 'flex-start' }}
                  >
                    {labels.triggerSOS}
                  </button>
                </div>
              )}
            </div>
          );
        })}
        
        {isTyping && (
          <div className="chat-bubble chat-bubble-bot" style={{ alignSelf: 'flex-start' }}>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} style={{ padding: '16px 24px', borderTop: '1px solid var(--color-glass-border)', background: 'rgba(11, 18, 38, 0.8)', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={labels.placeholder}
          style={{
            flex: 1,
            background: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-glass-border)',
            borderRadius: '12px',
            padding: '12px 18px',
            fontSize: '13px',
            color: '#f8fafc',
            outline: 'none'
          }}
        />

        {/* Microphone STT input trigger */}
        <button
          type="button"
          onClick={toggleVoiceInput}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: isListening ? 'linear-gradient(135deg, var(--color-danger), #991b1b)' : 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isListening ? 'white' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            transition: 'var(--transition-bounce)',
            flexShrink: 0
          }}
          className={isListening ? 'animate-pulse' : ''}
          title="Speak into Chatbot"
        >
          {isListening ? <Square size={16} /> : <Mic size={18} />}
        </button>

        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="btn btn-primary"
          style={{ width: '44px', height: '44px', padding: 0, borderRadius: '50%', flexShrink: 0 }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
