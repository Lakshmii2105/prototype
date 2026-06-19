export interface TriageResult {
  symptom: string;
  symptomTe: string;
  symptomHi: string;
  symptomTa: string;
  symptomKn: string;
  severity: 'high' | 'medium' | 'low';
  advice: string;
  adviceTe: string;
  adviceHi: string;
  adviceTa: string;
  adviceKn: string;
  firstAid: string[];
  firstAidTe: string[];
  firstAidHi: string[];
  firstAidTa: string[];
  firstAidKn: string[];
  actionNeeded: string;
  actionNeededTe: string;
  actionNeededHi: string;
  actionNeededTa: string;
  actionNeededKn: string;
  shouldAlertDoctors: boolean;
}

export const defaultResponseEn = "I understand your query. Could you please describe your symptoms more clearly? (e.g. chest pain, snake bite, high fever, stomach ache). Remember, this is an AI tool and not a replacement for a doctor. If it is an emergency, press the RED Alert button.";
export const defaultResponseTe = "మీరు చెప్పింది నాకు అర్థమైంది. మీ సమస్యను కొంచెం వివరంగా చెప్పగలరా? (ఉదాహరణకు: గుండె నొప్పి, పాము కాటు, జ్వరం, కడుపు నొప్పి). గమనిక: ఇది కేవలం సహాయక పరికరం మాత్రమే, డాక్టర్ ప్రత్యామ్నాయం కాదు. అత్యవసరమైతే ఎరుపు రంగు 'అలర్ట్' బటన్ నొక్కండి.";
export const defaultResponseHi = "मुझे आपका प्रश्न समझ में आया। क्या आप अपने लक्षणों का अधिक स्पष्ट रूप से वर्णन कर सकते हैं? (जैसे सीने में दर्द, सांप का काटना, तेज बुखार, पेट दर्द)। याद रखें, यह एक एआई उपकरण है और डॉक्टर का विकल्प नहीं है। यदि यह आपातकालीन स्थिति है, तो लाल अलर्ट बटन दबाएं।";
export const defaultResponseTa = "உங்கள் கேள்வி எனக்குப் புரிகிறது. உங்கள் அறிகுறிகளை இன்னும் தெளிவாக விவரிக்க முடியுமா? (எ.கா. நெஞ்சு வலி, பாம்பு கடி, அதிக காய்ச்சல், வயிற்று வலி). நினைவில் கொள்ளுங்கள், இது ஒரு AI கருவி, மருத்துவருக்கு மாற்றல்ல. அவசரநிலை என்றால், சிவப்பு எச்சரிக்கை பொத்தானை அழுத்தவும்.";
export const defaultResponseKn = "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ನನಗೆ ಅರ್ಥವಾಗಿದೆ. ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಇನ್ನಷ್ಟು ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಬಹುದೇ? (ಉದಾಹರಣೆಗೆ ಎದೆ ನೋವು, ಹಾವು ಕಡಿತ, ತೀವ್ರ ಜ್ವರ, ಹೊಟ್ಟೆ ನೋವು). ನೆನಪಿಡಿ, ಇದು ಕೇವಲ ಎಐ ಸಹಾಯಕ ಮಾತ್ರ, ವೈದ್ಯರಿಗೆ ಪರ್ಯಾಯವಲ್ಲ. ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಾಗಿದ್ದರೆ, ಕೆಂಪು ಅಲರ್ಟ್ ಬಟನ್ ಒತ್ತಿರಿ.";

const rules: TriageResult[] = [
  {
    symptom: 'Chest Pain / Heart Issue',
    symptomTe: 'గుండె నొప్పి / ఛాతిలో నొప్పి',
    symptomHi: 'सीने में दर्द / हृदय रोग',
    symptomTa: 'நெஞ்சு வலி / இதயப் பிரச்சனை',
    symptomKn: 'ಎದೆ నొప్పి / ಹೃದಯ ಸಮಸ್ಯೆ',
    severity: 'high',
    advice: 'This is a high-priority emergency! Chest pain could indicate a heart condition. Act quickly.',
    adviceTe: 'ఇది చాలా పెద్ద అత్యవసర పరిస్థితి! గుండె నొప్పితో ప్రాణాలకు ముప్పు రావచ్చు. అస్సలు ఆలస్యం చేయకండి.',
    adviceHi: 'यह एक उच्च प्राथमिकता वाली आपातकालीन स्थिति है! सीने में दर्द हृदय रोग का संकेत हो सकता है। तुरंत कदम उठाएं।',
    adviceTa: 'இது ஒரு அவசர நிலை! நெஞ்சு வலி இதய நோயைக் குறிக்கலாம். விரைவாக செயல்படுங்கள்.',
    adviceKn: 'ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿ! ಎದೆ ನೋವು ಹೃದಯದ ಸಮಸ್ಯೆಯಾಗಿರಬಹುದು. ತಕ್ಷಣ ಕಾರ್ಯಪ್ರವೃತ್ತರಾಗಿ.',
    firstAid: [
      'Sit down and rest in a comfortable, upright position.',
      'Loosen any tight clothing around your neck.',
      'Take 325mg Aspirin if available and not allergic.',
      'Do not try to walk or drive yourself to the hospital.'
    ],
    firstAidTe: [
      'వెంటనే స్థిమితంగా కూర్చోబెట్టి విశ్రాంతి ఇవ్వండి.',
      'మెడ చుట్టూ ఉండే బట్టలను లూజ్ చేయండి.',
      'ఆస్పిరిన్ (Aspirin) మందు ఉంటే వేసుకోమనండి (అలర్జీ లేకపోతేనే).',
      'ఆసుపత్రికి నడిచి గాని, సొంతంగా బండి నడిపి గాని వెళ్లకూడదు.'
    ],
    firstAidHi: [
      'आरामदायक, सीधी स्थिति में बैठ जाएं और विश्राम करें।',
      'गले के आस-पास के तंग कपड़ों को ढीला करें।',
      'यदि उपलब्ध हो और एलर्जी न हो तो 325mg एस्पिरिन लें।',
      'अस्पताल जाने के लिए खुद चलने या गाड़ी चलाने का प्रयास न करें।'
    ],
    firstAidTa: [
      'வசதியான, நேரான நிலையில் அமர்ந்து ஓய்வெடுக்கவும்.',
      'கழுத்தைச் சுற்றியுள்ள இறுக்கமான ஆடைகளைத் தளர்த்தவும்.',
      'அலர்ஜி இல்லை என்றால் 325mg ஆஸ்பிரின் மாத்திரை சாப்பிடவும்.',
      'மருத்துவமனைக்கு தனியாக நடந்து செல்லவோ அல்லது வாகனம் ஓட்டவோ முயற்சிக்க வேண்டாம்.'
    ],
    firstAidKn: [
      'ಆರಾಮದಾಯಕವಾದ ನೆಟ್ಟಗಿನ ಸ್ಥಿತಿಯಲ್ಲಿ ಕುಳಿತುಕೊಂಡು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.',
      'ಕುತ್ತಿಗೆಯ ಸುತ್ತಲಿನ ಬಿಗಿಯಾದ ಬಟ್ಟೆಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ.',
      'ಅಲರ್ಜಿ ಇಲ್ಲದಿದ್ದರೆ 325mg ಆಸ್ಪಿರಿನ್ ತೆಗೆದುಕೊಳ್ಳಿ.',
      'ನಡೆಯಲು ಅಥವಾ ಸ್ವತಃ ವಾಹನ ಚಲಾಯಿಸಿಕೊಂಡು ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.'
    ],
    actionNeeded: 'Immediately alert nearby doctors and visit the nearest Government General Hospital.',
    actionNeededTe: 'వెంటనే పక్కనున్న డాక్టర్లకు కబురు పెట్టి, కడప ప్రభుత్వ ఆसुపత్రికి తరలించండి.',
    actionNeededHi: 'तुरंत नजदीकी डॉक्टरों को सचेत करें और निकटतम सरकारी सामान्य अस्पताल जाएं।',
    actionNeededTa: 'உடனே அருகில் உள்ள மருத்துவர்களைத் தொடர்பு கொண்டு அரசு பொது மருத்துவமனைக்குச் செல்லவும்.',
    actionNeededKn: 'ತಕ್ಷಣ ಹತ್ತಿರದ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಹತ್ತಿರದ ಸರ್ಕಾರಿ ಸಾರ್ವಜನಿಕ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.',
    shouldAlertDoctors: true
  },
  {
    symptom: 'Breathing Difficulty',
    symptomTe: 'శ్వాస తీసుకోవడంలో ఇబ్బంది',
    symptomHi: 'सांस लेने में कठिनाई',
    symptomTa: 'மூச்சு விடுவதில் சிரமம்',
    symptomKn: 'ಉಸಿರಾಟದ ತೊಂದರೆ',
    severity: 'high',
    advice: 'Severe breathing issues need immediate medical evaluation.',
    adviceTe: 'శ్వాస ఆడకపోవడం చాలా ప్రమాదకరం. వెంటనే డాక్టర్ వద్దకు వెళ్లాలి.',
    adviceHi: 'सांस लेने में गंभीर समस्या होने पर तुरंत डॉक्टर से जांच करानी चाहिए।',
    adviceTa: 'மூச்சு விடுவதில் கடுமையான சிரமம் இருந்தால் உடனே மருத்துவ பரிசோதனை தேவை.',
    adviceKn: 'ಉಸಿರಾಟದ ತೀವ್ರ ತೊಂದರೆಗೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ ಅಗತ್ಯವಿದೆ.',
    firstAid: [
      'Sit upright and remain calm; panic increases oxygen demand.',
      'Use a prescribed inhaler if the patient is asthmatic.',
      'Ensure the room has fresh air flow. Open windows.',
      'Avoid laying down flat.'
    ],
    firstAidTe: [
      'తిన్నగా కూర్చోబెట్టి భయం పోగొట్టండి (భయపడితే శ్వాస ఇంకా కష్టమవుతుంది).',
      'ఆస్తమా ఇన్హేలర్ ఉంటే వాడించండి.',
      'గాలి బాగా తగిలేలా కిటికీలు తెరిచి పెట్టండి.',
      'పడుకోబెట్టకూడదు, కూర్చోబెట్టడం ముఖ్యం.'
    ],
    firstAidHi: [
      'सीधे बैठें और शांत रहें; घबराहट से ऑक्सीजन की मांग बढ़ती है।',
      'यदि रोगी को अस्थमा है, तो निर्धारित इनहेलर का उपयोग करें।',
      'सुनिश्चित करें कि कमरे में ताजी हवा आ रही हो। खिड़कियां खोलें।',
      'सपाट लेटने से बचें।'
    ],
    firstAidTa: [
      'நேராக நிமிர்ந்து உட்கார்ந்து அமைதியாக இருக்கவும்; பதற்றம் ஆக்சிஜன் தேவையை அதிகரிக்கும்.',
      'நோயாளிக்கு ஆஸ்துமா இருந்தால், பரிந்துரைக்கப்பட்ட இன்ஹேலரைப் பயன்படுத்தவும்.',
      'அறையில் நல்ல காற்றோட்டம் இருப்பதை உறுதி செய்யவும். ஜன்னல்களைத் திறக்கவும்.',
      'படுத்துக்கொள்வதைத் தவிர்க்கவும்.'
    ],
    firstAidKn: [
      'ನೆಟ್ಟಗೆ ಕುಳಿತುಕೊಳ್ಳಿ ಮತ್ತು ಶಾಂತರಾಗಿರಿ; ಗಾಬರಿಯು ಆಮ್ಲಜನಕದ ಅಗತ್ಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
      'ರೋಗಿಗೆ ಉಬ್ಬಸವಿದ್ದರೆ, ವೈದ್ಯರು ಸೂಚಿಸಿದ ಇನ್ಹೇಲರ್ ಬಳಸಿ.',
      'ಕೋಣೆಗೆ ತಾಜಾ ಗಾಳಿ ಬರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ, ಕಿಟಕಿಗಳನ್ನು ತೆರೆಯಿರಿ.',
      'ಫ್ಲಾಟ್ ಆಗಿ ಮಲಗಿಕೊಳ್ಳುವುದನ್ನು ತಪ್ಪಿಸಿ.'
    ],
    actionNeeded: 'Urgent medical help required. Go to the nearest community health center.',
    actionNeededTe: 'వెంటనే సమీపంలోని ఆరోగ్య కేంద్రానికి తీసుకెళ్లండి.',
    actionNeededHi: 'तत्काल चिकित्सा सहायता आवश्यक है। निकटतम सामुदायिक स्वास्थ्य केंद्र जाएं।',
    actionNeededTa: 'அவசர மருத்துவ உதவி தேவை. அருகில் உள்ள ஆரம்ப சுகாதார நிலையத்திற்குச் செல்லவும்.',
    actionNeededKn: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ನೆರವು ಅಗತ್ಯವಿದೆ. ಹತ್ತಿರದ ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗಿ.',
    shouldAlertDoctors: true
  },
  {
    symptom: 'Snake Bite',
    symptomTe: 'పాము కాటు',
    symptomHi: 'साँप का काटना',
    symptomTa: 'பாம்பு கடி',
    symptomKn: 'ಹಾವು ಕಡಿತ',
    severity: 'high',
    advice: 'Snake bites can be highly lethal. Antivenom is needed immediately.',
    adviceTe: 'పాము కాటుకు వెంటనే విరుగుడు మందు (యాంటీ-వెనమ్) ఇవ్వాలి. నిర్లక్ష్యం వద్దు.',
    adviceHi: 'सांप का काटना अत्यधिक घातक हो सकता है। तुरंत एंटीवेनम की आवश्यकता होती है।',
    adviceTa: 'பாம்பு கடி மிகவும் ஆபத்தானது. உடனடியாக நச்சுமுறிவு மருந்து (Antivenom) தேவை.',
    adviceKn: 'ಹಾವು ಕಡಿತವು ಮಾರಣಾಂತಿಕವಾಗಿರಬಹುದು. ತಕ್ಷಣವೇ ವಿಷನಿರೋಧಕ (Antivenom) ಅಗತ್ಯವಿದೆ.',
    firstAid: [
      'Keep the patient completely still and calm; movement spreads venom.',
      'Gently wash the bite site with soap and water.',
      'Keep the bitten limb below or at heart level.',
      'Do NOT tie tight tourniquets or cut/suck the wound.'
    ],
    firstAidTe: [
      'మనిషిని కదలకుండా ప్రశాంతంగా ఉంచండి; కదిలితే విషం త్వరగా పాకుతుంది.',
      'కాటు వేసిన చోట సబ్బు నీళ్లతో మెల్లగా కడగండి.',
      'కాటు వేసిన కాలు లేదా చేతిని గుండె కంటే కింద భాగంలో ఉండేలా పెట్టండి.',
      'గాయాన్ని బ్లేడుతో కోయడం, నోటితో విషం పీల్చడం లాంటివి చేయకూడదు.'
    ],
    firstAidHi: [
      'रोगी को पूरी तरह से स्थिर और शांत रखें; हिलने-डुलने से जहर फैलता है।',
      'काटने वाली जगह को साबुन और पानी से धीरे से धोएं।',
      'काटे गए अंग को हृदय के स्तर से नीचे रखें।',
      'घाव को कसकर न बांधें और न ही उस पर चीरा लगाएं या मुंह से चूसें।'
    ],
    firstAidTa: [
      'நோயாளி அசையாமல் அமைதியாக இருக்க வேண்டும்; அசைந்தால் நஞ்சு வேகமாக பரவும்.',
      'கடிபட்ட இடத்தை சோப்பு மற்றும் தண்ணீரால் மெதுவாகக் கழுவவும்.',
      'கடிபட்ட கை அல்லது காலை இதயத்தின் மட்டத்திற்கு கீழே வைக்கவும்.',
      'கடிபட்ட இடத்தில் இறுக்கமாக கட்டவோ, வெட்டவோ அல்லது வாயால் நஞ்சை உறிஞ்சவோ வேண்டாம்.'
    ],
    firstAidKn: [
      'ರೋಗಿಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಶಾಂತವಾಗಿ ಮತ್ತು ಕದಲದೆ ಇರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ; ಚಲನೆಯು ವಿಷವನ್ನು ಹರಡುತ್ತದೆ.',
      'ಕಡಿತಕ್ಕೊಳಗಾದ ಜಾಗವನ್ನು ಸೋಪು ಮತ್ತು ನೀರಿನಿಂದ ನಿಧಾನವಾಗಿ ತೊಳೆಯಿರಿ.',
      'ಕಡಿತಕ್ಕೊಳಗಾದ ಅಂಗವನ್ನು ಹೃದಯದ ಮಟ್ಟಕ್ಕಿಂತ ಕೆಳಗೆ ಇರಿಸಿ.',
      'ಗಾಯದ ಮೇಲೆ ಗಟ್ಟಿಯಾಗಿ ಕಟ್ಟಬೇಡಿ ಅಥವಾ ಬ್ಲೇಡ್‌ನಿಂದ ಕೊಯ್ಯಬೇಡಿ/ಬಾಯಿಂದ ವಿಷವನ್ನು ಹೀಚಬೇಡಿ.'
    ],
    actionNeeded: 'Go to a Government Hospital immediately. Only Government Hospitals store Snake Antivenom (ASV) for free.',
    actionNeededTe: 'వెంటనే ప్రభుత్వ ఆసుపత్రికి వెళ్ళండి. అక్కడ మాత్రమే ఉచితంగా పాము కాటు మందు (ASV) లభిస్తుంది.',
    actionNeededHi: 'तुरंत सरकारी अस्पताल जाएं। केवल सरकारी अस्पतालों में सांप के जहर का एंटीवेनम (ASV) मुफ्त में मिलता है।',
    actionNeededTa: 'உடனடியாக அரசு மருத்துவமனைக்குச் செல்லவும். அரசு மருத்துவமனைகளில் மட்டுமே பாம்பு நச்சுமுறிவு மருந்து (ASV) இலவசமாகக் கிடைக்கும்.',
    actionNeededKn: 'ತಕ್ಷಣ ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ. ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಮಾತ್ರ ಉಚಿತವಾಗಿ ಹಾವಿನ ವಿಷನಿರೋಧಕ ಔಷಧ (ASV) ಲಭ್ಯವಿರುತ್ತದೆ.',
    shouldAlertDoctors: true
  },
  {
    symptom: 'Severe Bleeding',
    symptomTe: 'తీవ్ర రక్తస్రావం / పెద్ద గాయం',
    symptomHi: 'अत्यधिक रक्तस्राव',
    symptomTa: 'கடுமையான இரத்தப்போக்கு',
    symptomKn: 'ತೀವ್ರ ರಕ್ತಸ್ರಾವ',
    severity: 'high',
    advice: 'Uncontrolled bleeding can lead to shock and critical condition.',
    adviceTe: 'ఎక్కువగా రక్తం పోతే ప్రాణానికే ప్రమాదం కావచ్చు. రక్తాన్ని వెంటనే ఆపాలి.',
    adviceHi: 'अनियंत्रित रक्तस्राव से रोगी सदमे में जा सकता है और स्थिति गंभीर हो सकती है।',
    adviceTa: 'கட்டுப்படுத்த முடியாத இரத்தப்போக்கு உயிருக்கு ஆபத்தை விளைவிக்கலாம். இரத்தத்தை உடனடியாக நிறுத்த வேண்டும்.',
    adviceKn: 'ರಕ್ತಸ್ರಾವ ನಿಲ್ಲದಿದ್ದರೆ ರೋಗಿಯು ಪ್ರಜ್ಞೆ ಕಳೆದುಕೊಳ್ಳಬಹುದು ಮತ್ತು ಸ್ಥಿತಿ ಗಂಭೀರವಾಗಬಹುದು.',
    firstAid: [
      'Apply direct pressure on the wound using a clean cloth or bandage.',
      'Elevate the injured limb above the heart if possible.',
      'Keep the person warm and lying down flat.',
      'Do not remove the cloth if blood soaks through; add more layers.'
    ],
    firstAidTe: [
      'గాయం పైన శుభ్రమైన గుడ్డతో గట్టిగా నొక్కి పట్టి రక్తం రాకుండా ఆపండి.',
      'వీలైతే దెబ్బ తగిలిన కాలు లేదా చేతిని పైకి ఎత్తి పెట్టండి.',
      'రోగిని వెచ్చగా పడుకోబెట్టండి.',
      'గుడ్డ తడిసినా తీయకుండా దాని పైననే మరో గుడ్డ పెట్టి నొక్కండి.'
    ],
    firstAidHi: [
      'साफ कपड़े या पट्टी का उपयोग करके घाव पर सीधे दबाव डालें।',
      'यदि संभव हो, तो घायल अंग को हृदय के स्तर से ऊपर उठाएं।',
      'व्यक्ति को गर्म रखें और सीधा लिटाएं।',
      'यदि कपड़ा खून से भीग जाए तो उसे न हटाएं; ऊपर से और कपड़ा लगाएं।'
    ],
    firstAidTa: [
      'சுத்தமான துணி அல்லது கட்டுப்போடும் துணியைப் பயன்படுத்தி காயத்தின் மீது நேரடியாக அழுத்தம் கொடுக்கவும்.',
      'முடிந்தால் காயம்பட்ட கையை அல்லது காலை இதய மட்டத்திற்கு மேல் உயர்த்தவும்.',
      'நபரை கதகதப்பாக நேராக படுக்க வைக்கவும்.',
      'துணி இரத்தத்தில் நனைந்தால் அதை அகற்ற வேண்டாம்; அதன் மேல் இன்னும் சில துணிகளை அடுக்கவும்.'
    ],
    firstAidKn: [
      'ಸ್ವಚ್ಛವಾದ ಬಟ್ಟೆ ಅಥವಾ ಬ್ಯಾಂಡೇಜ್ ಬಳಸಿ ಗಾಯದ ಮೇಲೆ ನೇರವಾಗಿ ಒತ್ತಡ ಹೇರಿ ರಕ್ತವನ್ನು ತಡೆಯಿರಿ.',
      'ಸಾಧ್ಯವಾದರೆ, ಗಾಯಗೊಂಡ ಅಂಗವನ್ನು ಹೃದಯದ ಮಟ್ಟಕ್ಕಿಂತ ಮೇಲಕ್ಕೆ ಎತ್ತಿ ಹಿಡಿಯಿರಿ.',
      'ವ್ಯಕ್ತಿಯನ್ನು ಬೆಚ್ಚಗೆ ಇರಿಸಿ ಮತ್ತು ನೇರವಾಗಿ ಮಲಗಿಸಿ.',
      'ಬಟ್ಟೆಯು ರಕ್ತದಿಂದ ಒದ್ದೆಯಾದರೆ ಅದನ್ನು ತೆಗೆಯಬೇಡಿ; ಅದರ ಮೇಲೆಯೇ ಮತ್ತಷ್ಟು ಬಟ್ಟೆಗಳನ್ನು ಇರಿಸಿ ಒತ್ತಿರಿ.'
    ],
    actionNeeded: 'Seek emergency clinic or Government Primary Health Centre.',
    actionNeededTe: 'వెంటనే పక్కనున్న ప్రాథమిక ఆరోగ్య కేంద్రానికి లేదా క్లినిక్‌కి తరలించండి.',
    actionNeededHi: 'तुरंत आपातकालीन क्लिनिक या सरकारी प्राथमिक स्वास्थ्य केंद्र से संपर्क करें।',
    actionNeededTa: 'அவசரகால மருத்துவமனை அல்லது அரசு ஆரம்ப சுகாதார நிலையத்திற்குச் செல்லவும்.',
    actionNeededKn: 'ತಕ್ಷಣ ತುರ್ತು ಕ್ಲಿನಿಕ್ ಅಥವಾ ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.',
    shouldAlertDoctors: true
  },
  {
    symptom: 'Dog Bite',
    symptomTe: 'కుక్క కాటు',
    symptomHi: 'कुत्ते का काटना',
    symptomTa: 'நாய் கடி',
    symptomKn: 'ನಾಯಿ ಕಡಿತ',
    severity: 'medium',
    advice: 'Dog bites require Rabies vaccination within 24 hours to ensure safety.',
    adviceTe: 'కుక్క కాటు వేసినప్పుడు రేబిస్ రాకుండా 24 గంటల్లో టీకా వేసుకోవడం ముఖ్యం.',
    adviceHi: 'सुरक्षा सुनिश्चित करने के लिए कुत्ते के काटने के 24 घंटे के भीतर रेबीज का टीका लगवाना आवश्यक है।',
    adviceTa: 'நாய்க்கடிக்கு 24 மணி நேரத்திற்குள் ரேபிஸ் தடுப்பூசி போடுவது பாதுகாப்பிற்கு அவசியம்.',
    adviceKn: 'ಸುರಕ್ಷತೆಗಾಗಿ ನಾಯಿ ಕಡಿದ 24 ಗಂಟೆಗಳ ಒಳಗೆ ರೇಬೀಸ್ ಲಸಿಕೆ ತೆಗೆದುಕೊಳ್ಳುವುದು ಅಗತ್ಯವಾಗಿದೆ.',
    firstAid: [
      'Wash the wound thoroughly with running tap water and soap for 15 minutes.',
      'Apply an antiseptic cream if available.',
      'Cover with a clean, loose bandage.',
      'Do not apply local remedies like lime or red powder.'
    ],
    firstAidTe: [
      'గాయాన్ని ప్రవహించే కొళాయి నీటి కింద సబ్బుతో 15 నిమిషాల పాటు బాగా కడగండి.',
      'యాంటీసెప్టిక్ క్రీమ్ ఉంటే రాయండి.',
      'శుభ్రమైన గుడ్డతో మెల్లగా కప్పండి.',
      'సున్నం, కారం వంటి నాటు చిట్కాలు వాడకండి.'
    ],
    firstAidHi: [
      'बहते पानी के नीचे घाव को साबुन से 15 मिनट तक अच्छी तरह धोएं।',
      'यदि उपलब्ध हो, तो एंटीसेप्टिक क्रीम लगाएं।',
      'साफ और ढीली पट्टी से घाव को ढकें।',
      'चूना या मिर्च पाउडर जैसे घरेलू नुस्खे न अपनाएं।'
    ],
    firstAidTa: [
      'காயத்தை ஓடும் குழாய் நீரில் சோப்புடன் 15 நிமிடங்கள் நன்கு கழுவவும்.',
      'ஆண்டிசெப்டிக் கிரீம் இருந்தால் தடவவும்.',
      'சுத்தமான, இறுக்கமில்லாத துணியால் காயத்தை மூடவும்.',
      'சுண்ணாம்பு அல்லது மிளகாய்த்தூள் போன்ற வீட்டு வைத்தியங்களை செய்ய வேண்டாம்.'
    ],
    firstAidKn: [
      'ಗಾಯವನ್ನು ಹರಿಯುವ ನೀರಿನ ನಲ್ಲಿಯ ಕೆಳಗೆ ಸೋಪಿನಿಂದ 15 ನಿಮಿಷಗಳ ಕಾಲ ಚೆನ್ನಾಗಿ ತೊಳೆಯಿರಿ.',
      'ಆಂಟಿಸೆಪ್ಟಿಕ್ ಕ್ರೀಮ್ ಇದ್ದರೆ ಹಚ್ಚಿ.',
      'ಸ್ವಚ್ಛವಾದ, ಸಡಿಲವಾದ ಬಟ್ಟೆಯಿಂದ ಗಾಯವನ್ನು ಮುಚ್ಚಿ.',
      'ಸುಣ್ಣ ಅಥವಾ ಮೆಣಸಿನ ಪುಡಿಯಂತಹ ನಾಟಿ ಮನೆಮದ್ದುಗಳನ್ನು ಬಳಸಬೇಡಿ.'
    ],
    actionNeeded: 'Visit the Government Hospital for a Rabies shot (ARV) which is given free of cost.',
    actionNeededTe: 'ఉచిత కుక్క కాటు టీకా (ARV) కొరకు ప్రభుత్వ ఆసుపత్రికి వెళ్ళండి.',
    actionNeededHi: 'रेबीज के टीके (ARV) के लिए सरकारी अस्पताल जाएं, जो मुफ्त में दिया जाता है।',
    actionNeededTa: 'இலவசமாக வழங்கப்படும் ரேபிஸ் தடுப்பூசிக்கு (ARV) அரசு மருத்துவமனைக்குச் செல்லவும்.',
    actionNeededKn: 'ಉಚಿತ ರೇಬೀಸ್ ಲಸಿಕೆಗಾಗಿ (ARV) ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ.',
    shouldAlertDoctors: false
  },
  {
    symptom: 'High Fever',
    symptomTe: 'తీవ్రమైన జ్వరం / ఒళ్లు వేడెక్కడం',
    symptomHi: 'तेज बुखार',
    symptomTa: 'அதிக காய்ச்சல்',
    symptomKn: 'ತೀವ್ರ ಜ್ವರ',
    severity: 'medium',
    advice: 'High fever, especially in children, should be monitored closely to avoid seizures.',
    adviceTe: 'తీవ్రమైన జ్వరం వచ్చినప్పుడు పర్యవేక్షించడం ముఖ్యం, లేదంటే ఫిట్స్ వచ్చే అవకాశం ఉంది.',
    adviceHi: 'तेज बुखार, विशेष रूप से बच्चों में, दौरे (फिट्स) से बचने के लिए बारीकी से निगरानी की जानी चाहिए।',
    adviceTa: 'அதிக காய்ச்சல், குறிப்பாக குழந்தைகளுக்கு இருந்தால், ஜன்னி (fits) வருவதைத் தடுக்க உன்னிப்பாகக் கவனிக்க வேண்டும்.',
    adviceKn: 'ತೀವ್ರ ಜ್ವರವನ್ನು, ವಿಶೇಷವಾಗಿ ಮಕ್ಕಳಲ್ಲಿ, ಫಿಟ್ಸ್ ಬರದಂತೆ ತಡೆಯಲು ಸೂಕ್ಷ್ಮವಾಗಿ ಗಮನಿಸಬೇಕು.',
    firstAid: [
      'Use a wet cloth to sponge the forehead, arms, and legs with normal tap water.',
      'Give Paracetamol as per weight/age guidelines.',
      'Keep the patient hydrated with plenty of fluids (ORS, coconut water, clean water).',
      'Ensure the patient is in a cool, well-ventilated room.'
    ],
    firstAidTe: [
      'సాధారణ తడి గుడ్డతో నొసలు, చేతులు, కాళ్లపై తుడవండి (ఒళ్లు చల్లబరుస్తుంది).',
      'పారాసిటమాల్ (Paracetamol) మందును సరైన మోతాదులో ఇవ్వండి.',
      'ఒఆర్ఎస్ (ORS), కొబ్బరి నీళ్లు, లేదా మంచి నీరు ఎక్కువగా తాగించండి.',
      'గాలి తగిలేలా ఉంచండి, మరీ ఎక్కువ దుప్పట్లు కప్పకండి.'
    ],
    firstAidHi: [
      'माथे, हाथ और पैरों को गीले कपड़े से सामान्य नल के पानी से पोछें।',
      'वजन/आयु के दिशानिर्देशों के अनुसार पैरासिटामोल दें।',
      'रोगी को खूब तरल पदार्थ (ORS, नारियल पानी, साफ पानी) पिलाकर हाइड्रेटेड रखें।',
      'सुनिश्चित करें कि रोगी ठंडे और हवादार कमरे में हो।'
    ],
    firstAidTa: [
      'சாதாரண குளிர்ந்த நீரில் நனைத்த துணியால் நெற்றி, கைகள் மற்றும் கால்களைத் துடைக்கவும்.',
      'எடை மற்றும் வயதிற்கு ஏற்ப பாராசிட்டமால் மாத்திரை கொடுக்கவும்.',
      'நோயாளிக்கு ஓஆர்எஸ் (ORS), இளநீர் அல்லது சுத்தமான நீர் போன்ற திரவங்களை அதிகமாகக் குடிக்கக் கொடுத்து உடலை வறட்சியடையாமல் பார்த்துக்கொள்ளவும்.',
      'நோயாளி காற்றோட்டமான குளிர்ந்த அறையில் இருப்பதை உறுதி செய்யவும்.'
    ],
    firstAidKn: [
      'ಸಾಮಾನ್ಯ ನಲ್ಲಿಯ ನೀರಿನಿಂದ ಒದ್ದೆ ಬಟ್ಟೆಯನ್ನು ಹಣೆ, ಕೈ ಮತ್ತು ಕಾಲುಗಳ ಮೇಲೆ ಒರೆಸಿ ಒಡಲನ್ನು ತಂಪಾಗಿಸಿ.',
      'ವಯಸ್ಸು/ತೂಕಕ್ಕೆ ತಕ್ಕಂತೆ ಪ್ಯಾರಸಿಟಮಲ್ ಔಷಧವನ್ನು ನೀಡಿ.',
      'ORS, ಎಳನೀರು ಅಥವಾ ನೀರನ್ನು ಹೆಚ್ಚು ಕುಡಿಸಿ ರೋಗಿಯ ದೇಹದಲ್ಲಿ ನೀರಿನಂಶ ಒಣಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
      'ರೋಗಿ ತಂಪಾದ, ಗಾಳಿಯಾಡುವ ಕೋಣೆಯಲ್ಲಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.'
    ],
    actionNeeded: 'If the fever persists for more than 48 hours or goes above 103°F, visit a nearby clinic.',
    actionNeededTe: 'జ్వరం 2 రోజుల కంటే తగ్గకపోతే వెంటనే పక్కనున్న డాక్టర్‌కి చూపించండి.',
    actionNeededHi: 'यदि बुखार 48 घंटे से अधिक समय तक बना रहता है या 103°F से ऊपर जाता है, तो नजदीकी क्लिनिक जाएं।',
    actionNeededTa: 'காய்ச்சல் 48 மணி நேரத்திற்கு மேல் நீடித்தால் அல்லது 103°F-க்கு மேல் சென்றால், அருகில் உள்ள மருத்துவ மனைக்குச் செல்லவும்.',
    actionNeededKn: 'ಜ್ವರ 2 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಇದ್ದರೆ ಅಥವಾ 103°F ಗಿಂತ ಹೆಚ್ಚಾದರೆ ಹತ್ತಿರದ ಕ್ಲಿನಿಕ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.',
    shouldAlertDoctors: false
  },
  {
    symptom: 'Stomach Ache',
    symptomTe: 'కడుపు నొప్పి',
    symptomHi: 'पेट दर्द',
    symptomTa: 'வயிற்று வலி',
    symptomKn: 'ಹೊಟ್ಟೆ ನೋವು',
    severity: 'low',
    advice: 'Stomach aches are usually mild but check for severe vomiting or sharp localized pain.',
    adviceTe: 'కడుపు నొప్పి సాధారణంగా తగ్గుతుంది, కానీ వాంతులు లేదా భరించలేని నొప్పి ఉంటే శ్రద్ధ వహించాలి.',
    adviceHi: 'पेट दर्द आमतौर पर हल्का होता है लेकिन गंभीर उल्टी या तेज स्थानीय दर्द की जांच करें।',
    adviceTa: 'வயிற்று வலி பொதுவாக லேசானதுதான், ஆனால் கடுமையான வாந்தி அல்லது குறிப்பிட்ட இடத்தில் கடுமையான வலி இருக்கிறதா என்று கவனிக்கவும்.',
    adviceKn: 'ಹೊಟ್ಟೆ ನೋವು ಸಾಮಾನ್ಯವಾಗಿ ಸೌಮ್ಯವಾಗಿರುತ್ತದೆ, ಆದರೆ ವಾಂತಿ ಅಥವಾ ತೀವ್ರವಾದ ಸ್ಥಳೀಯ ನೋವಿದೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ.',
    firstAid: [
      'Drink warm water or clear fluids.',
      'Rest in a comfortable position.',
      'Avoid solid foods for a few hours if feeling nauseated.',
      'Do not take pain relief pills without consulting a doctor as it may mask serious appendicitis.'
    ],
    firstAidTe: [
      'గోరువెచ్చని నీరు లేదా మజ్జిగ తాగండి.',
      'కడుపుకు హాయిగా ఉండేలా పడుకుని విశ్రాంతి తీసుకోండి.',
      'వాంతులు అవుతున్నట్లు ఉంటే కొద్దిసేపు ఘన ఆహారం తీసుకోకండి.',
      'సొంతంగా నొప్పి నివారణ మందులు వాడొద్దు.'
    ],
    firstAidHi: [
      'गुनगुना पानी या हल्का तरल पदार्थ पिएं।',
      'आरामदायक स्थिति में विश्राम करें।',
      'यदि उल्टी जैसा महसूस हो रहा हो, तो कुछ घंटों के लिए ठोस भोजन से बचें।',
      'डॉक्टर की सलाह के बिना दर्द निवारक गोलियां न लें, क्योंकि यह एपेंडिसाइटिस जैसे गंभीर दर्द को छिपा सकती है।'
    ],
    firstAidTa: [
      'வெதுவெதுப்பான நீர் அல்லது மோர் குடிக்கவும்.',
      'வசதியான நிலையில் படுத்து ஓய்வெடுக்கவும்.',
      'வாந்தி வருவது போன்ற உணர்வு இருந்தால் சில மணி நேரங்களுக்குக் கடின உணவுகளைத் தவிர்க்கவும்.',
      'மருத்துவரின் ஆலோசனையின்றி வலி நிவாரணி மாத்திரைகளை உட்கொள்ள வேண்டாம்; இது கடுமையான குடல்வாலழற்சியை (appendicitis) மறைக்கக்கூடும்.'
    ],
    firstAidKn: [
      'ಉಗುರುಬೆಚ್ಚಗಿನ ನೀರು ಅಥವಾ ತಿಳಿ ದ್ರವಗಳನ್ನು ಕುಡಿಯಿರಿ.',
      'ಹಾಯಾಗಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.',
      'ವಾಂತಿ ಬರುವಂತಿದ್ದರೆ ಕೆಲವು ಗಂಟೆಗಳ ಕಾಲ ಘನ ಆಹಾರ ಸೇವಿಸಬೇಡಿ.',
      'ವೈದ್ಯರ ಸಲಹೆಯಿಲ್ಲದೆ ನೋವು ನಿವಾರಕ ಮಾತ್ರೆ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ, ಇದು ತೀವ್ರವಾದ ಅಪೆಂಡಿಸೈಟಿಸ್ ನೋವನ್ನು ಮರೆಮಾಡಬಹುದು.'
    ],
    actionNeeded: 'Keep resting. If pain becomes sharp on the bottom right side of the stomach, go to a clinic.',
    actionNeededTe: 'విశ్రాంతి తీసుకోండి. పొత్తికడుపు కుడి వైపు కింద భాగంలో భరించలేని నొప్పి వస్తే డాక్టర్ దగ్గరికి వెళ్లండి.',
    actionNeededHi: 'आराम करते रहें। यदि पेट के निचले दाहिने हिस्से में तेज दर्द होता है, तो क्लिनिक जाएं।',
    actionNeededTa: 'ஓய்வெடுக்கவும். வயிற்றின் கீழ் வலது பக்கத்தில் கடுமையான வலி ஏற்பட்டால், உடனே மருத்துவமனைக்குச் செல்லவும்.',
    actionNeededKn: 'ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ. ಕೆಳ ಹೊಟ್ಟೆಯ ಬಲ ಭಾಗದಲ್ಲಿ ತೀವ್ರವಾದ ನೋವು ಕಾಣಿಸಿಕೊಂಡರೆ ಕ್ಲಿನಿಕ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.',
    shouldAlertDoctors: false
  },
  {
    symptom: 'Cough and Cold',
    symptomTe: 'దగ్గు మరియు జలుబు',
    symptomHi: 'खांसी और जुकाम',
    symptomTa: 'இருமல் மற்றும் சளி',
    symptomKn: 'ಕೆಮ್ಮು ಮತ್ತು ಶೀತ',
    severity: 'low',
    advice: 'Viral cough and colds resolve with rest, home remedies, and hydration.',
    adviceTe: 'దగ్గు, జలుబు సాధారణంగా విశ్రాంతి, వేడి చిట్కాలతో తగ్గిపోతాయి.',
    adviceHi: 'वायरल खांसी और जुकाम आराम, घरेलू उपचार और पर्याप्त पानी पीने से ठीक हो जाता है।',
    adviceTa: 'இருமல், சளி பொதுவாக ஓய்வு, வீட்டு வைத்தியம் மற்றும் திரவ உணவுகளால் குணமாகும்.',
    adviceKn: 'ವೈರಲ್ ಕೆಮ್ಮು ಮತ್ತು ಶೀತವು ವಿಶ್ರಾಂತಿ, ಮನೆಮದ್ದು ಹಾಗೂ ಹೆಚ್ಚು ನೀರು ಕುಡಿಯುವುದರಿಂದ ಗುಣವಾಗುತ್ತದೆ.',
    firstAid: [
      'Do steam inhalation with warm water 2-3 times a day.',
      'Drink warm water and hot soup with ginger and pepper.',
      'Gargle with warm salt water to relieve throat soreness.',
      'Rest well and avoid cold drinks.'
    ],
    firstAidTe: [
      'రోజుకు రెండు మూడు సార్లు వేడి నీటి ఆవిరి పట్టండి.',
      'అల్లం, మిరియాలు వేసిన వేడి నీరు లేదా కషాయం తాగండి.',
      'గోరువెచ్చని ఉప్పు నీటితో నోరు పుక్కిలించండి.',
      'బాగా విశ్రాంతి తీసుకోండి, చల్లని వస్తువులు తినవద్దు.'
    ],
    firstAidHi: [
      'दिन में 2-3 बार गर्म पानी से भाप लें।',
      'अदरक और काली मिर्च के साथ गर्म पानी और गरम सूप पिएं।',
      'गले की खराश दूर करने के लिए गर्म नमक के पानी से गरारे करें।',
      'अच्छी तरह आराम करें और ठंडे पेय पदार्थों से बचें।'
    ],
    firstAidTa: [
      'ஒரு நாளைக்கு 2-3 முறை வெதுவெதுப்பான நீரில் ஆவி பிடிக்கவும்.',
      'இஞ்சி மற்றும் மிளகு சேர்த்த வெதுவெதுப்பான நீர் அல்லது சூடான சூப் குடிக்கவும்.',
      'தொண்டை வலியைப் போக்க வெதுவெதுப்பான உப்பு நீரால் வாய் கொப்பளிக்கவும்.',
      'நன்றாக ஓய்வெடுக்கவும், குளிர்ந்த பானங்களைத் தவிர்க்கவும்.'
    ],
    firstAidKn: [
      'ದಿನಕ್ಕೆ 2-3 ಬಾರಿ ಬಿಸಿ ನೀರಿನ ಆವಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
      'ಶುಂಠಿ ಮತ್ತು ಮೆಣಸು ಹಾಕಿದ ಬಿಸಿ ನೀರು ಅಥವಾ ಕಷಾಯವನ್ನು ಕುಡಿಯಿರಿ.',
      'ತೊ೦ಡೆಯ ಗರಗರ ನಿವಾರಿಸಲು ಉಗುರುಬೆಚ್ಚಗಿನ ಉಪ್ಪು ನೀರಿನಿಂದ ಬಾಯಿ ಮುಕ್ಕಳಿಸಿ.',
      'ಚೆನ್ನಾಗಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ ಮತ್ತು ತಂಪು ಪಾನೀಯಗಳನ್ನು ಕುಡಿಯಬೇಡಿ.'
    ],
    actionNeeded: 'Take home remedies. If symptoms persist beyond 5 days, seek clinical advice.',
    actionNeededTe: 'ఇంటి చిట్కాలు పాటించండి. 5 రోజులైనా తగ్గకపోతే డాక్టర్‌ను సంప్రదించండి.',
    actionNeededHi: 'घरेलू उपचार लें। यदि लक्षण 5 दिनों के बाद भी बने रहते हैं, तो डॉक्टर की सलाह लें।',
    actionNeededTa: 'வீட்டு வைத்தியம் செய்யவும். அறிகுறிகள் 5 நாட்களுக்கு மேல் நீடித்தால், மருத்துவ ஆலோசனையைப் பெறவும்.',
    actionNeededKn: 'ಮನೆಮದ್ದುಗಳನ್ನು ಅನುಸರಿಸಿ. ರೋಗಲಕ್ಷಣಗಳು 5 ದಿನಗಳ ನಂತರವೂ ಇದ್ದರೆ ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
    shouldAlertDoctors: false
  }
];

export const parseSymptoms = (query: string): TriageResult | null => {
  const q = query.toLowerCase();
  
  // Heart / Chest Pain (English, Telugu, Hindi, Tamil, Kannada)
  if (
    q.includes('heart') || q.includes('chest') || q.includes('cardiac') ||
    q.includes('గుండె') || q.includes('ఛాతి') ||
    q.includes('दिल') || q.includes('सीने') || q.includes('हृदय') ||
    q.includes('நெஞ்சு') || q.includes('இதய') ||
    q.includes('ಎದೆ') || q.includes('ಹೃದಯ')
  ) {
    if ((q.includes('stomach') || q.includes('కడుపు') || q.includes('पेट') || q.includes('வயிறு') || q.includes('ಹೊಟ್ಟೆ')) && !q.includes('heart') && !q.includes('గుండె')) {
      // let stomach check handle it
    } else {
      return rules[0];
    }
  }

  // Breathing Difficulty
  if (
    q.includes('breath') || q.includes('suffocat') || q.includes('asthma') ||
    q.includes('శ్వాస') || q.includes('దమ్ము') || q.includes('ఆయాసం') ||
    q.includes('सांस') || q.includes('दम') || q.includes('अस्थमा') ||
    q.includes('மூச்சு') || q.includes('சுவாசம்') ||
    q.includes('ಉಸಿರಾಟ') || q.includes('ದಮ್ಮು')
  ) {
    return rules[1];
  }

  // Snake Bite
  if (
    q.includes('snake') || (q.includes('bite') && (q.includes('snake') || q.includes('venom'))) ||
    q.includes('పాము') || q.includes('కాటు') ||
    q.includes('सांप') || q.includes('ज़हर') ||
    q.includes('பாம்பு') || q.includes('விஷம்') ||
    q.includes('ಹಾವು') || q.includes('ವಿಷ')
  ) {
    if (q.includes('dog') || q.includes('कुत्ता') || q.includes('குக்கை') || q.includes('நாய்') || q.includes('ನಾಯಿ') || q.includes('కుక్క')) {
      return rules[4]; // dog bite overrides
    }
    return rules[2];
  }

  // Bleeding
  if (
    q.includes('bleed') || q.includes('hemorrhage') || q.includes('blood') ||
    q.includes('రక్తం') || q.includes('గాయం') || q.includes('దెబ్బ') ||
    q.includes('खून') || q.includes('रक्त') || q.includes('चोट') ||
    q.includes('இரத்தம்') || q.includes('காயம்') ||
    q.includes('ರಕ್ತ') || q.includes('ಗಾಯ')
  ) {
    if (q.includes('dog') || q.includes('कुत्ता') || q.includes('நாய்') || q.includes('ನಾಯಿ') || q.includes('కుక్క') || q.includes('snake') || q.includes('పాము') || q.includes('பாம்பு') || q.includes('ಹಾವು') || q.includes('सांप')) {
      // bite handles it
    } else {
      return rules[3];
    }
  }

  // Dog Bite
  if (
    q.includes('dog') || q.includes('rabies') ||
    q.includes('కుక్క') || q.includes('కరిచింది') ||
    q.includes('कुत्ता') || q.includes('काटा') ||
    q.includes('நாய்') ||
    q.includes('ನಾಯಿ')
  ) {
    return rules[4];
  }

  // Fever
  if (
    q.includes('fever') || q.includes('temperature') || q.includes('body heat') ||
    q.includes('జ్వరం') || q.includes('వేడి') ||
    q.includes('बुखार') || q.includes('ताप') ||
    q.includes('காய்ச்சல்') ||
    q.includes('ಜ್ವರ') || q.includes('ಬಿಸಿ')
  ) {
    return rules[5];
  }

  // Stomach Ache
  if (
    q.includes('stomach') || q.includes('belly') || q.includes('abdomen') ||
    q.includes('కడుపు') ||
    q.includes('पेट दर्द') || q.includes('पेट') ||
    q.includes('வயிறு') ||
    q.includes('ಹೊಟ್ಟೆ')
  ) {
    return rules[6];
  }

  // Cough & Cold
  if (
    q.includes('cough') || q.includes('cold') || q.includes('throat') || q.includes('flu') ||
    q.includes('దగ్గు') || q.includes('జలుబు') ||
    q.includes('खांसी') || q.includes('जुकाम') || q.includes('गले') ||
    q.includes('இருமல்') || q.includes('சளி') ||
    q.includes('ಕೆಮ್ಮು') || q.includes('ಶೀತ')
  ) {
    return rules[7];
  }

  // Fallback scan
  for (const rule of rules) {
    if (
      q.includes(rule.symptom.toLowerCase()) || 
      q.includes(rule.symptomTe.toLowerCase()) ||
      q.includes(rule.symptomHi.toLowerCase()) ||
      q.includes(rule.symptomTa.toLowerCase()) ||
      q.includes(rule.symptomKn.toLowerCase())
    ) {
      return rule;
    }
  }
  
  return null;
};
