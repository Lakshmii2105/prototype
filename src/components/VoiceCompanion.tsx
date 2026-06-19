import React, { useState, useEffect, useRef } from 'react';
import { parseSymptoms } from '../data/triageRules';
import { Mic, Square, Sparkles } from 'lucide-react';

interface VoiceBubble {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

interface VoiceCompanionProps {
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
  isModelDownloaded: boolean;
  triggerEmergencyAlert: () => void;
  setActiveTab: (tab: 'voice' | 'chat' | 'prescription' | 'alerts' | 'hospitals' | 'glossary') => void;
}

export const VoiceCompanion: React.FC<VoiceCompanionProps> = ({
  language,
  isModelDownloaded,
  triggerEmergencyAlert,
  setActiveTab
}) => {
  const t = {
    en: {
      welcome: "Welcome to the Voice Health Companion. Tap the microphone below and describe your symptoms. I can understand colloquial rural terms.",
      listening: "Listening...",
      speaking: "Assistant Speaking...",
      ready: "Voice Companion Ready",
      micErr: "⚠️ Speech API unsupported in this browser. Running in Simulation mode.",
      warningDownload: "Please download the AI model first",
      shortcutTitle: "Voice Simulator Shortcuts (Tap to Test):",
      heartLabel: "Heart Emergency",
      snakeLabel: "Snake Bite",
      feverLabel: "High Fever",
      stomachLabel: "Stomach Ache",
      heartPhrase: "I am having severe chest pain",
      snakePhrase: "A snake bit my leg in the field",
      feverPhrase: "My child has a high fever since yesterday",
      stomachPhrase: "I have a mild stomach ache"
    },
    te: {
      welcome: "వాయిస్ సహాయకుడికి స్వాగతం. కింద గల మైక్రోఫోన్ బటన్ నొక్కి మీ ఆరోగ్య సమస్యలను చెప్పండి. నేను గ్రామాల్లో మాట్లాడే తెలుగును అర్థం చేసుకోగలను.",
      listening: "మీరు చెప్పేది వింటున్నాను...",
      speaking: "ఆసిస్టెంట్ మాట్లాడుతోంది...",
      ready: "వాయిస్ అసిస్టెంట్ సిద్ధంగా ఉంది",
      micErr: "⚠️ మీ బ్రౌజర్‌లో వాయిస్ సపోర్ట్ లేదు. డెమో కీప్యాడ్ ద్వారా పరీక్షించండి.",
      warningDownload: "దయచేసి ముందుగా మోడల్ డౌన్‌లోడ్ చేసుకోండి",
      shortcutTitle: "త్వరిత వాయిస్ కీప్యాడ్ (పరీక్షించడానికి నొక్కండి):",
      heartLabel: "గుండె నొప్పి",
      snakeLabel: "పాము కాటు",
      feverLabel: "తీవ్ర జ్వరం",
      stomachLabel: "కడుపు నొప్పి",
      heartPhrase: "నాకు గుండె విపరీతంగా నొస్తోంది",
      snakePhrase: "చేలో పాము కాటు వేసింది",
      feverPhrase: "నిన్నటి నుండి బాబుకు విపరీతమైన జ్వరం ఉంది",
      stomachPhrase: "నాకు కొంచెం కడుపు నొప్పిగా ఉంది"
    },
    hi: {
      welcome: "वॉयस हेल्थ कंपेनियन में आपका स्वागत है। नीचे दिए गए माइक्रोफ़ोन पर टैप करें और अपने लक्षणों का वर्णन करें। मैं ग्रामीण शब्दों को समझ सकता हूँ।",
      listening: "सुन रहा हूँ...",
      speaking: "सहायक बोल रहा है...",
      ready: "वॉयस कंपेनियन तैयार है",
      micErr: "⚠️ इस ब्राउज़र में वॉयस एपीआई असमर्थित है। सिमुलेशन मोड में चल रहा है।",
      warningDownload: "कृपया पहले एआई मॉडल डाउनलोड करें",
      shortcutTitle: "वॉयस सिम्युलेटर शॉर्टकट (परीक्षण के लिए टैप करें):",
      heartLabel: "दिल की आपात स्थिति",
      snakeLabel: "साँप का काटना",
      feverLabel: "तेज बुखार",
      stomachLabel: "पेट दर्द",
      heartPhrase: "मेरे सीने में बहुत तेज दर्द हो रहा है",
      snakePhrase: "खेत में मेरे पैर में सांप ने काट लिया",
      feverPhrase: "मेरे बच्चे को कल से तेज बुखार है",
      stomachPhrase: "मुझे हल्का पेट दर्द है"
    },
    ta: {
      welcome: "குரல் சுகாதார உதவியாளருக்கு உங்களை வரவேற்கிறோம். கீழே உள்ள மைக்ரோஃபோனைத் தட்டி உங்கள் அறிகுறிகளைக் கூறவும். பேச்சுவழக்கு வார்த்தைகளை என்னால் புரிந்து கொள்ள முடியும்.",
      listening: "கேட்கிறது...",
      speaking: "உதவியாளர் பேசுகிறார்...",
      ready: "குரல் உதவியாளர் தயார்",
      micErr: "⚠️ இந்த உலாவியில் குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை. சிமுலேஷன் பயன்முறையில் இயங்குகிறது.",
      warningDownload: "முதலில் ஏஐ மாதிரியைப் பதிவிறக்கவும்",
      shortcutTitle: "குரல் உருவகப்படுத்துதல் குறுக்குவழிகள் (சோதிக்க தட்டவும்):",
      heartLabel: "இதய அவசரநிலை",
      snakeLabel: "பாம்பு கடி",
      feverLabel: "அதிக காய்ச்சல்",
      stomachLabel: "வயிற்று வலி",
      heartPhrase: "எனக்கு கடுமையான நெஞ்சு வலி உள்ளது",
      snakePhrase: "வயலில் என் காலில் பாம்பு கடித்துவிட்டது",
      feverPhrase: "என் குழந்தைக்கு நேற்று முதல் அதிக காய்ச்சல் உள்ளது",
      stomachPhrase: "எனக்கு லேசான வயிற்று வலி உள்ளது"
    },
    kn: {
      welcome: "ಧ್ವನಿ ಆರೋಗ್ಯ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ಕೆಳಗಿನ ಮೈಕ್ರೊಫೋನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ. ನಾನು ಆಡುಭಾಷೆಯ ಪದಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಲ್ಲೆ.",
      listening: "ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...",
      speaking: "ಸಹಾಯಕ ಮಾತನಾಡುತ್ತಿದ್ದಾನೆ...",
      ready: "ಧ್ವನಿ ಸಹಾಯಕ ಸಿದ್ಧವಾಗಿದೆ",
      micErr: "⚠️ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. ಸಿಮ್ಯುಲೇಶನ್ ಮೋಡ್‌ನಲ್ಲಿ ರನ್ ಆಗುತ್ತಿದೆ.",
      warningDownload: "ದಯವಿಟ್ಟು ಮೊದಲು ಎಐ ಮಾಡೆಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      shortcutTitle: "ಧ್ವನಿ ಸಿಮ್ಯುಲೇಟರ್ ಶಾರ್ಟ್‌ಕಟ್‌ಗಳು (ಪರೀಕ್ಷಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ):",
      heartLabel: "ಹೃದಯದ ತುರ್ತು",
      snakeLabel: "ಹಾವು ಕಡಿತ",
      feverLabel: "ತೀವ್ರ ಜ್ವರ",
      stomachLabel: "ಹೊಟ್ಟೆ ನೋವು",
      heartPhrase: "ನನಗೆ ಎದೆಯಲ್ಲಿ ತೀವ್ರವಾದ ನೋವು ಕಾಣಿಸಿಕೊಂಡಿದೆ",
      snakePhrase: "ಹೊಲದಲ್ಲಿ ನನ್ನ ಕಾಲಿಗೆ ಹಾವು ಕಚ್ಚಿದೆ",
      feverPhrase: "ನನ್ನ ಮಗುವಿಗೆ ನಿನ್ನೆಯಿಂದ ತೀವ್ರ ಜ್ವರವಿದೆ",
      stomachPhrase: "ನನಗೆ ಸ್ವಲ್ಪ ಹೊಟ್ಟೆ ನೋವು ಇದೆ"
    }
  };

  const labels = t[language] || t.en;

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcriptBubbles, setTranscriptBubbles] = useState<VoiceBubble[]>([]);
  const [partialInput, setPartialInput] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message on Language Change
  useEffect(() => {
    setTranscriptBubbles([
      {
        id: 'welcome',
        sender: 'assistant',
        text: labels.welcome
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
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;

    const langMap = { en: 'en-US', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN' };
    rec.lang = langMap[language] || 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      setPartialInput('');
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };

    rec.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setPartialInput(interimTranscript || finalTranscript);

      if (finalTranscript) {
        processFinalVoiceInput(finalTranscript);
      }
    };

    rec.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [language]);

  // Scroll transcripts
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptBubbles, partialInput]);

  // HTML5 Canvas Waveform
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = isListening ? '#10b981' : isSpeaking ? '#06b6d4' : '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const lines = 3;
      const points = 100;

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        const amplitude = isListening ? 20 + l * 6 : isSpeaking ? 12 + l * 4 : 2;
        const frequency = isListening ? 0.08 : isSpeaking ? 0.06 : 0.02;

        for (let i = 0; i < points; i++) {
          const x = (width / points) * i;
          const y = height / 2 + Math.sin(i * frequency + phase + l) * amplitude * Math.sin((i * Math.PI) / points);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += isListening ? 0.15 : isSpeaking ? 0.1 : 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isSpeaking]);

  const toggleListening = () => {
    if (isSpeaking) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    if (!isModelDownloaded) {
      alert(labels.warningDownload);
      return;
    }

    if (!recognitionRef.current) {
      simulateVoiceQuery();
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
        recognitionRef.current.stop();
      }
    }
  };

  const processFinalVoiceInput = (text: string) => {
    const userMsgId = Date.now().toString();
    const newUserBubble: VoiceBubble = {
      id: userMsgId,
      sender: 'user',
      text: text
    };

    setTranscriptBubbles((prev) => [...prev, newUserBubble]);
    setPartialInput('');
    setIsSpeaking(true);

    setTimeout(() => {
      const triage = parseSymptoms(text);
      let reply = '';

      if (triage) {
        if (language === 'te') {
          reply = `${triage.adviceTe} మొదటగా ఇది చేయండి: ${triage.firstAidTe[0]}. తదుపరి చర్య: ${triage.actionNeededTe}.`;
        } else if (language === 'hi') {
          reply = `${triage.adviceHi || triage.advice} सबसे पहले यह करें: ${(triage.firstAidHi || triage.firstAid)[0]}. कार्रवाई: ${triage.actionNeededHi || triage.actionNeeded}.`;
        } else if (language === 'ta') {
          reply = `${triage.adviceTa || triage.advice} முதலில் இதைச் செய்யுங்கள்: ${(triage.firstAidTa || triage.firstAid)[0]}. நடவடிக்கை: ${triage.actionNeededTa || triage.actionNeeded}.`;
        } else if (language === 'kn') {
          reply = `${triage.adviceKn || triage.advice} ಮೊದಲಿಗೆ ಇದನ್ನು ಮಾಡಿ: ${(triage.firstAidKn || triage.firstAid)[0]}. ಕ್ರಮ: ${triage.actionNeededKn || triage.actionNeeded}.`;
        } else {
          reply = `${triage.advice} First, do this: ${triage.firstAid[0]}. Action: ${triage.actionNeeded}.`;
        }

        if (triage.severity === 'high') {
          setTimeout(() => {
            triggerEmergencyAlert();
            setActiveTab('alerts');
          }, 5000);
        }
      } else {
        if (language === 'te') reply = "నాకు ఈ లక్షణం అర్థం కాలేదు. ఒకసారి సమీపంలోని ఆరోగ్య కేంద్రానికి వెళ్ళండి.";
        else if (language === 'hi') reply = "मुझे यह लक्षण समझ में नहीं आया। कृपया नजदीकी स्वास्थ्य केंद्र पर जाएं।";
        else if (language === 'ta') reply = "எனக்கு இந்த அறிகுறி புரியவில்லை. தயவுசெய்து அருகில் உள்ள ஆரம்ப சுகாதார நிலையத்திற்குச் செல்லவும்.";
        else if (language === 'kn') reply = "ನನಗೆ ಈ ರೋಗಲಕ್ಷಣ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಹತ್ತಿರದ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.";
        else reply = "I couldn't identify the symptom. Please visit the closest primary health clinic.";
      }

      const assistantBubble: VoiceBubble = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply
      };

      setTranscriptBubbles((prev) => [...prev, assistantBubble]);

      // TTS voice matcher
      const langMap = { en: 'en-US', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN' };
      speakResponse(reply, langMap[language] || 'en-US');
    }, 1000);
  };

  const speakResponse = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean emojis
    const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const simulateVoiceQuery = (customPhrase?: string) => {
    const chosenPhrase = customPhrase || labels.heartPhrase;

    setIsListening(true);
    setPartialInput('');

    let currentText = '';
    let i = 0;
    const interval = setInterval(() => {
      currentText += chosenPhrase[i];
      setPartialInput(currentText);
      i++;
      if (i >= chosenPhrase.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsListening(false);
          processFinalVoiceInput(chosenPhrase);
        }, 600);
      }
    }, 40);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', padding: '24px', background: 'var(--color-bg-primary)', gap: '20px' }}>
      
      {/* Waveform Visualization Canvas */}
      <div className="glass-card" style={{ height: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <canvas ref={canvasRef} width={600} height={80} style={{ width: '100%', height: '80px' }}></canvas>
        <span style={{
          position: 'absolute',
          bottom: '10px',
          fontSize: '12px',
          fontWeight: '700',
          color: isListening ? '#10b981' : isSpeaking ? '#06b6d4' : 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {isListening && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse"></span>}
          {isListening ? labels.listening : isSpeaking ? labels.speaking : labels.ready}
        </span>
      </div>

      {!speechSupported && (
        <div style={{ fontSize: '11px', color: 'var(--color-accent)', textAlign: 'center', background: 'rgba(245, 158, 11, 0.1)', padding: '6px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          {labels.micErr}
        </div>
      )}

      {/* Main Grid: Shortcuts panel + Transcript feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '20px', flex: 1, overflow: 'hidden' }}>
        
        {/* Shortcut Commands */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
            <span>{labels.shortcutTitle}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => simulateVoiceQuery(labels.heartPhrase)} className="btn btn-secondary" style={{ padding: '10px', fontSize: '11px', textAlign: 'left', display: 'block' }}>
              <strong>{labels.heartLabel}</strong>
              <span style={{ display: 'block', fontSize: '9px', color: 'var(--color-text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>"{labels.heartPhrase}"</span>
            </button>
            <button onClick={() => simulateVoiceQuery(labels.snakePhrase)} className="btn btn-secondary" style={{ padding: '10px', fontSize: '11px', textAlign: 'left', display: 'block' }}>
              <strong>{labels.snakeLabel}</strong>
              <span style={{ display: 'block', fontSize: '9px', color: 'var(--color-text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>"{labels.snakePhrase}"</span>
            </button>
            <button onClick={() => simulateVoiceQuery(labels.feverPhrase)} className="btn btn-secondary" style={{ padding: '10px', fontSize: '11px', textAlign: 'left', display: 'block' }}>
              <strong>{labels.feverLabel}</strong>
              <span style={{ display: 'block', fontSize: '9px', color: 'var(--color-text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>"{labels.feverPhrase}"</span>
            </button>
            <button onClick={() => simulateVoiceQuery(labels.stomachPhrase)} className="btn btn-secondary" style={{ padding: '10px', fontSize: '11px', textAlign: 'left', display: 'block' }}>
              <strong>{labels.stomachLabel}</strong>
              <span style={{ display: 'block', fontSize: '9px', color: 'var(--color-text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>"{labels.stomachPhrase}"</span>
            </button>
          </div>
        </div>

        {/* Scrolling Transcript feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-glass-border)', overflowY: 'auto' }}>
          {transcriptBubbles.map((b, idx) => {
            const isUser = b.sender === 'user';
            
            return (
              <div key={b.id || idx} style={{ display: 'flex', width: '100%', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  lineHeight: '1.45',
                  background: isUser ? 'linear-gradient(135deg, var(--color-primary-hover), var(--color-primary))' : 'var(--color-bg-tertiary)',
                  color: isUser ? 'white' : 'var(--color-text-primary)',
                  border: isUser ? 'none' : '1px solid var(--color-glass-border)',
                  borderBottomRightRadius: isUser ? '2px' : '16px',
                  borderBottomLeftRadius: isUser ? '16px' : '2px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
                }}>
                  {b.text}
                </div>
              </div>
            );
          })}

          {/* Partial speech bubble */}
          {partialInput && (
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
              <div style={{
                maxWidth: '75%',
                padding: '12px 16px',
                borderRadius: '16px',
                fontSize: '13px',
                lineHeight: '1.45',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3))',
                color: '#f8fafc',
                border: '1px dashed var(--color-primary)',
                borderBottomRightRadius: '2px',
                fontStyle: 'italic'
              }}>
                {partialInput}...
              </div>
            </div>
          )}
          <div ref={transcriptEndRef} />
        </div>

      </div>

      {/* Main Giant Mic Activation Button */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
        <button
          onClick={toggleListening}
          className={`glow-mic ${isListening ? 'glow-mic-active' : ''}`}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: isListening 
              ? 'linear-gradient(135deg, #10b981, #059669)' 
              : isSpeaking 
              ? 'linear-gradient(135deg, var(--color-danger), #dc2626)' 
              : 'linear-gradient(135deg, #1e293b, var(--color-bg-tertiary))',
            border: isListening 
              ? '3px solid #34d399' 
              : isSpeaking 
              ? '3px solid var(--color-danger)' 
              : '3px solid var(--color-glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            transition: 'var(--transition-bounce)',
            transform: isListening ? 'scale(1.08)' : 'scale(1)'
          }}
        >
          {isSpeaking ? <Square size={26} style={{ fill: 'white' }} /> : <Mic size={26} />}
        </button>
      </div>

    </div>
  );
};
