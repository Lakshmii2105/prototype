import { useState } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { OfflineIndicator } from './components/OfflineIndicator';
import { LanguageSelector } from './components/LanguageSelector';
import { HospitalFinder } from './components/HospitalFinder';
import { Chatbot } from './components/Chatbot';
import { VoiceCompanion } from './components/VoiceCompanion';
import { PrescriptionAnalyzer } from './components/PrescriptionAnalyzer';
import { EmergencyAlerts } from './components/EmergencyAlerts';
import { Login } from './components/Login';
import { SplashScreen } from './components/SplashScreen';
import './App.css';

function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('health_assistant_auth') === 'true';
  });

  // Global App State - supporting hi, ta, kn in addition to en, te
  const [isOffline, setIsOffline] = useState<boolean>(true); // Default to offline-first to highlight offline features
  const [language, setLanguage] = useState<'en' | 'te' | 'hi' | 'ta' | 'kn'>('te'); // Default to Telugu
  const [activeTab, setActiveTab] = useState<'voice' | 'chat' | 'prescription' | 'alerts' | 'hospitals' | 'glossary'>('voice');
  const [isModelDownloaded, setIsModelDownloaded] = useState<boolean>(false);
  const [alertActive, setAlertActive] = useState<boolean>(false);

  // Village GPS coordinate simulator
  const [selectedVillage, setSelectedVillage] = useState<string>('Yerraguntla (Village)');
  const [gpsCoords, setGpsCoords] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 14.6343,
    longitude: 78.5309
  });

  const handleLogout = () => {
    sessionStorage.removeItem('health_assistant_auth');
    setIsAuthenticated(false);
  };

  // 1. Show Splash Screen first on mount
  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  // 2. Auth Guard
  if (!isAuthenticated) {
    return (
      <Login
        onLoginSuccess={() => setIsAuthenticated(true)}
        language={language}
      />
    );
  }


  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      language={language}
      setLanguage={setLanguage}
      isOffline={isOffline}
      setIsOffline={setIsOffline}
      onLogout={handleLogout}
    >
      {/* Inner view matching the active tab */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Render Offline Download banner only on appropriate views */}
        {activeTab !== 'glossary' && activeTab !== 'alerts' && activeTab !== 'prescription' && (
          <div style={{ padding: '24px 24px 0 24px' }}>
            <OfflineIndicator
              isOffline={isOffline}
              setIsOffline={setIsOffline}
              isModelDownloaded={isModelDownloaded}
              setIsModelDownloaded={setIsModelDownloaded}
              language={language === 'te' ? 'te' : 'en'} // keep indicator labels in simple english/telugu
            />
          </div>
        )}

        {/* Tab 1: Voice Companion */}
        {activeTab === 'voice' && (
          <VoiceCompanion
            language={language}
            isModelDownloaded={isModelDownloaded}
            triggerEmergencyAlert={() => setAlertActive(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Tab 2: Symptom Checker / Chatbot */}
        {activeTab === 'chat' && (
          <Chatbot
            language={language}
            isOffline={isOffline}
            isModelDownloaded={isModelDownloaded}
            triggerEmergencyAlert={() => setAlertActive(true)}
          />
        )}

        {/* Tab 3: Prescription Analysis */}
        {activeTab === 'prescription' && (
          <PrescriptionAnalyzer
            language={language}
          />
        )}

        {/* Tab 4: Emergency SOS Panel */}
        {activeTab === 'alerts' && (
          <EmergencyAlerts
            language={language}
            alertActive={alertActive}
            setAlertActive={setAlertActive}
          />
        )}

        {/* Tab 5: Nearby Hospital Finder */}
        {activeTab === 'hospitals' && (
          <HospitalFinder
            language={language === 'te' ? 'te' : 'en'}
            selectedVillage={selectedVillage}
            setSelectedVillage={setSelectedVillage}
            gpsCoords={gpsCoords}
            setGpsCoords={setGpsCoords}
            alertActive={alertActive}
            setAlertActive={setAlertActive}
          />
        )}

        {/* Tab 6: Language Translation Tips and Glossary */}
        {activeTab === 'glossary' && (
          <LanguageSelector
            language={language}
            setLanguage={setLanguage}
            showGlossaryOnly={true}
          />
        )}
        
      </div>
    </DashboardLayout>
  );
}

export default App;
