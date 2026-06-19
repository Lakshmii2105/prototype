import React, { useState } from 'react';
import { AlertTriangle, Radio, Phone, ShieldAlert } from 'lucide-react';
import { hospitals } from '../data/hospitals';

interface EmergencyAlertsProps {
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
  alertActive: boolean;
  setAlertActive: (active: boolean) => void;
}

export const EmergencyAlerts: React.FC<EmergencyAlertsProps> = ({
  language,
  alertActive,
  setAlertActive
}) => {
  const [broadcasting, setBroadcasting] = useState(false);
  const [meshLogs, setMeshLogs] = useState<string[]>([]);

  const t = {
    en: {
      title: 'Emergency SOS & Mesh Alerts',
      subtitle: 'Trigger a cellular mesh/SMS alert to all medical staff and primary clinics within a 15km range. Runs offline using peer-to-peer relay nodes.',
      sosBtn: 'Trigger Doctor SOS Alert',
      sosActive: 'Emergency SOS Broadcast Active',
      activeLogs: 'Mesh Communication Log',
      calling: 'Calling...',
      ready: 'System Ready (P2P Mesh Network Live)',
      doctorsAvailable: 'On-Call Local Doctors',
      hospitalsNearby: 'Nearby Hospitals & Helplines',
      govt: 'Govt',
      private: 'Private',
      callNow: 'Call Hotline'
    },
    te: {
      title: 'అత్యవసర SOS & మెష్ అలర్ట్‌లు',
      subtitle: '15 కిలోమీటర్ల పరిధిలోని అన్ని వైద్య సిబ్బందికి మరియు ప్రభుత్వ ఆరోగ్య కేంద్రాలకు ఆఫ్‌లైన్ నెట్‌వర్క్ ద్వారా అత్యవసర సందేశాలు పంపండి.',
      sosBtn: 'వెంటనే డాక్టర్లకి సమాచారం పంపు (SOS)',
      sosActive: 'అత్యవసర SOS సందేశాలు పంపబడుతున్నాయి',
      activeLogs: 'ఆఫ్‌లైన్ కమ్యూనికేషన్ లాగ్',
      calling: 'ఫోన్ కలుపుతున్నాము...',
      ready: 'సిస్టమ్ సిద్ధంగా ఉంది (మెష్ నెట్‌వర్క్ ఆక్టివ్)',
      doctorsAvailable: 'అందుబాటులో గల వైద్యులు',
      hospitalsNearby: 'సమీప ఆసుపత్రులు & హెల్ప్‌లైన్లు',
      govt: 'ప్రభుత్వ',
      private: 'ప్రైవేట్',
      callNow: 'ఫోన్ చేయండి'
    },
    hi: {
      title: 'आपातकालीन एसओएस और मेश अलर्ट',
      subtitle: '15 किमी के दायरे में सभी चिकित्सा कर्मचारियों और प्राथमिक क्लीनिकों को सेलुलर मेश/एसएमएस अलर्ट भेजें। पीयर-टू-पीयर रिले नोड्स का उपयोग करके ऑफ़लाइन चलता है।',
      sosBtn: 'डॉक्टर एसओएस अलर्ट सक्रिय करें',
      sosActive: 'आपातकालीन एसओएस प्रसारण सक्रिय',
      activeLogs: 'मेश संचार लॉग',
      calling: 'कॉल किया जा रहा है...',
      ready: 'प्रणाली तैयार है (P2P मेश नेटवर्क सक्रिय)',
      doctorsAvailable: 'ऑन-कॉलेज स्थानीय डॉक्टर',
      hospitalsNearby: 'नजदीकी अस्पताल और हेल्पलाइन',
      govt: 'सरकारी',
      private: 'निजी',
      callNow: 'हॉटलाइन कॉल करें'
    },
    ta: {
      title: 'அவசரகால SOS & மெஷ் எச்சரிக்கைகள்',
      subtitle: '15 கிமீ சுற்றளவில் உள்ள அனைத்து மருத்துவப் பணியாளர்கள் மற்றும் ஆரம்ப சுகாதார நிலையங்களுக்கு செல்லுலார் மெஷ்/எஸ்எம்எஸ் எச்சரிக்கையை அனுப்பவும். ஆஃப்லைனில் இயங்குகிறது.',
      sosBtn: 'மருத்துவர் SOS எச்சரிக்கையை இயக்கு',
      sosActive: 'அவசர SOS ஒளிபரப்பு செயலில் உள்ளது',
      activeLogs: 'மெஷ் தொடர்பு பதிவுகள்',
      calling: 'அழைக்கிறது...',
      ready: 'கணினி தயார் நிலையில் உள்ளது (P2P மெஷ் நெட்வொர்க்)',
      doctorsAvailable: 'உள்ளூர் மருத்துவர்கள் பட்டியல்',
      hospitalsNearby: 'அருகிலுள்ள மருத்துவமனைகள் & அவசர எண்கள்',
      govt: 'அரசு',
      private: 'தனியார்',
      callNow: 'அழைக்கவும்'
    },
    kn: {
      title: 'ತುರ್ತು SOS ಮತ್ತು ಮೆಶ್ ಅಲರ್ಟ್‌ಗಳು',
      subtitle: '15 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿರುವ ಎಲ್ಲಾ ವೈದ್ಯಕೀಯ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಪ್ರಾಥಮಿಕ ಚಿಕಿತ್ಸಾಲಯಗಳಿಗೆ ಆಫ್‌ಲೈನ್ ಮೆಶ್/ಎಸ್‌ಎಂಎಸ್ ಎಚ್ಚರಿಕೆಯನ್ನು ಕಳುಹಿಸಿ.',
      sosBtn: 'ವೈದ್ಯರ SOS ಅಲರ್ಟ್ ಒತ್ತಿರಿ',
      sosActive: 'ತುರ್ತು SOS ಸಂದೇಶ ರವಾನೆ ಚಾಲ್ತಿಯಲ್ಲಿದೆ',
      activeLogs: 'ಮೆಶ್ ಸಂಪರ್ಕ ದಾಖಲೆಗಳು',
      calling: 'ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      ready: 'ಸಿಸ್ಟಮ್ ಸಿದ್ಧವಾಗಿದೆ (ಮೆಶ್ ನೆಟ್‌ವರ್ಕ್ ಸಕ್ರಿಯ)',
      doctorsAvailable: 'ಕಾರ್ಯನಿರತ ಸ್ಥಳೀಯ ವೈದ್ಯರು',
      hospitalsNearby: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಸಹಾಯವಾಣಿಗಳು',
      govt: 'ಸರ್ಕಾರಿ',
      private: 'ಖಾಸಗಿ',
      callNow: 'ಕರೆ ಮಾಡಿ'
    }
  };

  const labels = t[language] || t.en;

  const triggerSOS = () => {
    setAlertActive(true);
    setBroadcasting(true);
    setMeshLogs([]);

    const logMessages = [
      language === 'te' ? 'ఆఫ్‌లైన్ బ్లూటూత్/లోరా మెష్ ఛానెల్‌ను గుర్తిస్తున్నాము...' : 'Scanning for offline Bluetooth/LoRa mesh channel...',
      language === 'te' ? 'యర్రగుంట్ల నోడ్: ప్యాకెట్లు బ్రాడ్‌కాస్ట్ అవుతున్నాయి...' : 'Node Yerraguntla: Broadcasting emergency data packets...',
      language === 'te' ? 'రోగి జీపీఎస్ వివరాలు జోడించబడ్డాయి (14.6343, 78.5309)...' : 'Appended patient GPS coordinates (14.6343, 78.5309)...',
      language === 'te' ? 'సమీపంలోని 3 క్లినిక్‌ల వైద్యుల మొబైల్స్ కనెక్ట్ అయ్యాయి...' : 'Relaying packets to 3 nearest primary health center nodes...',
      language === 'te' ? 'డా. భాస్కర్ వైద్యాధికారి ఫోన్‌కు సమాచారం చేరింది!' : 'Receipt confirmed by Dr. Bhaskar (Primary Health Officer) via SMS fallback.'
    ];

    let delay = 0;
    logMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setMeshLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        if (idx === logMessages.length - 1) {
          setBroadcasting(false);
        }
      }, delay);
      delay += 800;
    });
  };

  const resetSOS = () => {
    setAlertActive(false);
    setMeshLogs([]);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title Header */}
      <div>
        <h2 style={{ fontSize: '22px', marginBottom: '6px', color: 'var(--color-danger)' }}>
          {labels.title}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', maxWidth: '800px' }}>
          {labels.subtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* SOS Panel */}
        <div className="glass-card" style={{ padding: '30px', textAlign: 'center', border: alertActive ? '2px solid var(--color-danger)' : '1px solid var(--color-glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '320px', gap: '20px' }}>
          
          <button
            onClick={alertActive ? resetSOS : triggerSOS}
            className={`glow-mic ${alertActive ? 'glow-mic-active' : ''}`}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: alertActive ? 'linear-gradient(135deg, var(--color-danger) 0%, #991b1b 100%)' : 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
              border: alertActive ? '4px solid #f87171' : '3px solid var(--color-glass-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              boxShadow: alertActive ? '0 0 40px rgba(239, 68, 68, 0.6)' : '0 10px 25px rgba(0,0,0,0.4)',
              transition: 'var(--transition-bounce)'
            }}
          >
            <AlertTriangle size={36} style={{ color: 'white', animation: alertActive ? 'bounce-subtle 1s infinite' : 'none' }} />
            <span style={{ fontSize: '12px', fontWeight: '800', marginTop: '6px' }}>SOS</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700' }}>
              {alertActive ? labels.sosActive : labels.sosBtn}
            </h4>
            <span style={{ fontSize: '11px', color: alertActive ? 'var(--color-danger)' : 'var(--color-text-muted)', fontWeight: '600' }}>
              {alertActive ? 'SOS BROADCASTING LIVE' : labels.ready}
            </span>
          </div>

          {alertActive && (
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 16px', fontSize: '12px', borderColor: 'var(--color-danger)', color: '#f8fafc' }} onClick={resetSOS}>
              Reset Alert
            </button>
          )}
        </div>

        {/* Transmission logs and status logger */}
        <div className="glass-card" style={{ padding: '20px', height: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-glass-border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio size={16} className={broadcasting ? 'animate-pulse' : ''} style={{ color: broadcasting ? 'var(--color-danger)' : 'var(--color-primary)' }} />
            <span>{labels.activeLogs}</span>
          </h3>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', fontFamily: 'monospace' }}>
            {meshLogs.length === 0 ? (
              <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No active emergency broadcasts. Tap the SOS button to test the offline mesh communication fallback.</span>
            ) : (
              meshLogs.map((log, idx) => (
                <div key={idx} style={{ color: log.includes('confirm') || log.includes('విజయవంతం') ? '#34d399' : 'var(--color-text-secondary)' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
        
        {/* On Call local Doctors list */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} />
            <span>{labels.doctorsAvailable}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hospitals.slice(0, 3).map((h) => (
              h.doctors.map((d, idx) => (
                <div key={`${h.id}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '700' }}>{language === 'en' ? d.name : d.nameTe}</span>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>{language === 'en' ? d.specialty : d.specialtyTe}</span>
                  </div>
                  <a href={`tel:${d.contact}`} className="btn btn-primary" style={{ width: 'auto', padding: '6px 10px', fontSize: '11px' }}>
                    <Phone size={12} />
                  </a>
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Nearby Clinics Directory */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={16} />
            <span>{labels.hospitalsNearby}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hospitals.map((h) => (
              <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', fontSize: '12px', borderLeft: h.type === 'government' ? '3px solid var(--color-primary)' : '3px solid var(--color-secondary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, paddingRight: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: '700', color: '#f8fafc' }}>{language === 'en' ? h.name : h.nameTe}</span>
                    <span className={`badge ${h.type === 'government' ? 'badge-govt' : 'badge-private'}`} style={{ fontSize: '8px', padding: '2px 6px' }}>
                      {h.type === 'government' ? labels.govt : labels.private}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>{language === 'en' ? h.address : h.addressTe}</span>
                </div>
                <a href={`tel:${h.contact}`} className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px', fontSize: '11px', gap: '4px' }}>
                  <Phone size={12} />
                  <span>{labels.callNow}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
