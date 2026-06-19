import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, Download } from 'lucide-react';

interface OfflineIndicatorProps {
  isOffline: boolean;
  setIsOffline: (state: boolean) => void;
  isModelDownloaded: boolean;
  setIsModelDownloaded: (state: boolean) => void;
  language: 'en' | 'te';
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOffline,
  setIsOffline,
  isModelDownloaded,
  setIsModelDownloaded,
  language
}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Never');

  const startDownload = () => {
    setIsDownloading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsModelDownloaded(true);
        setIsDownloading(false);
      }
    }, 300);
  };

  const startSync = () => {
    if (isOffline) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1500);
  };

  return (
    <div className="glass-card" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Network toggle and sync */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isOffline ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
              <WifiOff size={18} />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                {language === 'en' ? 'Offline Mode' : 'ఆఫ్‌లైన్ మోడ్'}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
              <Wifi size={18} />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                {language === 'en' ? 'Online Mode' : 'ఆన్‌లైన్ మోడ్'}
              </span>
            </div>
          )}
        </div>

        {/* Custom Toggle Switch */}
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={!isOffline} 
            onChange={(e) => setIsOffline(!e.target.checked)} 
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {/* Model Download status (TinyLlama-1.1B) */}
      <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--color-glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            {language === 'en' ? 'On-Device AI Model (TinyLlama)' : 'ఆన్-డివైస్ ఏఐ మోడల్ (TinyLlama)'}
          </span>
          {isModelDownloaded ? (
            <span style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
              <CheckCircle size={12} /> {language === 'en' ? 'Ready (Offline)' : 'సిద్ధంగా ఉంది'}
            </span>
          ) : (
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold' }}>
              {language === 'en' ? 'Not Downloaded' : 'డౌన్‌లోడ్ కాలేదు'}
            </span>
          )}
        </div>

        {!isModelDownloaded && (
          <div>
            {isDownloading ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>
                  <span>{language === 'en' ? 'Downloading Model (850 MB)...' : 'మోడల్ డౌన్‌లోడ్ అవుతోంది...'}</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${downloadProgress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', transition: 'width 0.2s' }}></div>
                </div>
              </div>
            ) : (
              <button 
                className="btn btn-primary" 
                style={{ padding: '6px 12px', fontSize: '11px', gap: '4px' }}
                onClick={startDownload}
                disabled={isOffline}
              >
                <Download size={12} />
                {isOffline 
                  ? (language === 'en' ? 'Connect Online to Download' : 'డౌన్‌లోడ్ కొరకు ఆన్‌లైన్ వెళ్ళండి') 
                  : (language === 'en' ? 'Download Model (Free over Wi-Fi)' : 'మోడల్ డౌన్‌లోడ్ చేయండి')}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Database sync status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {language === 'en' ? 'Local Hospital Cache Sync' : 'ఆసుపత్రి సమాచార సింక్'}
          </span>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>
            {language === 'en' ? `Last Synced: ${lastSyncTime}` : `చివరి సింక్: ${lastSyncTime}`}
          </span>
        </div>

        <button
          onClick={startSync}
          disabled={isOffline || isSyncing}
          style={{
            background: 'none',
            border: 'none',
            color: isOffline ? 'var(--color-text-muted)' : 'var(--color-primary)',
            cursor: isOffline ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600',
            fontSize: '11px'
          }}
        >
          <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} style={{ animation: isSyncing ? 'spin 1.5s linear infinite' : 'none' }} />
          {isSyncing ? (language === 'en' ? 'Syncing...' : 'సింక్ అవుతోంది...') : (language === 'en' ? 'Sync Now' : 'ఇప్పుడే సింక్ చేయి')}
        </button>
      </div>

      {/* Spin animation styles in JS if tailwind spin class is not present */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
