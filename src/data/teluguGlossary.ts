export interface GlossaryItem {
  english: string;
  literal: string;
  literalPronunciation: string;
  everyday: string;
  everydayPronunciation: string;
  explanation: string;
}

export const teluguGlossary: GlossaryItem[] = [
  {
    english: 'Hospital Address',
    literal: 'ఆసుపత్రి చిరునామా',
    literalPronunciation: 'Aasupathri Chirunaama',
    everyday: 'ఆసుపత్రి ఉండే చోటు',
    everydayPronunciation: 'Aasupathri unde chotu',
    explanation: 'Rural elders rarely say "Chirunaama". They ask "Where is the hospital?" ("unde chotu" - the place where it is) or simply use the English word "Address".'
  },
  {
    english: 'Emergency Alert Sent',
    literal: 'అత్యవసర హెచ్చరిక పంపబడింది',
    literalPronunciation: 'Athyavasara hechcharika pampabadindi',
    everyday: 'డాక్టరుకు కబురు వెళ్ళింది',
    everydayPronunciation: 'Doctor ki kaburu vellindi',
    explanation: '"Athyavasara hechcharika" is extremely formal and Sanskritized. "Doctor ki kaburu vellindi" translates to "Word has reached the doctor", which sounds extremely natural and reassuring in villages.'
  },
  {
    english: 'Doctor Availability',
    literal: 'వైద్యుల లభ్యత',
    literalPronunciation: 'Vaidyula labhyatha',
    everyday: 'డాక్టర్ అందుబాటులో ఉన్నారా?',
    everydayPronunciation: 'Doctor andubatulo unnara?',
    explanation: '"Vaidyula labhyatha" sounds like a written government circular. In common conversation, people say "Is the doctor available?" ("andubatulo unnara?").'
  },
  {
    english: 'Nearest Government Clinic',
    literal: 'సమీప ప్రభుత్వ క్లినిక్',
    literalPronunciation: 'Sameepa prabhutva clinic',
    everyday: 'దగ్గరలో ఉండే సర్కారు ఆసుపత్రి',
    everydayPronunciation: 'Daggaralo unde sarkaru aasupathri',
    explanation: '"Sarkaru" is the word rural Telugu communities universally use for "Government", rather than the formal "Prabhutva". "Daggaralo unde" is preferred over "Sameepa".'
  },
  {
    english: 'First Aid Guidance',
    literal: 'ప్రథమ చికిత్స మార్గదర్శకత్వం',
    literalPronunciation: 'Pradhama chikitsa margadarsakatvam',
    everyday: 'ఆసుపత్రికి వెళ్లేలోపు చేయాల్సిన సహాయం',
    everydayPronunciation: 'Aasupathriki vellelopu cheyalsina sahayam',
    explanation: 'Instead of complex technical medical jargon, the colloquial phrase spells it out: "Help to be done before going to the hospital", which is immediately understood by everyone.'
  },
  {
    english: 'Speak clearly into the microphone',
    literal: 'మైక్రోఫోన్‌లోకి స్పష్టంగా మాట్లాడండి',
    literalPronunciation: 'Microphone loki spashtanga maatlaadandi',
    everyday: 'మైక్ పట్టుకుని నెమ్మదిగా మాట్లాడండి',
    everydayPronunciation: 'Mic pattukuni nemmadiga maatlaadandi',
    explanation: 'Village users respond better to "Mic pattukuni" (Hold the mic) and "Nemmadiga" (Slowly/gently) than formal instructions to speak "Spashtanga" (clearly) into the "Microphone".'
  },
  {
    english: 'Searching for Location',
    literal: 'భౌగోళిక స్థానాన్ని శోధిస్తోంది',
    literalPronunciation: 'Bhougolika sthanaanni shodhistondi',
    everyday: 'మీరు ఏ ఊరిలో ఉన్నారో చూస్తున్నాము',
    everydayPronunciation: 'Meeru ye oorilo unnaro chusthunnamu',
    explanation: '"Bhougolika sthanaanni shodhistondi" is textbook translator speak. The conversational Telugu translates to "We are looking at which village you are in", which is warm and clear.'
  }
];
