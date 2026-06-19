import React, { useState } from 'react';
import { Heart, Phone, ShieldCheck, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, language }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sentCode, setSentCode] = useState('');
  const [showSimulatedSms, setShowSimulatedSms] = useState(false);

  const t = {
    en: {
      title: 'Rural AI Health Assistant',
      tagline: 'Secure access to healthcare assistance',
      enterPhone: 'Enter Mobile Number',
      enterPhoneSub: 'A 6-digit verification code will be sent via SMS',
      phonePlaceholder: '10-digit mobile number',
      sendOtp: 'Send OTP Verification Code',
      enterOtp: 'Enter OTP Code',
      enterOtpSub: 'Enter the 6-digit code sent to +91',
      otpPlaceholder: 'Enter 6-digit code',
      verifyBtn: 'Verify & Access Dashboard',
      backBtn: 'Back',
      simulatedSmsTitle: 'Simulated SMS Gateway (Local Network)',
      simulatedSmsMsg: 'Emergency Relay SMS: Your OTP access code is',
      invalidPhone: 'Please enter a valid 10-digit Indian mobile number.',
      invalidOtp: 'Invalid verification code. Please check the SMS gateway.',
      sendingOtp: 'Sending verification code...',
      verifyingOtp: 'Verifying code...'
    },
    te: {
      title: 'గ్రామీణ ఆరోగ్య సహాయక',
      tagline: 'వైద్య సేవల సురక్షిత ప్రవేశ ద్వారం',
      enterPhone: 'మొబైల్ నంబర్ నమోదు చేయండి',
      enterPhoneSub: '6-అంకెల వెరిఫికేషన్ కోడ్ ఎస్ఎమ్ఎస్ ద్వారా పంపబడుతుంది',
      phonePlaceholder: '10-అంకెల మొబైల్ నంబర్',
      sendOtp: 'OTP కోడ్ పంపించు',
      enterOtp: 'OTP వెరిఫికేషన్ కోడ్',
      enterOtpSub: '+91 కు పంపిన 6-అంకెల కోడ్‌ను నమోదు చేయండి',
      otpPlaceholder: '6-అంకెల కోడ్ ఎంటర్ చేయండి',
      verifyBtn: 'ధృవీకరించి లాగిన్ చేయి',
      backBtn: 'వెనుకకు',
      simulatedSmsTitle: 'సిమ్యులేటెడ్ ఎస్ఎమ్ఎస్ గేట్‌వే (లోకల్ నెట్‌వర్క్)',
      simulatedSmsMsg: 'అత్యవసర ఎస్ఎమ్ఎస్: మీ OTP యాక్సెస్ కోడ్',
      invalidPhone: 'దయచేసి సరైన 10-అంకెల భారతీయ మొబైల్ నంబర్‌ను నమోదు చేయండి.',
      invalidOtp: 'తప్పు కోడ్ నమోదు చేసారు. దయచేసి ఎస్ఎమ్ఎస్ గేట్‌వే తనిఖీ చేయండి.',
      sendingOtp: 'కోడ్ పంపుతున్నాము...',
      verifyingOtp: 'కోడ్ ధృవీకరిస్తున్నాము...'
    },
    hi: {
      title: 'ग्रामीण एआई स्वास्थ्य सहायक',
      tagline: 'स्वास्थ्य सहायता तक सुरक्षित पहुंच',
      enterPhone: 'मोबाइल नंबर दर्ज करें',
      enterPhoneSub: 'एसएमएस के माध्यम से 6-अंकीय सत्यापन कोड भेजा जाएगा',
      phonePlaceholder: '10-अंकीय मोबाइल नंबर',
      sendOtp: 'ओटीपी सत्यापन कोड भेजें',
      enterOtp: 'ओटीपी कोड दर्ज करें',
      enterOtpSub: '+91 पर भेजे गए 6-अंकीय कोड दर्ज करें',
      otpPlaceholder: '6-अंकीय कोड दर्ज करें',
      verifyBtn: 'सत्यापित करें और डैशबोर्ड खोलें',
      backBtn: 'पीछे जाएं',
      simulatedSmsTitle: 'सिम्युलेटेड एसएमएस गेटवे (स्थानीय नेटवर्क)',
      simulatedSmsMsg: 'आपातकालीन रिले एसएमएस: आपका ओटीपी एक्सेस कोड है',
      invalidPhone: 'कृपया एक वैध 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें।',
      invalidOtp: 'अवैध सत्यापन कोड। कृपया एसएमएस गेटवे की जांच करें।',
      sendingOtp: 'सत्यापन कोड भेजा जा रहा है...',
      verifyingOtp: 'कोड सत्यापित किया जा रहा है...'
    },
    ta: {
      title: 'கிராமப்புற ஏஐ சுகாதார உதவியாளர்',
      tagline: 'சுகாதார உதவிக்கான பாதுகாப்பான அணுகல்',
      enterPhone: 'கைபேசி எண்ணை உள்ளிடவும்',
      enterPhoneSub: '6 இலக்க சரிபார்ப்புக் குறியீடு எஸ்எம்எஸ் மூலம் அனுப்பப்படும்',
      phonePlaceholder: '10 இலக்க கைபேசி எண்',
      sendOtp: 'OTP குறியீட்டை அனுப்பு',
      enterOtp: 'OTP குறியீட்டை உள்ளிடவும்',
      enterOtpSub: '+91 என்ற எண்ணிற்கு அனுப்பப்பட்ட 6 இலக்க குறியீட்டை உள்ளிடவும்',
      otpPlaceholder: '6 இலக்க குறியீட்டை உள்ளிடவும்',
      verifyBtn: 'சரிபார்த்து உள்நுழையவும்',
      backBtn: 'பின்னால்',
      simulatedSmsTitle: 'எஸ்எம்எஸ் கேட்வே (உள்ளூர் நெட்வொர்க்)',
      simulatedSmsMsg: 'அவசர எஸ்எம்எஸ்: உங்கள் OTP குறியீடு',
      invalidPhone: 'முறையான 10 இலக்க இந்திய கைபேசி எண்ணை உள்ளிடவும்.',
      invalidOtp: 'தவறான சரிபார்ப்புக் குறியீடு. எஸ்எம்எஸ் கேட்வேயை சரிபார்க்கவும்.',
      sendingOtp: 'சரிபார்ப்புக் குறியீடு அனுப்பப்படுகிறது...',
      verifyingOtp: 'குறியீடு சரிபார்க்கப்படுகிறது...'
    },
    kn: {
      title: 'ಗ್ರಾಮೀಣ ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕ',
      tagline: 'ಆರೋಗ್ಯ ಸಹಾಯಕ್ಕೆ ಸುರಕ್ಷಿತ ಪ್ರವೇಶ',
      enterPhone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
      enterPhoneSub: '6-ಅಂಕಿಯ ಪರಿಶೀಲನಾ ಕೋಡ್ ಅನ್ನು ಎಸ್‌ಎಮ್‌ಎಸ್ ಮೂಲಕ ಕಳುಹಿಸಲಾಗುತ್ತದೆ',
      phonePlaceholder: '10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      sendOtp: 'OTP ಕೋಡ್ ಕಳುಹಿಸಿ',
      enterOtp: 'OTP ಕೋಡ್ ನಮೂದಿಸಿ',
      enterOtpSub: '+91 ಗೆ ಕಳುಹಿಸಲಾದ 6-ಅಂಕಿಯ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ',
      otpPlaceholder: '6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ',
      verifyBtn: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪ್ರವೇಶಿಸಿ',
      backBtn: 'ಹಿಂದಕ್ಕೆ',
      simulatedSmsTitle: 'ಎಸ್‌ಎಮ್‌ಎಸ್ ಗೇಟ್‌ವೇ (ಸ್ಥಳೀಯ ನೆಟ್‌ವರ್ಕ್)',
      simulatedSmsMsg: 'ತುರ್ತು ಎಸ್‌ಎಮ್‌ಎಸ್: ನಿಮ್ಮ OTP ಪ್ರವೇಶ ಕೋಡ್',
      invalidPhone: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
      invalidOtp: 'ಅಮಾನ್ಯ ಪರಿಶೀಲನಾ ಕೋಡ್. ಎಸ್‌ಎಮ್‌ಎಸ್ ಗೇಟ್‌ವೇ ಪರಿಶೀಲಿಸಿ.',
      sendingOtp: 'ಪರಿಶೀಲನಾ ಕೋಡ್ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
      verifyingOtp: 'ಕೋಡ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...'
    }
  };

  const labels = t[language] || t.en;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate 10-digit Indian phone number
    const cleanedPhone = phone.trim().replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setError(labels.invalidPhone);
      return;
    }

    setSending(true);

    // Simulate sending OTP
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);
      setSending(false);
      setStep('otp');
      setShowSimulatedSms(true);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanedOtp = otp.trim().replace(/\D/g, '');
    if (cleanedOtp.length !== 6) {
      setError(labels.invalidOtp);
      return;
    }

    setVerifying(true);

    // Verify code
    setTimeout(() => {
      setVerifying(false);
      if (cleanedOtp === sentCode || cleanedOtp === '123456') { // Allow 123456 as universal bypass for ease
        sessionStorage.setItem('health_assistant_auth', 'true');
        onLoginSuccess();
      } else {
        setError(labels.invalidOtp);
      }
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      background: '#060913',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow filters */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.08)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.06)', filter: 'blur(90px)', pointerEvents: 'none' }}></div>

      {/* Login Card Wrapper */}
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '36px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 50px rgba(16, 185, 129, 0.03)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        zIndex: 10
      }}>
        
        {/* Logo and Tagline */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
            animation: 'bounce-subtle 3s infinite ease-in-out'
          }}>
            <Heart size={28} style={{ color: 'white', fill: 'white' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', background: 'linear-gradient(90deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              {labels.title}
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'block', marginTop: '4px', fontWeight: '500' }}>
              {labels.tagline}
            </span>
          </div>
        </div>

        {/* Action Panel Form */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>{labels.enterPhone}</label>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{labels.enterPhoneSub}</span>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: '10px',
                padding: '0 12px',
                marginTop: '6px',
                transition: 'var(--transition-smooth)'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-primary)', marginRight: '8px', borderRight: '1px solid var(--color-glass-border)', paddingRight: '8px' }}>+91</span>
                <Phone size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
                <input
                  type="tel"
                  required
                  placeholder={labels.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px',
                    padding: '12px 0',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{ fontSize: '11px', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} style={{ transform: 'rotate(180deg)' }} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={sending} className="btn btn-primary" style={{ display: 'flex', gap: '8px', padding: '14px' }}>
              <span>{sending ? labels.sendingOtp : labels.sendOtp}</span>
              {!sending && <ArrowRight size={16} />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>{labels.enterOtp}</label>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{labels.enterOtpSub} <strong style={{ color: 'var(--color-primary)' }}>+91 {phone}</strong></span>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: '10px',
                padding: '0 12px',
                marginTop: '6px'
              }}>
                <KeyRound size={16} style={{ color: 'var(--color-text-muted)', marginRight: '8px' }} />
                <input
                  type="text"
                  required
                  placeholder={labels.otpPlaceholder}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px',
                    padding: '12px 0',
                    outline: 'none',
                    letterSpacing: otp ? '4px' : 'normal',
                    fontWeight: otp ? 'bold' : 'normal'
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{ fontSize: '11px', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} style={{ transform: 'rotate(180deg)' }} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => { setStep('phone'); setError(null); }} className="btn btn-secondary" style={{ width: 'auto', padding: '0 16px' }} title={labels.backBtn}>
                <ArrowLeft size={16} />
              </button>
              
              <button type="submit" disabled={verifying} className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
                <span>{verifying ? labels.verifyingOtp : labels.verifyBtn}</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer Warning notice */}
        <div style={{ borderTop: '1px solid var(--color-glass-border)', paddingTop: '16px', fontSize: '10px', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: '1.4' }}>
          <span>Secure authentication gateway. Healthcare records are stored locally on node hubs.</span>
        </div>

      </div>

      {/* Simulated SMS Gateway Notification Banner */}
      {showSimulatedSms && (
        <div className="glass-card" style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '440px',
          padding: '14px 18px',
          borderLeft: '4px solid var(--color-primary)',
          background: '#090f1e',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 100
        }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-primary)', textTransform: 'uppercase', display: 'block' }}>
            {labels.simulatedSmsTitle}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-primary)' }}>
            {labels.simulatedSmsMsg} <strong style={{ color: 'var(--color-accent)', fontSize: '13px', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>{sentCode}</strong> (Or bypass with <code>123456</code>)
          </span>
        </div>
      )}

    </div>
  );
};
