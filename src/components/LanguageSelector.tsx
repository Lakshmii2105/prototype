import React from 'react';
import { teluguGlossary } from '../data/teluguGlossary';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
  setLanguage: (lang: 'en' | 'te' | 'hi' | 'ta' | 'kn') => void;
  showGlossaryOnly?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
  showGlossaryOnly = false
}) => {
  const t = {
    en: {
      title: 'Colloquial Translation & Glossary',
      subtitle: 'This utility lists textbook/official literal terms versus everyday spoken phrases native to rural communities for clear clinical communication.',
      selectLang: 'Select Language:',
      literal: 'Literal Translation (Stiff/Unclear)',
      everyday: 'Everyday Spoken (Rural Context)',
      why: 'Why this phrasing is preferred'
    },
    te: {
      title: 'నిత్య జీవిత తెలుగు నిఘంటువు',
      subtitle: 'పుస్తకాల్లో ఉండే కఠినమైన భాష కాకుండా గ్రామాల్లో ప్రజలు సులభంగా మాట్లాడుకునే భాషా ప్రయోగాల పట్టిక.',
      selectLang: 'భాషను ఎంచుకోండి:',
      literal: 'పుస్తక అనువాదం (అర్థం కావడం కష్టం)',
      everyday: 'వాడుక భాష (గ్రామీణ ప్రజలు వాడేది)',
      why: 'ఎందుకు ఈ పదం వాడతారు'
    },
    hi: {
      title: 'व्यावहारिक अनुवाद और शब्दावली',
      subtitle: 'यह उपयोगिता ग्रामीण समुदायों के लिए स्पष्ट नैदानिक संचार के लिए पाठ्यपुस्तक/आधिकारिक शब्दों बनाम रोजमर्रा के बोले जाने वाले वाक्यांशों को सूचीबद्ध करती है।',
      selectLang: 'भाषा चुनें:',
      literal: 'किताबी अनुवाद (कठिन/अस्पष्ट)',
      everyday: 'आम बोलचाल (ग्रामीण संदर्भ)',
      why: 'यह वाक्यांश क्यों पसंद किया जाता है'
    },
    ta: {
      title: 'பேச்சுவழக்கு மொழிபெயர்ப்பு மற்றும் சொற்களஞ்சியம்',
      subtitle: 'இந்தக் கருவி பாடப்புத்தக/அதிகாரப்பூர்வ சொற்களையும், கிராமப்புற சமூகங்கள் எளிதாகப் புரிந்து கொள்ளும் அன்றாட பேச்சுவழக்கு சொற்களையும் ஒப்பிட்டு விளக்குகிறது.',
      selectLang: 'மொழியைத் தேர்ந்தெடுக்கவும்:',
      literal: 'அதிகாரப்பூர்வ மொழிபெயர்ப்பு (புரிந்துகொள்ள கடினமானது)',
      everyday: 'அன்றாட பேச்சுவழக்கு (கிராமப்புற சூழல்)',
      why: 'ஏன் இந்த வார்த்தை விரும்பப்படுகிறது'
    },
    kn: {
      title: 'ಆಡುಭಾಷೆಯ ಅನುವಾದ ಮತ್ತು ಶಬ್ದಕೋಶ',
      subtitle: 'ಈ ಉಪಯುಕ್ತತೆಯು ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ಜನರಿಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವಂತಹ ದೈನಂದಿನ ಆಡುಭಾಷೆಯ ಪದಗಳನ್ನು ಪುಸ್ತಕದ ಕಠಿಣ ಪದಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ ವಿವರಿಸುತ್ತದೆ.',
      selectLang: 'ಭಾಷೆ ಆರಿಸಿ:',
      literal: 'ಪುಸ್ತಕದ ಅನುವಾದ (ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಕಷ್ಟ)',
      everyday: 'ದೈನಂದಿನ ಆಡುಭಾಷೆ (ಗ್ರಾಮೀಣ ಸಂದರ್ಭ)',
      why: 'ಏಕೆ ಈ ಪದವನ್ನು ಬಳಸಲಾಗುತ್ತದೆ'
    }
  };

  const labels = t[language] || t.en;

  if (showGlossaryOnly) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', height: '100%' }}>
        <div>
          <h2 style={{ fontSize: '22px', marginBottom: '6px', color: 'var(--color-primary)' }}>
            {labels.title}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', maxWidth: '800px' }}>
            {labels.subtitle}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px', overflowY: 'auto', flex: 1, paddingBottom: '30px' }}>
          {teluguGlossary.map((item, index) => (
            <div key={index} className="glass-card" style={{ padding: '16px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: '700', color: 'var(--color-text-primary)', fontSize: '14px', borderBottom: '1px solid var(--color-glass-border)', paddingBottom: '6px' }}>
                English: {item.english}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                  <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {labels.literal}
                  </span>
                  <span style={{ fontWeight: '600', color: '#f8fafc', fontSize: '13px' }}>{item.literal}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
                    ({item.literalPronunciation})
                  </span>
                </div>

                <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {labels.everyday}
                  </span>
                  <span style={{ fontWeight: '700', color: '#34d399', fontSize: '13px' }}>{item.everyday}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
                    ({item.everydayPronunciation})
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', background: 'rgba(0,0,0,0.15)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid var(--color-secondary)' }}>
                <strong>Why:</strong> {item.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const langs: { code: 'en' | 'te' | 'hi' | 'ta' | 'kn'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        <Languages size={16} style={{ color: 'var(--color-primary)' }} />
        <span>{labels.selectLang}</span>
      </div>

      <div style={{ display: 'flex', gap: '6px', background: 'rgba(2, 6, 23, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}>
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: language === l.code ? 'var(--color-primary)' : 'transparent',
              color: language === l.code ? 'white' : 'var(--color-text-secondary)',
              transition: 'var(--transition-smooth)'
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};
