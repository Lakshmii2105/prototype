export interface Doctor {
  name: string;
  nameTe: string;
  specialty: string;
  specialtyTe: string;
  availability: 'available' | 'busy' | 'offline';
  contact: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameTe: string;
  address: string;
  addressTe: string;
  latitude: number;
  longitude: number;
  type: 'government' | 'private';
  specialties: string[];
  specialtiesTe: string[];
  contact: string;
  doctors: Doctor[];
}

export const villages = [
  { name: 'Kadapa (Town Center)', latitude: 14.4713, longitude: 78.8222 },
  { name: 'Yerraguntla (Village)', latitude: 14.6343, longitude: 78.5309 },
  { name: 'Muddanur (Village)', latitude: 14.6644, longitude: 78.4069 },
  { name: 'Vempalli (Village)', latitude: 14.3739, longitude: 78.4633 },
  { name: 'Pulivendula (Town)', latitude: 14.4172, longitude: 78.2323 }
];

export const hospitals: Hospital[] = [
  {
    id: 'ggh-kadapa',
    name: 'Government General Hospital, Kadapa',
    nameTe: 'ప్రభుత్వ సర్వజన ఆసుపత్రి, కడప',
    address: 'GGH Road, Kadapa, Andhra Pradesh',
    addressTe: 'జి.జి.హెచ్ రోడ్డు, కడప',
    latitude: 14.4780,
    longitude: 78.8180,
    type: 'government',
    specialties: ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Emergency Care', 'Maternity'],
    specialtiesTe: ['జనరల్ మెడిసిన్', 'గుండె జబ్బులు', 'పిల్లల వైద్యం', 'ఎముకల వైద్యం', 'అత్యవసర చికిత్స', 'గర్భిణీ సేవలు'],
    contact: '+91 85622 44401',
    doctors: [
      { name: 'Dr. Srinivasa Rao', nameTe: 'డా. శ్రీనివాసరావు', specialty: 'General Physician', specialtyTe: 'జనరల్ ఫిజీషియన్', availability: 'available', contact: '+91 94400 12345' },
      { name: 'Dr. K. Anitha', nameTe: 'డా. కె. అనిత', specialty: 'Gynecologist', specialtyTe: 'స్త్రీల ప్రసూతి నిపుణులు', availability: 'available', contact: '+91 94400 67890' },
      { name: 'Dr. C. Ramana Reddy', nameTe: 'డా. సి. రమణా రెడ్డి', specialty: 'Cardiologist', specialtyTe: 'గుండె జబ్బుల నిపుణులు', availability: 'busy', contact: '+91 94400 11223' }
    ]
  },
  {
    id: 'phc-yerraguntla',
    name: 'Primary Health Centre, Yerraguntla',
    nameTe: 'ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రం, యర్రగుంట్ల',
    address: 'Near RTO Office, Yerraguntla, Kadapa',
    addressTe: 'ఆర్.టి.ఓ ఆఫీస్ దగ్గర, యర్రగుంట్ల',
    latitude: 14.6320,
    longitude: 78.5340,
    type: 'government',
    specialties: ['General Medicine', 'First Aid', 'Immunization', 'Maternity Outpatient'],
    specialtiesTe: ['జనరల్ మెడిసిన్', 'ప్రథమ చికిత్స', 'టీకాలు', 'గర్భిణీ తనిఖీలు'],
    contact: '+91 85632 22102',
    doctors: [
      { name: 'Dr. P. Bhaskar', nameTe: 'డా. పి. భాస్కర్', specialty: 'Medical Officer', specialtyTe: 'వైద్యాధికారి', availability: 'available', contact: '+91 94401 22334' },
      { name: 'Dr. Swetha', nameTe: 'డా. శ్వేత', specialty: 'General Physician', specialtyTe: 'జనరల్ ఫిజీషియన్', availability: 'busy', contact: '+91 94401 55667' }
    ]
  },
  {
    id: 'chc-muddanur',
    name: 'Community Health Centre, Muddanur',
    nameTe: 'ప్రభుత్వ సామాజిక ఆరోగ్య కేంద్రం, ముద్దనూరు',
    address: 'Station Road, Muddanur, Kadapa',
    addressTe: 'స్టేషన్ రోడ్డు, ముద్దనూరు',
    latitude: 14.6680,
    longitude: 78.4020,
    type: 'government',
    specialties: ['General Medicine', 'Maternity Care', 'Pediatrics', '24/7 Emergency Outpatient'],
    specialtiesTe: ['జనరల్ మెడిసిన్', 'ప్రసూతి సేవలు', 'పిల్లల వైద్యం', '24 గంటల అత్యవసర సేవలు'],
    contact: '+91 85632 23305',
    doctors: [
      { name: 'Dr. G. Venkata Reddy', nameTe: 'డా. జి. వెంకట రెడ్డి', specialty: 'Senior Physician', specialtyTe: 'సీనియర్ ఫిజీషియన్', availability: 'available', contact: '+91 94402 33445' }
    ]
  },
  {
    id: 'gh-vempalli',
    name: 'Government Hospital, Vempalli',
    nameTe: 'ప్రభుత్వ ఆసుపత్రి, వేంపల్లి',
    address: 'Kadapa Road, Vempalli, Kadapa',
    addressTe: 'కడప రోడ్డు, వేంపల్లి',
    latitude: 14.3760,
    longitude: 78.4650,
    type: 'government',
    specialties: ['General Medicine', 'First Aid', 'Maternity', 'Emergency Outpatient'],
    specialtiesTe: ['జనరల్ మెడిసిన్', 'ప్రథమ చికిత్స', 'ప్రసూతి సేవలు', 'అత్యవసర సేవలు'],
    contact: '+91 85632 25508',
    doctors: [
      { name: 'Dr. M. Sireesha', nameTe: 'డా. ఎమ్. శిరీష', specialty: 'Medical Officer', specialtyTe: 'వైద్యాధికారి', availability: 'available', contact: '+91 94403 44556' }
    ]
  },
  {
    id: 'ah-pulivendula',
    name: 'Government Area Hospital, Pulivendula',
    nameTe: 'ప్రభుత్వ ఏరియా ఆసుపత్రి, పులివెందుల',
    address: 'Balaji Nagar, Pulivendula, Kadapa',
    addressTe: 'బాలాజీ నగర్, పులివెందుల',
    latitude: 14.4220,
    longitude: 78.2360,
    type: 'government',
    specialties: ['General Medicine', 'Surgery', 'Maternity', 'Pediatrics', 'Orthopedics', '24/7 Trauma Care'],
    specialtiesTe: ['జనరల్ మెడిసిన్', 'సర్జరీ', 'ప్రసూతి నిపుణులు', 'పిల్లల వైద్యం', 'ఎముకల వైద్యం', '24 గంటల ట్రామా కేర్'],
    contact: '+91 85632 28809',
    doctors: [
      { name: 'Dr. Y. S. Prasad', nameTe: 'డా. వై. యస్. ప్రసాద్', specialty: 'Surgeon', specialtyTe: 'సర్జన్ నిపుణులు', availability: 'available', contact: '+91 94404 55667' },
      { name: 'Dr. N. Hemalatha', nameTe: 'డా. ఎన్. హేమలత', specialty: 'Pediatrician', specialtyTe: 'పిల్లల వైద్యాధికారి', availability: 'available', contact: '+91 94404 88990' },
      { name: 'Dr. Sudhakar', nameTe: 'డా. సుధాకర్', specialty: 'Orthopedic Surgeon', specialtyTe: 'ఎముకల సర్జన్', availability: 'offline', contact: '+91 94404 99001' }
    ]
  },
  {
    id: 'skc-yerraguntla',
    name: 'Sri Krishna Private Clinic, Yerraguntla',
    nameTe: 'శ్రీ కృష్ణ ప్రైవేట్ క్లినిక్, యర్రగుంట్ల',
    address: 'Bazar Street, Yerraguntla, Kadapa',
    addressTe: 'బజార్ వీధి, యర్రగుంట్ల',
    latitude: 14.6370,
    longitude: 78.5270,
    type: 'private',
    specialties: ['General Practice', 'Pediatrics', 'Pharmacy'],
    specialtiesTe: ['జనరల్ ప్రాక్టీస్', 'పిల్లల వైద్యం', 'మందుల షాపు'],
    contact: '+91 99887 76655',
    doctors: [
      { name: 'Dr. K. Krishna Murthy', nameTe: 'డా. కె. కృష్ణమూర్తి', specialty: 'Pediatric Specialist', specialtyTe: 'పిల్లల స్పెషలిస్ట్', availability: 'available', contact: '+91 99887 11223' }
    ]
  },
  {
    id: 'reddy-ortho-pulivendula',
    name: 'Reddy Emergency Hospital, Pulivendula',
    nameTe: 'రెడ్డి ఎమర్జెన్సీ హాస్పిటల్ (ప్రైవేట్), పులివెందుల',
    address: 'Kadiri Road, Pulivendula, Kadapa',
    addressTe: 'కదిరి రోడ్డు, పులివెందుల',
    latitude: 14.4140,
    longitude: 78.2280,
    type: 'private',
    specialties: ['Orthopedic Surgery', 'Emergency Trauma', 'X-Ray & Lab'],
    specialtiesTe: ['ఎముకల సర్జరీ', 'అత్యవసర చికిత్స', 'ఎక్స్-రే & ల్యాబ్'],
    contact: '+91 85632 29911',
    doctors: [
      { name: 'Dr. G. Ravindra Reddy', nameTe: 'డా. జి. రవీంద్ర రెడ్డి', specialty: 'Ortho Specialist', specialtyTe: 'ఎముకల స్పెషలిస్ట్', availability: 'busy', contact: '+91 98765 43210' }
    ]
  },
  {
    id: 'padmavathi-vempalli',
    name: 'Padmavathi Clinic, Vempalli',
    nameTe: 'పద్మావతి క్లినిక్ (ప్రైవేట్), వేంపల్లి',
    address: 'Main Road, Vempalli, Kadapa',
    addressTe: 'మెయిన్ రోడ్డు, వేంపల్లి',
    latitude: 14.3720,
    longitude: 78.4600,
    type: 'private',
    specialties: ['General Medicine', 'First Aid'],
    specialtiesTe: ['జనరల్ మెడిసిన్', 'ప్రథమ చికిత్స'],
    contact: '+91 99499 88776',
    doctors: [
      { name: 'Dr. P. Rajeswari', nameTe: 'డా. పి. రాజేశ్వరి', specialty: 'General Practitioner', specialtyTe: 'జనరల్ డాక్టర్', availability: 'available', contact: '+91 99499 11223' }
    ]
  }
];
