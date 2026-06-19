import React, { useState } from 'react';
import { Upload, FileText, Pill, Calendar, Clock, Apple, Check, ShieldAlert } from 'lucide-react';

interface PrescriptionAnalyzerProps {
  language: 'en' | 'te' | 'hi' | 'ta' | 'kn';
}

interface MedicineInfo {
  name: string;
  nameLocal?: string;
  type: string;
  dosage: string;
  dosageSchedule: { morning: number; noon: number; evening: number; night: number };
  timing: string; // before/after food
  timingLocal?: string;
  duration: string;
  durationLocal?: string;
  sideEffects: string;
  sideEffectsLocal?: string;
  foodAdvice: string;
  foodAdviceLocal?: string;
}

export const PrescriptionAnalyzer: React.FC<PrescriptionAnalyzerProps> = ({ language }) => {
  const [fileAttached, setFileAttached] = useState(false);
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [reminderDate, setReminderDate] = useState('');

  const t = {
    en: {
      title: 'Doctor Prescription Analysis',
      subtitle: 'Upload a clear image of a doctor\'s handwritten or printed prescription to extract medicines, timing details, precautions, and dietary recommendations.',
      uploadBox: 'Click to upload or drag & drop prescription image (JPG, PNG)',
      sampleBtn: 'Load Sample Prescription',
      analyzingText: 'Processing image and running OCR analysis...',
      extractedOcr: 'Prescription OCR (Extracted Text)',
      extractedMed: 'Extracted Medications',
      dosageTitle: 'Medication Dosage Schedule',
      sideEffectsTitle: 'Precautions & Side Effects',
      foodTitle: 'Dietary & Food Recommendations',
      reminderTitle: 'Set Follow-up Visit Reminder',
      reminderBtn: 'Set Reminder',
      reminderSuccess: 'Reminder set successfully!',
      medicines: 'Medicines',
      schedule: 'Schedule',
      timing: 'Timing',
      duration: 'Duration',
      morning: 'Morning',
      noon: 'Noon',
      evening: 'Evening',
      night: 'Night',
      beforeFood: 'Before Food',
      afterFood: 'After Food'
    },
    te: {
      title: 'డాక్టర్ ప్రిస్క్రిప్షన్ విశ్లేషణ',
      subtitle: 'వైద్యులు రాసిచ్చిన ప్రిస్క్రిప్షన్ ఫొటోను అప్‌లోడ్ చేసి మందులు, వాడాల్సిన వేళలు, జాగ్రత్తలు మరియు ఆహార నియమాలను తెలుసుకోండి.',
      uploadBox: 'ప్రిస్క్రిప్షన్ ఫొటోను అప్‌లోడ్ చేయడానికి ఇక్కడ క్లిక్ చేయండి (JPG, PNG)',
      sampleBtn: 'నమూనా ప్రిస్క్రిప్షన్ చూడండి',
      analyzingText: 'ఫొటోను స్కాన్ చేసి విశ్లేషిస్తున్నాము...',
      extractedOcr: 'ప్రిస్క్రిప్షన్ లోని రాత (గుర్తించిన వచనం)',
      extractedMed: 'గుర్తించబడిన మందులు',
      dosageTitle: 'మందులు వేసుకోవాల్సిన సమయ పట్టిక',
      sideEffectsTitle: 'జాగ్రత్తలు & దుష్ప్రభావాలు (Side Effects)',
      foodTitle: 'ఆహార మరియు పథ్య నియమాలు',
      reminderTitle: 'డాక్టర్ తదుపరి సందర్శన రిమైండర్',
      reminderBtn: 'రిమైండర్ సెట్ చేయి',
      reminderSuccess: 'రిమైండర్ విజయవంతంగా సెట్ చేయబడింది!',
      medicines: 'మందులు',
      schedule: 'సమయాలు',
      timing: 'ఎప్పుడు వేసుకోవాలి',
      duration: 'ఎన్ని రోజులు',
      morning: 'ఉదయం',
      noon: 'మధ్యాహ్నం',
      evening: 'సాయంత్రం',
      night: 'రాత్రి',
      beforeFood: 'ఆహారానికి ముందు',
      afterFood: 'ఆహారం తర్వాత'
    },
    hi: {
      title: 'डॉक्टर पर्ची (प्रिस्क्रिप्शन) विश्लेषण',
      subtitle: 'दवाइयों, खुराक के समय, सावधानियों और आहार संबंधी सिफारिशों को निकालने के लिए डॉक्टर के पर्चे की एक स्पष्ट छवि अपलोड करें।',
      uploadBox: 'अपलोड करने के लिए क्लिक करें या प्रिस्क्रिप्शन छवि खींचकर लाएं (JPG, PNG)',
      sampleBtn: 'नमूना पर्ची लोड करें',
      analyzingText: 'छवि का प्रसंस्करण और ओसीआर विश्लेषण चल रहा है...',
      extractedOcr: 'पर्ची ओसीआर (निकाला गया टेक्स्ट)',
      extractedMed: 'निकाली गई दवाएं',
      dosageTitle: 'दवा खुराक अनुसूची',
      sideEffectsTitle: 'सावधानियां और दुष्प्रभाव',
      foodTitle: 'आहार और भोजन संबंधी सिफारिशें',
      reminderTitle: 'फॉलो-अप विज़िट अनुस्मारक सेट करें',
      reminderBtn: 'अनुस्मारक सेट करें',
      reminderSuccess: 'अनुस्मारक सफलतापूर्वक सेट किया गया!',
      medicines: 'दवाइयां',
      schedule: 'अनुसूची',
      timing: 'समय',
      duration: 'अवधि',
      morning: 'सुबह',
      noon: 'दोपहर',
      evening: 'शाम',
      night: 'रात',
      beforeFood: 'भोजन से पहले',
      afterFood: 'भोजन के बाद'
    },
    ta: {
      title: 'மருத்துவர் மருந்துச்சீட்டு பகுப்பாய்வு',
      subtitle: 'மருந்துச்சீட்டின் தெளிவான புகைப்படத்தைப் பதிவேற்றி, மருந்துகள், உட்கொள்ளும் நேரங்கள், எச்சரிக்கைகள் மற்றும் உணவுப் பரிந்துரைகளைப் பெறுங்கள்.',
      uploadBox: 'மருந்துச்சீட்டு புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும் (JPG, PNG)',
      sampleBtn: 'மாதிரி மருந்துச்சீட்டைப் பார்க்கவும்',
      analyzingText: 'புகைப்படத்தை ஸ்கேன் செய்து பகுப்பாய்வு செய்கிறது...',
      extractedOcr: 'மருந்துச்சீட்டு உரை (கண்டறியப்பட்ட சொற்கள்)',
      extractedMed: 'கண்டறியப்பட்ட மருந்துகள்',
      dosageTitle: 'மருந்து உட்கொள்ளும் கால அட்டவணை',
      sideEffectsTitle: 'முன்னெச்சரிக்கைகள் & பக்கவிளைவுகள்',
      foodTitle: 'உணவு மற்றும் பத்தியப் பரிந்துரைகள்',
      reminderTitle: 'அடுத்த மருத்துவ வருகை நினைவூட்டல்',
      reminderBtn: 'நினைவூட்டல் அமை',
      reminderSuccess: 'நினைவூட்டல் வெற்றிகரமாக அமைக்கப்பட்டது!',
      medicines: 'மருந்துகள்',
      schedule: 'அட்டவணை',
      timing: 'நேரம்',
      duration: 'கால அளவு',
      morning: 'காலை',
      noon: 'மதியம்',
      evening: 'மாலை',
      night: 'இரவு',
      beforeFood: 'உணவுக்கு முன்',
      afterFood: 'உணவுக்குப் பின்'
    },
    kn: {
      title: 'ವೈದ್ಯರ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ವಿಶ್ಲೇಷಣೆ',
      subtitle: 'ಔಷಧಿಗಳು, ಸೇವನೆಯ ಸಮಯ, ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಆಹಾರ ಪಥ್ಯದ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ವೈದ್ಯರು ನೀಡಿದ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
      uploadBox: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ (JPG, PNG)',
      sampleBtn: 'ಮಾದರಿ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಲೋಡ್ ಮಾಡಿ',
      analyzingText: 'ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      extractedOcr: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪಠ್ಯ (ಚಿತ್ರದಿಂದ ಪಡೆದದ್ದು)',
      extractedMed: 'ಗುರುತಿಸಲಾದ ಔಷಧಿಗಳು',
      dosageTitle: 'ಔಷಧಿ ಸೇವನೆಯ ವೇಳಾಪಟ್ಟಿ',
      sideEffectsTitle: 'ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಅಡ್ಡಪರಿಣಾಮಗಳು',
      foodTitle: 'ಆಹಾರ ಮತ್ತು ಪಥ್ಯದ ಶಿಫಾರಸುಗಳು',
      reminderTitle: 'ವೈದ್ಯರ ಮುಂದಿನ ಭೇಟಿಗಾಗಿ ಜ್ಞಾಪನೆ',
      reminderBtn: 'ಜ್ಞಾಪನೆ ಹೊಂದಿಸಿ',
      reminderSuccess: 'ಜ್ಞಾಪನೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಹೊಂದಿಸಲಾಗಿದೆ!',
      medicines: 'ಔಷಧಿಗಳು',
      schedule: 'ವೇಳಾಪಟ್ಟಿ',
      timing: 'ಸಮಯ',
      duration: 'ಅವಧಿ',
      morning: 'ಬೆಳಗ್ಗೆ',
      noon: 'ಮಧ್ಯಾಹ್ನ',
      evening: 'ಸಂಜೆ',
      night: 'ರಾತ್ರಿ',
      beforeFood: 'ಊಟಕ್ಕೆ ಮುಂಚೆ',
      afterFood: 'ಊಟದ ನಂತರ'
    }
  };

  const labels = t[language] || t.en;

  const mockOcrText = `
APEX FAMILY CLINIC
Dr. A. K. Sharma, MD (Medicine)
Reg No: 58291-A
Date: 18-06-2026

Patient Name: Ramesh G.    Age: 48    Gender: M

Diagnosis: Hypertension, Mild Upper Respiratory Infection

Rx:
1. Tab. Telmisartan 40mg ------ 1 - 0 - 0 ------ After Breakfast (30 Days)
2. Cap. Amoxicillin 500mg ----- 1 - 1 - 1 ------ After Food (5 Days)
3. Tab. Cetirizine 10mg ------- 0 - 0 - 1 ------ Before Bedtime (5 Days)
4. Syrup CoughRelief ---------- 1 tsp ---------- Thrice daily (5 Days)

Follow up in 10 Days.
`;

  const extractedMedicines: MedicineInfo[] = [
    {
      name: 'Telmisartan 40mg',
      nameLocal: language === 'te' ? 'టెల్మిసార్టాన్ 40mg (రక్తపోటు మందు)' : language === 'hi' ? 'टेल्मिसार्टन 40mg (ब्लड प्रेशर की दवा)' : language === 'ta' ? 'டெல்மிசார்டன் 40mg (இரத்த அழுத்த மருந்து)' : language === 'kn' ? 'ಟೆಲ್ಮಿಸಾರ್ಟನ್ 40mg (ರಕ್ತದೊತ್ತಡದ ಔಷಧಿ)' : 'Telmisartan 40mg (BP Medication)',
      type: 'Tablet',
      dosage: '40mg',
      dosageSchedule: { morning: 1, noon: 0, evening: 0, night: 0 },
      timing: labels.afterFood,
      timingLocal: language === 'te' ? 'ఉదయం టిఫిన్ తర్వాత' : language === 'hi' ? 'सुबह नाश्ते के बाद' : language === 'ta' ? 'காலை உணவுக்குப் பின்' : language === 'kn' ? 'ಬೆಳಗ್ಗಿನ ಉಪಾಹಾರದ ನಂತರ' : 'After Breakfast',
      duration: '30 Days',
      durationLocal: language === 'te' ? '30 రోజులు' : language === 'hi' ? '30 दिन' : language === 'ta' ? '30 நாட்கள்' : language === 'kn' ? '30 ದಿನಗಳು' : '30 Days',
      sideEffects: 'Dizziness, headache, mild fatigue. Do not stop suddenly.',
      sideEffectsLocal: language === 'te' ? 'తలతిరగడం, తలనొప్పి, స్వల్ప అలసట. ఒక్కసారిగా ఆపకూడదు.' : language === 'hi' ? 'चक्कर आना, सिरदर्द, हल्की थकान। दवा अचानक बंद न करें।' : language === 'ta' ? 'தலைச்சுற்றல், தலைவலி, லேசான சோர்வு. திடீரென நிறுத்தக் கூடாது.' : language === 'kn' ? 'ತಲೆತಿರುಗುವಿಕೆ, ತಲೆನೋವು, ಸೌಮ್ಯ ಆಯಾಸ. ತಕ್ಷಣ ನಿಲ್ಲಿಸಬೇಡಿ.' : undefined,
      foodAdvice: 'Take at a fixed time daily. Avoid high potassium foods like bananas in excessive quantities.',
      foodAdviceLocal: language === 'te' ? 'ప్రతిరోజు ఒకే సమయానికి వేసుకోండి. అరటిపండ్లు వంటి పొటాషియం ఎక్కువ గల ఆహారం పరిమितంగా తీసుకోండి.' : language === 'hi' ? 'प्रतिदिन एक निश्चित समय पर लें। केले जैसी उच्च पोटेशियम वाली चीजों का अधिक सेवन न करें।' : language === 'ta' ? 'தினமும் ஒரு குறிப்பிட்ட நேரத்தில் உட்கொள்ளவும். வாழைப்பழம் போன்ற பொட்டாசியம் அதிகம் உள்ள உணவுகளைத் தவிர்க்கவும்.' : language === 'kn' ? 'ಪ್ರತಿದಿನ ಒಂದೇ ನಿಗದಿತ ಸಮಯಕ್ಕೆ ತೆಗೆದುಕೊಳ್ಳಿ. ಬಾಳೆಹಣ್ಣಿನಂತಹ ಪೊಟ್ಯಾಸಿಯಮ್ ಹೆಚ್ಚಿರುವ ಆಹಾರವನ್ನು ಮಿತವಾಗಿ ಸೇವಿಸಿ.' : undefined
    },
    {
      name: 'Amoxicillin 500mg',
      nameLocal: language === 'te' ? 'అమోక్సిసిలిన్ 500mg (యాంటీబయాటిక్)' : language === 'hi' ? 'अमोक्सिसिलिन 500mg (एंटीबायोटिक)' : language === 'ta' ? 'அமோக்சிசிலின் 500mg (ஆன்டிபயாடிக்)' : language === 'kn' ? 'ಅಮೋಕ್ಸಿಸಿಲಿನ್ 500mg (ಆಂಟಿಬಯೋಟಿಕ್)' : 'Amoxicillin 500mg (Antibiotic)',
      type: 'Capsule',
      dosage: '500mg',
      dosageSchedule: { morning: 1, noon: 1, evening: 0, night: 1 },
      timing: labels.afterFood,
      timingLocal: language === 'te' ? 'ఆహారం తర్వాత' : language === 'hi' ? 'भोजन के बाद' : language === 'ta' ? 'உணவுக்குப் பின்' : language === 'kn' ? 'ಊಟದ ನಂತರ' : 'After Food',
      duration: '5 Days',
      durationLocal: language === 'te' ? '5 రోజులు' : language === 'hi' ? '5 दिन' : language === 'ta' ? '5 நாட்கள்' : language === 'kn' ? '5 ದಿನಗಳು' : '5 Days',
      sideEffects: 'Mild diarrhea, nausea, stomach upset. Finish the full 5-day course.',
      sideEffectsLocal: language === 'te' ? 'విరేచనాలు, వికారం, కడుపు ఉబ్బరం. 5 రోజుల కోర్సు పూర్తిగా వాడాలి.' : language === 'hi' ? 'हल्के दस्त, मतली, पेट खराब होना। 5 दिनों का पूरा कोर्स समाप्त करें।' : language === 'ta' ? 'லேசான வயிற்றுப்போக்கு, குமட்டல், வயிறு கோளாறு. 5 நாட்கள் முழுமையாக எடுத்துக்கொள்ள வேண்டும்.' : language === 'kn' ? 'ಸೌಮ್ಯ ಅತಿಸಾರ, ವಾಕರಿಕೆ. 5 ದಿನಗಳ ಕೋರ್ಸ್ ಅನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಮುಗಿಸಿ.' : undefined,
      foodAdvice: 'Take with plenty of water. Yoghurt or buttermilk helps protect stomach lining.',
      foodAdviceLocal: language === 'te' ? 'ఎక్కువ మంచి నీటితో మింగండి. మజ్జిగ లేదా పెరుగు తోడుగా తీసుకుంటే కడుపుకు మంచిది.' : language === 'hi' ? 'खूब पानी के साथ लें। दही या छाछ पेट की परत की रक्षा करने में मदद करती है।' : language === 'ta' ? 'அதிக அளவு தண்ணீருடன் எடுத்துக் கொள்ளவும். தயிர் அல்லது மோர் குடிப்பது வயிற்றுக்கு நல்லது.' : language === 'kn' ? 'ಸಾಕಷ್ಟು ನೀರಿನೊಂದಿಗೆ ತೆಗೆದುಕೊಳ್ಳಿ. ಮೊಸರು ಅಥವಾ ಮಜ್ಜಿಗೆ ಸೇವನೆ ಹೊಟ್ಟೆಗೆ ಒಳ್ಳೆಯದು.' : undefined
    },
    {
      name: 'Cetirizine 10mg',
      nameLocal: language === 'te' ? 'సెటిరిజిన్ 10mg (జలుబు/అలర్జీ మందు)' : language === 'hi' ? 'सिटिरिज़िन 10mg (एलर्जी की दवा)' : language === 'ta' ? 'செட்டிரிசின் 10mg (அலற்சி மருந்து)' : language === 'kn' ? 'ಸೆಟಿರಿಜಿನ್ 10mg (ಅಲರ್ಜಿ ಔಷಧಿ)' : 'Cetirizine 10mg (Anti-Allergic)',
      type: 'Tablet',
      dosage: '10mg',
      dosageSchedule: { morning: 0, noon: 0, evening: 0, night: 1 },
      timing: labels.beforeFood,
      timingLocal: language === 'te' ? 'రాత్రి పడుకునే ముందు' : language === 'hi' ? 'रात सोने से पहले' : language === 'ta' ? 'இரவு தூங்குவதற்கு முன்' : language === 'kn' ? 'ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ' : 'Before Bedtime',
      duration: '5 Days',
      durationLocal: language === 'te' ? '5 రోజులు' : language === 'hi' ? '5 दिन' : language === 'ta' ? '5 நாட்கள்' : language === 'kn' ? '5 ದಿನಗಳು' : '5 Days',
      sideEffects: 'Causes sleepiness/drowsiness, dry mouth. Avoid operating machines.',
      sideEffectsLocal: language === 'te' ? 'మగత (నిద్రమబ్బు), నోరు ఎండిపోవడం. బండి నడపడం చేయొద్దు.' : language === 'hi' ? 'नींद आना, मुंह सूखना। भारी मशीनरी चलाने या ड्राइविंग से बचें।' : language === 'ta' ? 'தூக்கக் கலக்கம், வாய் வறட்சி ஏற்படும். வாகனம் ஓட்டுவதைத் தவிர்க்கவும்.' : language === 'kn' ? 'ಮಂಪರು (ನಿದ್ದೆ ಮಜ್ಜಿಗೆ), ಬಾಯಿ ಒಣಗುವುದು. ಚಾಲನೆ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.' : undefined,
      foodAdvice: 'Take with or without food. Avoid alcohol completely.',
      foodAdviceLocal: language === 'te' ? 'ఆహారంతో సంబంధం లేదు. ఆల్కహాల్/మద్యం అలవాటు ఉంటే అస్సలు తీసుకోకూడదు.' : language === 'hi' ? 'भोजन के साथ या बिना लिया जा सकता है। शराब के सेवन से पूरी तरह बचें।' : language === 'ta' ? 'உணவுடனோ அல்லது இல்லாமலோ எடுத்துக்கொள்ளலாம். மது அருந்துவதைத் தவிர்க்கவும்.' : language === 'kn' ? 'ಆಹಾರದೊಂದಿಗೆ ಅಥವಾ ಇಲ್ಲದೆ ತೆಗೆದುಕೊಳ್ಳಬಹುದು. ಮದ್ಯಪಾನವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಪ್ಪಿಸಿ.' : undefined
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFileAttached(true);
      triggerAnalysis();
    }
  };

  const triggerAnalysis = () => {
    setAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2500); // simulate network/local parsing latency
  };

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reminderDate) {
      setReminderSet(true);
      setTimeout(() => setReminderSet(false), 4000);
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Introduction Header */}
      <div>
        <h2 style={{ fontSize: '22px', marginBottom: '6px', color: 'var(--color-primary)' }}>
          {labels.title}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', maxWidth: '800px' }}>
          {labels.subtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Upload Container Panel */}
        <div className="glass-card" style={{ padding: '30px', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px', gap: '16px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-primary)' }}>
            <Upload style={{ color: 'var(--color-primary)' }} size={28} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              {fileAttached ? fileName : labels.uploadBox}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Supports JPG, PNG, PDF up to 10MB</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <label style={{ display: 'inline-block', background: 'var(--color-primary)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              Choose File
              <input type="file" onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
            </label>
            
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px', fontSize: '12px' }} onClick={() => {
              setFileName('sample_prescription.png');
              setFileAttached(true);
              triggerAnalysis();
            }}>
              {labels.sampleBtn}
            </button>
          </div>
        </div>

        {/* Analyzing / Simulated OCR Panel */}
        <div>
          {analyzing ? (
            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', gap: '12px' }}>
              <Clock className="animate-spin" style={{ color: 'var(--color-secondary)' }} size={32} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>{labels.analyzingText}</span>
              <div style={{ width: '200px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'var(--color-primary)', borderRadius: '3px' }} className="animate-pulse"></div>
              </div>
            </div>
          ) : showResults ? (
            <div className="glass-card" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--color-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                <FileText size={14} />
                <span>{labels.extractedOcr}</span>
              </div>
              <pre style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.4',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                maxHeight: '180px',
                padding: '10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px'
              }}>
                {mockOcrText}
              </pre>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', color: 'var(--color-text-muted)' }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <span style={{ fontSize: '13px' }}>Upload a prescription to display the extraction results</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Results Grid Container */}
      {showResults && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Medications schedule card */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-primary)' }}>
              <Pill size={18} />
              <span>{labels.dosageTitle}</span>
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-glass-border)', color: 'var(--color-text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>{labels.medicines}</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>{labels.morning}</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>{labels.noon}</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>{labels.evening}</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>{labels.night}</th>
                    <th style={{ padding: '12px' }}>{labels.timing}</th>
                    <th style={{ padding: '12px' }}>{labels.duration}</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedMedicines.map((m, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                      <td style={{ padding: '12px', fontWeight: '700' }}>{m.nameLocal || m.name}</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: m.dosageSchedule.morning ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
                        {m.dosageSchedule.morning ? '1' : '-'}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', color: m.dosageSchedule.noon ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
                        {m.dosageSchedule.noon ? '1' : '-'}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', color: m.dosageSchedule.evening ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
                        {m.dosageSchedule.evening ? '1' : '-'}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', color: m.dosageSchedule.night ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
                        {m.dosageSchedule.night ? '1' : '-'}
                      </td>
                      <td style={{ padding: '12px' }}>{m.timingLocal || m.timing}</td>
                      <td style={{ padding: '12px', fontWeight: '600' }}>{m.durationLocal || m.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Side Effects / Warnings Panel */}
            <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--color-danger)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-danger)' }}>
                <ShieldAlert size={18} />
                <span>{labels.sideEffectsTitle}</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {extractedMedicines.map((m, i) => (
                  <div key={i} style={{ fontSize: '12px', lineHeight: '1.4', padding: '8px', background: 'rgba(0,0,0,0.15)', borderRadius: '6px' }}>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)', marginBottom: '2px' }}>{m.nameLocal || m.name}</strong>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{m.sideEffectsLocal || m.sideEffects}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Recommendations Panel */}
            <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--color-secondary)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-secondary)' }}>
                <Apple size={18} />
                <span>{labels.foodTitle}</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {extractedMedicines.map((m, i) => (
                  <div key={i} style={{ fontSize: '12px', lineHeight: '1.4', padding: '8px', background: 'rgba(0,0,0,0.15)', borderRadius: '6px' }}>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)', marginBottom: '2px' }}>{m.nameLocal || m.name}</strong>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{m.foodAdviceLocal || m.foodAdvice}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Follow-up Reminder setting card */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--color-accent)' }}>
              <Calendar size={18} />
              <span>{labels.reminderTitle}</span>
            </h3>

            <form onSubmit={handleReminderSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="date"
                required
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                style={{
                  background: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-glass-border)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '8px 20px', fontSize: '13px' }}>
                {labels.reminderBtn}
              </button>

              {reminderSet && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>
                  <Check size={16} />
                  <span>{labels.reminderSuccess}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      )}
    </div>
  );
};
