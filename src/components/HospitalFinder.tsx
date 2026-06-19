import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hospitals, villages } from '../data/hospitals';
import type { Hospital } from '../data/hospitals';
import { MapPin, Phone, AlertTriangle, Compass, Navigation, Radio } from 'lucide-react';

// Haversine formula to calculate distance in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(1));
};

// Component to dynamically re-center Leaflet Map
const ChangeMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

interface HospitalFinderProps {
  language: 'en' | 'te';
  selectedVillage: string;
  setSelectedVillage: (name: string) => void;
  gpsCoords: { latitude: number; longitude: number } | null;
  setGpsCoords: (coords: { latitude: number; longitude: number } | null) => void;
  alertActive: boolean;
  setAlertActive: (active: boolean) => void;
}

export const HospitalFinder: React.FC<HospitalFinderProps> = ({
  language,
  selectedVillage,
  setSelectedVillage,
  gpsCoords,
  setGpsCoords,
  alertActive,
  setAlertActive
}) => {
  const [sortedHospitals, setSortedHospitals] = useState<(Hospital & { distance: number })[]>([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertingHospitals, setAlertingHospitals] = useState<string[]>([]);

  // Find currently selected village coordinates
  const currentVillage = villages.find((v) => v.name === selectedVillage) || villages[1];
  const userLat = gpsCoords?.latitude || currentVillage.latitude;
  const userLng = gpsCoords?.longitude || currentVillage.longitude;

  // Recalculate distances and sort whenever location changes
  useEffect(() => {
    const list = hospitals.map((h) => {
      const distance = calculateDistance(userLat, userLng, h.latitude, h.longitude);
      return { ...h, distance };
    });

    // Sort strategy:
    // 1. Priotize Government Clinics (highly critical in low-income rural setups)
    // 2. Sort by distance within that group
    list.sort((a, b) => {
      if (a.type === 'government' && b.type === 'private') return -1;
      if (a.type === 'private' && b.type === 'government') return 1;
      return a.distance - b.distance;
    });

    setSortedHospitals(list);
  }, [userLat, userLng]);

  // Handle manual coordinate simulator change
  const handleVillageChange = (villageName: string) => {
    setSelectedVillage(villageName);
    const v = villages.find((item) => item.name === villageName);
    if (v) {
      setGpsCoords({ latitude: v.latitude, longitude: v.longitude });
    }
  };

  // Trigger Panic/Doctor Alert
  const triggerDoctorAlert = () => {
    setAlertActive(true);
    setAlertSuccess(false);

    // Simulate sending SOS packets via local offline mesh (cellular SMS fallback / local Bluetooth Broadcast)
    // Gather all hospitals within 10km to trigger alerts
    const targetHospIds = sortedHospitals
      .filter((h) => h.distance <= 15)
      .map((h) => h.name);
    setAlertingHospitals(targetHospIds);

    setTimeout(() => {
      setAlertSuccess(true);
    }, 2000);
  };

  const closeAlertModal = () => {
    setAlertActive(false);
    setAlertSuccess(false);
  };

  // Create custom marker icons using Leaflet L.divIcon (glorious design custom markup!)
  const userIcon = L.divIcon({
    html: `<div style="position: relative; width: 20px; height: 20px;">
             <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: #ef4444; opacity: 0.75; transform: scale(1.5); animation: ping 1.5s infinite;"></div>
             <div style="position: absolute; left: 5px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background-color: #ef4444; border: 2px solid white;"></div>
           </div>`,
    className: 'custom-user-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const govtIcon = L.divIcon({
    html: `<div style="position: relative; width: 28px; height: 28px; background: #10b981; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
             <span style="color: white; font-weight: 800; font-size: 16px; line-height: 1; transform: translateY(-1px);">+</span>
           </div>`,
    className: 'custom-govt-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const privateIcon = L.divIcon({
    html: `<div style="position: relative; width: 28px; height: 28px; background: #06b6d4; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
             <span style="color: white; font-weight: 800; font-size: 16px; line-height: 1; transform: translateY(-1px);">+</span>
           </div>`,
    className: 'custom-private-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', flex: 1 }}>
      
      {/* Location Simulation Dropdown */}
      <div className="glass-card" style={{ padding: '12px' }}>
        <label style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '500' }}>
          <Compass size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          {language === 'en' ? 'Simulate Village GPS Location:' : 'గ్రామీణ జీపీఎస్ స్థానం మార్చండి:'}
        </label>
        
        <select
          value={selectedVillage}
          onChange={(e) => handleVillageChange(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-glass-border)',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {villages.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {/* Emergency Doctor Alert Panic Button */}
      <button
        onClick={triggerDoctorAlert}
        className="btn btn-danger pulse-alert"
        style={{
          padding: '16px',
          borderRadius: '16px',
          fontWeight: '800',
          fontSize: '16px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <Radio className="animate-pulse" />
        {language === 'en' ? 'Doctor Emergency SOS' : 'అత్యవసర డాక్టర్ అలర్ట్'}
      </button>

      {/* Map Container */}
      <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-glass-border)' }}>
        <MapContainer
          center={[userLat, userLng]}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          />
          <Marker position={[userLat, userLng]} icon={userIcon}>
            <Popup>
              <div style={{ color: '#000', fontSize: '12px', fontWeight: 'bold' }}>
                {language === 'en' ? 'Your Location' : 'మీరు ఉన్న చోటు'}
              </div>
            </Popup>
          </Marker>

          {hospitals.map((h) => (
            <Marker 
              key={h.id} 
              position={[h.latitude, h.longitude]} 
              icon={h.type === 'government' ? govtIcon : privateIcon}
            >
              <Popup>
                <div style={{ color: '#0f172a', width: '180px', padding: '2px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
                    {language === 'en' ? h.name : h.nameTe}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', margin: '4px 0' }}>
                    {language === 'en' ? h.address : h.addressTe}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={10} /> {h.contact}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          <ChangeMapView center={[userLat, userLng]} />
        </MapContainer>
      </div>

      {/* Hospital List Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)' }}>
          {language === 'en' ? 'Priority Healthcare Directory' : 'వైద్యశాలల జాబితా (ప్రభుత్వ ప్రాధాన్యత)'}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
          {language === 'en' ? 'Showing Closest' : 'సమీపంలో ఉన్నవి'}
        </span>
      </div>

      {/* Hospital Scrolling List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '300px', paddingBottom: '20px' }}>
        {sortedHospitals.map((h) => (
          <div key={h.id} className="glass-card" style={{ padding: '14px', borderLeft: h.type === 'government' ? '4px solid var(--color-primary)' : '4px solid var(--color-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', flex: 1, paddingRight: '8px' }}>
                {language === 'en' ? h.name : h.nameTe}
              </h3>
              <span className={`badge ${h.type === 'government' ? 'badge-govt' : 'badge-private'}`}>
                {h.type === 'government' 
                  ? (language === 'en' ? 'Govt' : 'ప్రభుత్వ') 
                  : (language === 'en' ? 'Private' : 'ప్రైవేట్')}
              </span>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              {language === 'en' ? h.address : h.addressTe}
            </p>

            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', marginBottom: '10px', color: '#f8fafc' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} style={{ color: 'var(--color-primary)' }} />
                <strong>{h.distance} km</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={12} style={{ color: 'var(--color-primary)' }} />
                {h.contact}
              </span>
            </div>

            {/* Doctors List inside Cache */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', fontSize: '11px', marginBottom: '12px' }}>
              <div style={{ fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                {language === 'en' ? 'Doctor Availability:' : 'వైద్యుల అందుబాటు:'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {h.doctors.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {language === 'en' ? d.name : d.nameTe} ({language === 'en' ? d.specialty : d.specialtyTe})
                    </span>
                    <span style={{
                      fontWeight: 'bold',
                      fontSize: '10px',
                      color: d.availability === 'available' ? '#10b981' : d.availability === 'busy' ? '#f59e0b' : '#64748b'
                    }}>
                      {d.availability === 'available' 
                        ? (language === 'en' ? 'Available' : 'ఉన్నారు') 
                        : d.availability === 'busy' 
                        ? (language === 'en' ? 'Busy' : 'బిజీ') 
                        : (language === 'en' ? 'Offline' : 'లేరు')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons sized for low-literacy/stress */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <a 
                href={`tel:${h.contact}`}
                className="btn btn-primary"
                style={{ padding: '8px 12px', fontSize: '12px', flex: 1, textDecoration: 'none' }}
              >
                <Phone size={14} />
                {language === 'en' ? 'Call Now' : 'ఫోన్ చేయండి'}
              </a>
              <button 
                onClick={() => {
                  alert(language === 'en' 
                    ? `Routing to ${h.name} (${h.latitude}, ${h.longitude})` 
                    : `${h.nameTe} కు దారి చూపుతున్నాము (${h.latitude}, ${h.longitude})`);
                }}
                className="btn btn-secondary"
                style={{ padding: '8px 12px', fontSize: '12px', flex: 1 }}
              >
                <Navigation size={14} />
                {language === 'en' ? 'Navigate' : 'దారి చూపించు'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SOS Alert Modal */}
      {alertActive && (
        <div className="alert-overlay">
          <div className="glass-card" style={{ width: '100%', maxWidth: '340px', padding: '24px', border: '2px solid var(--color-danger)', background: '#020617', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid var(--color-danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} className="animate-pulse">
              <AlertTriangle size={32} style={{ color: 'var(--color-danger)' }} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', marginBottom: '8px' }}>
              {language === 'en' ? 'EMERGENCY SOS INITIATED' : 'అత్యవసర కబురు పంపాము'}
            </h3>

            {alertSuccess ? (
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: '#34d399', fontWeight: 'bold' }}>
                  {language === 'en' ? 'Alert Broadcasted!' : 'సమాచారం విజయవంతంగా చేరింది!'}
                </p>
                <p>
                  {language === 'en'
                    ? `Mesh notifications and SMS coordinates sent to doctors at ${alertingHospitals.length} nearest clinics within range.`
                    : `దగ్గరలో గల ${alertingHospitals.length} ఆసుపత్రుల వైద్యులకు మీ జీపీఎస్ వివరాలు పంపించాము.`}
                </p>
                <button className="btn btn-primary" onClick={closeAlertModal} style={{ marginTop: '16px' }}>
                  {language === 'en' ? 'Okay' : 'సరే'}
                </button>
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <p>
                  {language === 'en'
                    ? 'Connecting to offline cellular mesh/SMS relays to broadcast your GPS location...'
                    : 'సిగ్నల్ లేకున్నా ఆఫ్‌లైన్ మెష్ / ఎస్ఎమ్ఎస్ ద్వారా మీ వివరాలు పంపించడానికి ప్రయత్నిస్తున్నాము...'}
                </p>
                <div className="wave-container wave-active" style={{ height: '24px' }}>
                  <div className="wave-bar" style={{ background: 'var(--color-danger)' }}></div>
                  <div className="wave-bar" style={{ background: 'var(--color-danger)' }}></div>
                  <div className="wave-bar" style={{ background: 'var(--color-danger)' }}></div>
                  <div className="wave-bar" style={{ background: 'var(--color-danger)' }}></div>
                  <div className="wave-bar" style={{ background: 'var(--color-danger)' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global CSS for Leaflet and Ping animation */}
      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
