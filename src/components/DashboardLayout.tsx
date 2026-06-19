import React from 'react';
import { Mic, MessageSquare, FileText, AlertTriangle, PhoneCall, BookOpen, Heart, Shield, User, Wifi, WifiOff, LogOut } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: 'voice' | 'chat' | 'prescription' | 'alerts' | 'hospitals' | 'glossary';
  setActiveTab: (tab: 'voice' | 'chat' | 'prescription' | 'alerts' | 'hospitals' | 'glossary') => void;
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
  setLanguage: (lang: 'en' | 'te' | 'hi' | 'ta' | 'kn') => void;
  isOffline: boolean;
  setIsOffline: (state: boolean) => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isOffline,
  setIsOffline,
  onLogout
}) => {
  const menuItems = [
    { id: 'voice', label: language === 'en' ? 'Voice Assistant' : language === 'te' ? 'వాయిస్ సహాయకుడు' : language === 'hi' ? 'आवाज सहायक' : language === 'ta' ? 'குரல் உதவியாளர்' : 'ಧ್ವನಿ ಸಹಾಯಕ', icon: Mic },
    { id: 'chat', label: language === 'en' ? 'Symptom Checker' : language === 'te' ? 'లక్షణాల చాట్‌బాట్' : language === 'hi' ? 'लक्षण जांचकर्ता' : language === 'ta' ? 'அறிகுறி பரிசோதனை' : 'ರೋಗಲಕ್ಷಣ ತಪಾಸಕ', icon: MessageSquare },
    { id: 'prescription', label: language === 'en' ? 'Prescription Analysis' : language === 'te' ? 'ప్రిస్క్రిప్షన్ విశ్లేషణ' : language === 'hi' ? 'पर्ची विश्लेषण' : language === 'ta' ? 'மருந்துச்சீட்டு பகுப்பாய்வு' : 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ವಿಶ್ಲೇಷಣೆ', icon: FileText },
    { id: 'hospitals', label: language === 'en' ? 'Nearby Hospitals' : language === 'te' ? 'సమీప ఆసుపత్రులు' : language === 'hi' ? 'नजदीकी अस्पताल' : language === 'ta' ? 'அருகிலுள்ள மருத்துவமனைகள்' : 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು', icon: PhoneCall },
    { id: 'glossary', label: language === 'en' ? 'Translation & Glossary' : language === 'te' ? 'భాషా నిఘంటువు' : language === 'hi' ? 'अनुवाद और शब्दावली' : language === 'ta' ? 'மொழிபெயர்ப்பு & விளக்கம்' : 'ಅನುವಾದ ಮತ್ತು ಶಬ್ದಕೋಶ', icon: BookOpen },
    { id: 'alerts', label: language === 'en' ? 'Emergency Alerts' : language === 'te' ? 'అత్యవసర అలర్ట్‌లు' : language === 'hi' ? 'आपातकालीन अलर्ट' : language === 'ta' ? 'அவசர எச்சரிக்கைகள்' : 'ತುರ್ತು ಅಲರ್ಟ್‌ಗಳು', icon: AlertTriangle, danger: true }
  ];

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      
      {/* Top Navigation Bar */}
      <header className="dashboard-header" style={{
        height: '70px',
        background: 'rgba(11, 18, 38, 0.85)',
        borderBottom: '1px solid var(--color-glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
        backdropFilter: 'blur(12px)'
      }}>
        
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={20} style={{ color: 'white', fill: 'white' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Rural AI Health Assistant
            </h1>
            <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginTop: '-2px' }}>
              {language === 'en' ? 'Clinical Offline Mesh System' : 'ఆఫ్‌లైన్ వైద్యాధికారి సిస్టమ్'}
            </span>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          
          {/* Online/Offline Status and Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--color-glass-border)' }}>
            {isOffline ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)' }}>
                <WifiOff size={16} />
                <span style={{ fontSize: '12px', fontWeight: '700' }}>
                  {language === 'en' ? 'Offline Mode' : 'ఆఫ్‌లైన్ మోడ్'}
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)' }}>
                <Wifi size={16} className="animate-pulse" />
                <span style={{ fontSize: '12px', fontWeight: '700' }}>
                  {language === 'en' ? 'Online Sync Active' : 'ఆన్‌లైన్ లో ఉంది'}
                </span>
              </div>
            )}
            
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={!isOffline} 
                onChange={(e) => setIsOffline(!e.target.checked)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Integrated Language Selection Bar */}
          <LanguageSelector language={language} setLanguage={setLanguage} />

          {/* Health Worker Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--color-glass-border)', paddingLeft: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={16} style={{ color: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-primary)' }}>A. H. W. Prasad</span>
              <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Role: Health Worker</span>
            </div>
          </div>

        </div>

      </header>

      {/* Main Grid: Sidebar + Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar Nav */}
        <aside className="dashboard-sidebar" style={{
          width: '260px',
          background: 'rgba(11, 18, 38, 0.5)',
          borderRight: '1px solid var(--color-glass-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 12px'
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                let activeBg = 'rgba(16, 185, 129, 0.1)';
                let activeColor = 'var(--color-primary)';
                if (item.danger) {
                  activeBg = 'rgba(239, 68, 68, 0.1)';
                  activeColor = 'var(--color-danger)';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: isActive ? activeBg : 'transparent',
                      color: isActive ? activeColor : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: isActive ? '700' : '500',
                      textAlign: 'left',
                      transition: 'var(--transition-smooth)'
                    }}
                    className="sidebar-btn"
                  >
                    <Icon size={18} style={{ color: isActive ? activeColor : 'var(--color-text-muted)' }} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Log Out Button */}
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 16px',
                borderRadius: '12px',
                border: '1px solid var(--color-glass-border)',
                background: 'rgba(239, 68, 68, 0.05)',
                color: 'var(--color-danger)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'var(--transition-smooth)'
              }}
              className="sidebar-btn-danger"
            >
              <LogOut size={16} />
              <span>{language === 'en' ? 'Log Out' : language === 'te' ? 'లాగ్ అవుట్' : language === 'hi' ? 'लॉग आउट' : language === 'ta' ? 'வெளியேறு' : 'ಲಾಗ್ ಔಟ್'}</span>
            </button>

            {/* Sidebar Footer Info */}
            <div style={{
              background: 'rgba(0,0,0,0.15)',
              border: '1px solid var(--color-glass-border)',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              lineHeight: '1.4'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '4px' }}>
                <Shield size={12} />
                <span>Secure Offline System</span>
              </div>
              <span>Encrypted SQLite local database cache active. SQLite sync logs are safely cached.</span>
            </div>
          </div>

        </aside>

        {/* Content Workspace */}
        <main className="dashboard-content" style={{
          flex: 1,
          overflowY: 'auto',
          background: 'radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.1) 0px, transparent 100%)',
          position: 'relative'
        }}>
          {children}
        </main>

      </div>

    </div>
  );
};
