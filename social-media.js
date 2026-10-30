/* Social media copy desk — day / month / year · English + Telugu. */
(function () {
  'use strict';
  var T = window.RasiTransit;
  if (!T) return;

  var GLYPH = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  var LORDS = ['Kuja', 'Shukra', 'Budha', 'Chandra', 'Surya', 'Budha', 'Shukra', 'Kuja', 'Guru', 'Shani', 'Shani', 'Guru'];
  var LUCKY_NUM = ['9, 18, 27', '6, 15, 24', '5, 14, 23', '2, 7, 16', '1, 10, 19', '5, 14, 23', '6, 15, 24', '9, 18, 27', '3, 12, 21', '8, 17, 26', '4, 13, 22', '3, 12, 21'];
  var LUCKY_COLOR = ['Red', 'White', 'Green', 'Silver', 'Gold', 'Green', 'Pink', 'Deep red', 'Yellow', 'Navy', 'Blue', 'Sea-green'];
  var LUCKY_COLOR_TE = ['ఎరుపు', 'తెలుపు', 'పచ్చ', 'వెండి రంగు', 'బంగారు రంగు', 'పచ్చ', 'గులాబీ రంగు', 'ముదురు ఎరుపు', 'పసుపు రంగు', 'నలుపు-నీలం', 'నీలం', 'పచ్చని నీలం'];
  var LUCKY_DIR = ['East', 'South', 'West', 'North', 'East', 'South', 'West', 'North', 'East', 'South', 'West', 'North'];
  var LUCKY_DIR_TE = ['తూర్పు', 'దక్షిణం', 'పడమర', 'ఉత్తరం', 'తూర్పు', 'దక్షిణం', 'పడమర', 'ఉత్తరం', 'తూర్పు', 'దక్షిణం', 'పడమర', 'ఉత్తరం'];
  var DEITY = ['Kartikeya / Hanuman', 'Lakshmi', 'Vishnu', 'Parvati', 'Surya', 'Vishnu', 'Lakshmi', 'Kartikeya', 'Guru / Datta', 'Shiva / Shani', 'Shiva', 'Vishnu / Guru'];
  var DEITY_TE = ['కుమారస్వామి లేదా ఆంజనేయుడు', 'లక్ష్మీదేవి', 'శ్రీ మహావిష్ణువు', 'పార్వతీదేవి', 'సూర్యభగవానుడు', 'శ్రీ మహావిష్ణువు', 'లక్ష్మీదేవి', 'కుమారస్వామి', 'దత్తాత్రేయ స్వామి', 'శివుడు లేదా శని', 'శివుడు', 'శ్రీ మహావిష్ణువు'];
  var WEEKDAY_TE = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
  var WEEKDAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTH_TE = ['', 'జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
  var MONTH_EN = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var GRAHA_TE = {
    Surya: 'సూర్యుడు', Chandra: 'చంద్రుడు', Kuja: 'కుజుడు', Budha: 'బుధుడు',
    Guru: 'గురుడు', Shukra: 'శుక్రుడు', Shani: 'శని', Rahu: 'రాహు', Ketu: 'కేతు'
  };

  var MOON_EN = {
    1: 'Moon in 1st — energy and presence rise. Lead with a calm face.',
    2: 'Moon in 2nd — family talk and food matter. Keep speech sweet; watch spends.',
    3: 'Moon in 3rd — courage and short travel help. Send the message; take the small trip.',
    4: 'Moon in 4th — home and rest need care. Do not carry office stress indoors.',
    5: 'Moon in 5th — romance, study and children glow. Create, but skip wild bets.',
    6: 'Moon in 6th — work and health routines win. Finish tasks; eat on time.',
    7: 'Moon in 7th — partners and public are loud. Listen twice before you answer.',
    8: 'Moon in 8th — emotions run deep. Avoid sudden money or secret deals.',
    9: 'Moon in 9th — luck, guru and long plans open. A prayer or a teacher helps.',
    10: 'Moon in 10th — career is visible. One good result beats ten promises.',
    11: 'Moon in 11th — gains and friends support you. Ask, collect, network.',
    12: 'Moon in 12th — rest, foreign and expenses. Sleep well; do not overspend.'
  };
  var BHAVA_TE = ['', 'మొదటి', 'రెండవ', 'మూడవ', 'నాలుగవ', 'ఐదవ', 'ఆరవ', 'ఏడవ', 'ఎనిమిదవ', 'తొమ్మిదవ', 'పదవ', 'పదకొండవ', 'పన్నెండవ'];
  var MOOD_TE = { Favourable: 'అనుకూలమైన సమయం', Caution: 'జాగ్రత్తగా ఉండాల్సిన సమయం', Mixed: 'మిశ్రమ ఫలితాలు' };

  var MOON_TE = {
    1: 'ఈ రోజు చంద్రుడు మీ మొదటి భావంలో సంచరిస్తున్నారు. శరీరంలో ఉత్సాహం పెరుగుతుంది, మీ ఉనికి కనిపిస్తుంది. ప్రశాంతంగా ముందుకు వెళ్లండి.',
    2: 'ఈ రోజు చంద్రుడు మీ రెండవ భావంలో ఉన్నారు. కుటుంబం, ఆహారం, మాటలు ముఖ్యం. తియ్యగా మాట్లాడండి. అనవసరపు ఖర్చు ఆపండి.',
    3: 'ఈ రోజు చంద్రుడు మీ మూడవ భావంలో ఉన్నారు. ధైర్యం, సోదరులు, చిన్న ప్రయాణాలు సాయపడతాయి. అవసరమైన సందేశం పంపండి.',
    4: 'ఈ రోజు చంద్రుడు మీ నాలుగవ భావంలో ఉన్నారు. ఇల్లు, తల్లి, మనశ్శాంతి ముఖ్యం. పని ఒత్తిడిని ఇంట్లోకి తీసుకురావద్దు.',
    5: 'ఈ రోజు చంద్రుడు మీ ఐదవ భావంలో ఉన్నారు. ప్రేమ, చదువు, పిల్లల విషయాలు ముందుకు వస్తాయి. సృజనాత్మకంగా ఉండండి, జూదం మానండి.',
    6: 'ఈ రోజు చంద్రుడు మీ ఆరవ భావంలో ఉన్నారు. పని, ఆరోగ్యం, రోజువారీ క్రమం గెలుస్తాయి. పని పూర్తి చేయండి. సమయానికి భోజనం చేయండి.',
    7: 'ఈ రోజు చంద్రుడు మీ ఏడవ భావంలో ఉన్నారు. జీవిత భాగస్వామి, వ్యాపార భాగస్వాములు ముందుకు వస్తారు. జవాబు చెప్పే ముందు రెండుసార్లు వినండి.',
    8: 'ఈ రోజు చంద్రుడు మీ ఎనిమిదవ భావంలో ఉన్నారు. మనసు లోతుగా కదులుతుంది. ఆకస్మిక డబ్బు వ్యవహారాలు, రహస్య ఒప్పందాలు ఈ రోజు మానండి.',
    9: 'ఈ రోజు చంద్రుడు మీ తొమ్మిదవ భావంలో ఉన్నారు. అదృష్టం, గురువు, దూరపు పనులు తెరుచుకుంటాయి. ప్రార్థన లేదా పెద్దల మాట సాయపడుతుంది.',
    10: 'ఈ రోజు చంద్రుడు మీ పదవ భావంలో ఉన్నారు. ఉద్యోగం, గుర్తింపు బయటకు కనిపిస్తాయి. పది మాటల కంటే ఒక పూర్తి పని మేలు.',
    11: 'ఈ రోజు చంద్రుడు మీ పదకొండవ భావంలో ఉన్నారు. లాభాలు, స్నేహితులు, పరిచయాలు సాయపడతాయి. అడగండి, రావాల్సిన డబ్బు వసూలు చేయండి.',
    12: 'ఈ రోజు చంద్రుడు మీ పన్నెండవ భావంలో ఉన్నారు. విశ్రాంతి, విదేశాలు, ఖర్చులు ముందుకు వస్తాయి. బాగా నిద్రపోండి. అవసరం లేని ఖర్చు మానండి.'
  };

  var SUN_TE = {
    1: 'సూర్యుడు మీ మొదటి భావంలో ఉన్నారు. మీరే ఈ రోజు కేంద్రం. అహం చూపకుండా మీ పనిని కనబరచండి.',
    2: 'సూర్యుడు మీ రెండవ భావంలో ఉన్నారు. డబ్బు, మాట, కుటుంబం మీద దృష్టి పెట్టండి.',
    3: 'సూర్యుడు మీ మూడవ భావంలో ఉన్నారు. కృషి, ప్రయాణం, సోదరుల విషయాలు ముందుకు వెళ్తాయి.',
    4: 'సూర్యుడు మీ నాలుగవ భావంలో ఉన్నారు. ఇల్లు, వాహనం, మనశ్శాంతి ఈ రోజు ముఖ్యం.',
    5: 'సూర్యుడు మీ ఐదవ భావంలో ఉన్నారు. చదువు, పిల్లలు, సృజనాత్మక పనులకు వెలుగు ఉంది.',
    6: 'సూర్యుడు మీ ఆరవ భావంలో ఉన్నారు. సేవ, ఆరోగ్యం, పోటీదారుల విషయంలో క్రమశిక్షణ పాటించండి.',
    7: 'సూర్యుడు మీ ఏడవ భావంలో ఉన్నారు. వివాహం, భాగస్వామ్యం, బయటి వ్యవహారాలు కనిపిస్తాయి.',
    8: 'సూర్యుడు మీ ఎనిమిదవ భావంలో ఉన్నారు. దాగిన విషయాలు, పన్నులు, పరిశోధన — నెమ్మదిగా ముందుకు వెళ్లండి.',
    9: 'సూర్యుడు మీ తొమ్మిదవ భావంలో ఉన్నారు. ధర్మం, తండ్రి, గురువు, దూర ప్రయాణం అనుకూలం.',
    10: 'సూర్యుడు మీ పదవ భావంలో ఉన్నారు. ఉద్యోగం, అధికారం, పేరు ఈ రోజు ముందుకు వస్తాయి.',
    11: 'సూర్యుడు మీ పదకొండవ భావంలో ఉన్నారు. లాభాలు, ఆశలు, పెద్ద స్నేహితుల సాయం దొరుకుతుంది.',
    12: 'సూర్యుడు మీ పన్నెండవ భావంలో ఉన్నారు. ఖర్చులు, విదేశాలు, ఒంటరితనం — విశ్రాంతి తీసుకోండి.'
  };

  var CAREER_EN = {
    1: 'Career: You are on stage. Present, then deliver.',
    2: 'Career: Speech and billing count. Keep words clean.',
    3: 'Career: Effort, siblings and short trips help the file move.',
    4: 'Career: Work-from-home or property themes. Protect peace.',
    5: 'Career: Ideas and students shine. Skip speculation at office.',
    6: 'Career: Service and rivals. Do the duty; do not pick a fight.',
    7: 'Career: Clients and contracts. Sign only after a second read.',
    8: 'Career: Research, tax, hidden work. Slow and factual.',
    9: 'Career: Boss, law, long travel. Ethics bring help.',
    10: 'Career: Peak visibility. One finished job beats five plans.',
    11: 'Career: Networks and gains. Ask the right friend.',
    12: 'Career: Foreign, hospitals, behind-the-scenes. Rest between shifts.'
  };
  var CAREER_TE = {
    1: 'ఉద్యోగం: మీరు ముందున్నట్టు కనిపిస్తారు. ముందు చెప్పి, తర్వాత పని పూర్తి చేయండి.',
    2: 'ఉద్యోగం: మాటలు, బిల్లులు, లెక్కలు ముఖ్యం. నిర్మలంగా, స్పష్టంగా మాట్లాడండి.',
    3: 'ఉద్యోగం: కృషి, సోదరుల సాయం, చిన్న ప్రయాణం పనిని ముందుకు కదుపుతాయి.',
    4: 'ఉద్యోగం: ఇంటి నుంచి పని లేదా ఆస్తి సంబంధిత విషయాలు వస్తాయి. మనశ్శాంతి కాపాడుకోండి.',
    5: 'ఉద్యోగం: కొత్త ఆలోచనలు, శిక్షణ, విద్యార్థుల విషయాలు ముందుకు వస్తాయి. కార్యాలయంలో జూదం మానండి.',
    6: 'ఉద్యోగం: సేవ, పోటీదారులు ముందున్నారు. మీ కర్తవ్యం చేయండి. గొడవ పెట్టుకోవద్దు.',
    7: 'ఉద్యోగం: వ్యాపార భాగస్వాములు, ఒప్పందాలు ముందుకు వస్తాయి. రెండుసార్లు చదివి సంతకం పెట్టండి.',
    8: 'ఉద్యోగం: పరిశోధన, పన్నులు, దాగిన పనులు ఉంటాయి. నెమ్మదిగా, నిజాయితీగా ముందుకు వెళ్లండి.',
    9: 'ఉద్యోగం: అధికారులు, న్యాయం, దూర ప్రయాణం. నీతిగా ఉంటే సాయం వస్తుంది.',
    10: 'ఉద్యోగం: గుర్తింపు ఎక్కువగా ఉంటుంది. ఐదు పథకాల కంటే ఒక పూర్తయిన పని మేలు.',
    11: 'ఉద్యోగం: పరిచయాలు, లాభాలు సాయపడతాయి. సరైన వ్యక్తిని సమయానికి అడగండి.',
    12: 'ఉద్యోగం: విదేశాలు, ఆసుపత్రి, వెనుకనుంచి జరిగే పనులు. మధ్యలో విశ్రాంతి తీసుకోండి.'
  };

  var MONEY_EN = {
    1: 'Money: Self-worth first. Do not buy to impress.',
    2: 'Money: Savings and family cash. Count twice.',
    3: 'Money: Small trades and skills. Effort brings a little extra.',
    4: 'Money: Home, vehicle, land. Repair, do not rush a loan.',
    5: 'Money: Speculation is noisy. Prefer salary over bets.',
    6: 'Money: Debts and dues. Pay one bill; avoid new EMIs.',
    7: 'Money: Joint accounts and deals. Keep papers clear.',
    8: 'Money: Sudden in/out. No secret lending today.',
    9: 'Money: Fortune through dharma. Charity of a small amount helps.',
    10: 'Money: Status income. Ask for what the work is worth.',
    11: 'Money: Gains and collections. Follow up pending money.',
    12: 'Money: Expenses and foreign spend. Keep a cap.'
  };
  var MONEY_TE = {
    1: 'ధనం: ముందు మీ విలువను గుర్తించండి. ఇతరులకు చూపించడం కోసం కొనుగోళ్లు చేయవద్దు.',
    2: 'ధనం: పొదుపు, కుటుంబ ఆర్థిక వ్యవహారాలు ముఖ్యం. లెక్కలు రెండుసార్లు చూసుకోండి.',
    3: 'ధనం: చిన్న వ్యాపారం, చేతి నైపుణ్యం కాస్త అదనపు ఆదాయం తెస్తాయి.',
    4: 'ధనం: ఇల్లు, వాహనం, భూమి విషయాలు. మరమ్మత్తు చేయించండి. రుణం తీసుకోవడంలో తొందరపడవద్దు.',
    5: 'ధనం: ఊహాజనిత లాభాలు గందరగోళం కలిగిస్తాయి. జూదం కంటే స్థిరమైన ఆదాయమే మేలు.',
    6: 'ధనం: అప్పులు, బిల్లులు గుర్తుకు వస్తాయి. ఒక బిల్లు కట్టండి. కొత్త వాయిదాలు మొదలుపెట్టవద్దు.',
    7: 'ధనం: ఉమ్మడి ఖాతాలు, భాగస్వామ్య ఒప్పందాలు. కాగితాలు స్పష్టంగా ఉంచండి.',
    8: 'ధనం: ఆకస్మిక ఆదాయం లేదా ఖర్చు రావచ్చు. రహస్యంగా అప్పు ఇవ్వవద్దు, తీసుకోవద్దు.',
    9: 'ధనం: ధర్మం పాటిస్తే అదృష్టం ఉంటుంది. చిన్న దానం చేయడం మంచిది.',
    10: 'ధనం: పని ద్వారా గౌరవం, ఆదాయం. మీ పని విలువను స్పష్టంగా చెప్పండి.',
    11: 'ధనం: లాభాలు, వసూళ్లు సాధ్యం. రావాల్సిన డబ్బు కోసం మళ్లీ మాట్లాడండి.',
    12: 'ధనం: ఖర్చులు, విదేశీ ఖర్చు పెరగవచ్చు. ఒక పరిమితి పెట్టుకోండి.'
  };

  var LOVE_EN = {
    1: 'Love: You set the tone. Soft voice, firm boundary.',
    2: 'Love: Family and food heal. Share a meal, not a lecture.',
    3: 'Love: Texts and short visits. Say it kindly.',
    4: 'Love: Home is the temple. Reduce noise and screens.',
    5: 'Love: Romance and children. Play, do not test.',
    6: 'Love: Service over argument. Help first.',
    7: 'Love: Partner is the mirror. Listen more than you win.',
    8: 'Love: Old wounds may surface. Do not reopen every file.',
    9: 'Love: Blessing from elders. A temple visit cools the heart.',
    10: 'Love: Work may steal time. Give one honest hour at home.',
    11: 'Love: Friends turn warm. Group joy is enough.',
    12: 'Love: Space and sleep. Forgive; do not chase.'
  };
  var LOVE_TE = {
    1: 'కుటుంబం–ప్రేమ: మీ మాటే స్వరం అవుతుంది. మృదువుగా మాట్లాడండి, అవసరమైన చోట హద్దు పెట్టండి.',
    2: 'కుటుంబం–ప్రేమ: కుటుంబంతో కలిసి భోజనం చేయండి. ఉపన్యాసం కాదు, ప్రేమ కావాలి.',
    3: 'కుటుంబం–ప్రేమ: సందేశాలు, చిన్న సందర్శనలు సరిపోతాయి. మంచిగా, తక్కువగా మాట్లాడండి.',
    4: 'కుటుంబం–ప్రేమ: ఇల్లే ఆలయం. అవసరం లేని శబ్దం, ఫోన్ తగ్గించండి.',
    5: 'కుటుంబం–ప్రేమ: ప్రేమ, పిల్లలు, ఆనందం ముందుకు వస్తాయి. ఆడుకోండి. ఒకరిని పరీక్షించవద్దు.',
    6: 'కుటుంబం–ప్రేమ: వాదన కంటే సాయం మేలు. ముందు చేయి అందించండి.',
    7: 'కుటుంబం–ప్రేమ: జీవిత భాగస్వామి మీ అద్దం. గెలవాలని కాదు, వినాలని ప్రయత్నించండి.',
    8: 'కుటుంబం–ప్రేమ: పాత బాధలు గుర్తుకు రావచ్చు. అన్ని పాత విషయాలను మళ్లీ తెరవవద్దు.',
    9: 'కుటుంబం–ప్రేమ: పెద్దల ఆశీర్వాదం ఉంటుంది. దేవాలయం వెళ్లడం మనసును చల్లబరుస్తుంది.',
    10: 'కుటుంబం–ప్రేమ: పని సమయం తీసుకుంటుంది. ఇంట్లో కనీసం ఒక గంట నిజాయితీగా ఇవ్వండి.',
    11: 'కుటుంబం–ప్రేమ: స్నేహితులు వెచ్చగా ఉంటారు. కలిసి గడపడమే చాలు.',
    12: 'కుటుంబం–ప్రేమ: కొంచెం దూరం, నిద్ర అవసరం. క్షమించండి. వెంటాడకండి.'
  };

  var HEALTH_EN = {
    1: 'Health: Head, heat, vitality. Water, shade, no ego driving.',
    2: 'Health: Throat, food, face. Warm meals; less spice-talk.',
    3: 'Health: Arms, lungs, nerves. Walk; do not over-message.',
    4: 'Health: Chest and sleep. Early night is medicine.',
    5: 'Health: Stomach and mind. Light food; skip late caffeine.',
    6: 'Health: Routine beats illness. Medicine on time if needed.',
    7: 'Health: Kidneys, balance. Do not skip water or meals.',
    8: 'Health: Nerves and fear. Slow breath; no self-diagnosis spiral.',
    9: 'Health: Hips, liver, faith. Walk in daylight.',
    10: 'Health: Bones, knees, duty. Stretch; do not sit all day.',
    11: 'Health: Circulation, friends’ habits. Choose sober company.',
    12: 'Health: Feet, sleep, isolation. Rest is the real work.'
  };
  var HEALTH_TE = {
    1: 'ఆరోగ్యం: తలనొప్పి, వేడి, అలసట ఉండవచ్చు. నీళ్లు ఎక్కువ తాగండి. అతి వేగంగా వాహనం నడపవద్దు.',
    2: 'ఆరోగ్యం: గొంతు, ముఖం, ఆహారం జాగ్రత్త. వెచ్చని భోజనం మేలు. కారంగా మాట్లాడవద్దు.',
    3: 'ఆరోగ్యం: చేతులు, నరాలు, శ్వాస. కొంచెం నడవండి. సందేశాల్లో అతిగా ఉండవద్దు.',
    4: 'ఆరోగ్యం: ఛాతీ, నిద్ర ముఖ్యం. తొందరగా పడుకోవడమే మందు.',
    5: 'ఆరోగ్యం: జీర్ణవ్యవస్థ, మనసు. తేలికపాటి ఆహారం తీసుకోండి. రాత్రి ఆలస్యంగా కాఫీ మానండి.',
    6: 'ఆరోగ్యం: రోజువారీ క్రమం రోగాన్ని అడ్డుకుంటుంది. మందులు ఉంటే సమయానికి తీసుకోండి.',
    7: 'ఆరోగ్యం: నీరు, ఉప్పు, సమతుల్యం. భోజనం వదలకండి. నీళ్లు తాగడం మరవవద్దు.',
    8: 'ఆరోగ్యం: భయం, నరాల ఒత్తిడి ఉండవచ్చు. నెమ్మదిగా ఊపిరి తీసుకోండి. స్వయంగా వ్యాధి నిర్ధారణ చేసుకోవద్దు.',
    9: 'ఆరోగ్యం: నడుము, కాలేయం. పగటిపూట కొంచెం నడవండి. నమ్మకం ఉంచుకోండి.',
    10: 'ఆరోగ్యం: ఎముకలు, మోకాళ్లు, నిలబడి పని. కొంచెం సాగదీయండి. రోజంతా కూర్చోవద్దు.',
    11: 'ఆరోగ్యం: స్నేహితుల అలవాట్లు మీ మీద పడవచ్చు. మితంగా, స్వచ్ఛంగా ఉండే వారితో ఉండండి.',
    12: 'ఆరోగ్యం: పాదాలు, నిద్ర, ఒంటరితనం. నిజమైన పని విశ్రాంతే.'
  };

  var GURU_EN = {
    1: 'Jupiter on self — growth through character and teaching.',
    2: 'Jupiter on wealth — family and speech can increase store.',
    3: 'Jupiter on effort — courage and skills expand if you practise.',
    4: 'Jupiter on home — peace, mother, property need wisdom not haste.',
    5: 'Jupiter on 5th — children, mantra, study are blessed. Stay ethical.',
    6: 'Jupiter in 6th — patience with health, debts, service. Study still protects.',
    7: 'Jupiter on partner — decent deals and guidance through others.',
    8: 'Jupiter in 8th — occult, tax, research. Charity and a guru help.',
    9: 'Jupiter on luck — dharma, father, long travel open doors.',
    10: 'Jupiter on karma — career grows if you stay a student of duty.',
    11: 'Jupiter on gains — friends and hopes can bear fruit.',
    12: 'Jupiter in 12th — foreign, rest, moksha. Spend on dharma, not show.'
  };
  var GURU_TE = {
    1: 'గురుడు మీ లగ్నంలో ఉన్నారు. మంచి నడవడిక, నేర్పు ద్వారా మీరు ఎదుగుతారు.',
    2: 'గురుడు మీ రెండవ భావంలో ఉన్నారు. కుటుంబం, మాటల ద్వారా ధనం నిలుస్తుంది.',
    3: 'గురుడు మీ మూడవ భావంలో ఉన్నారు. సాధన చేస్తే ధైర్యం, నైపుణ్యం పెరుగుతాయి.',
    4: 'గురుడు మీ నాలుగవ భావంలో ఉన్నారు. ఇల్లు, తల్లి, ఆస్తి విషయాల్లో తొందరపడకుండా వివేకంతో నిర్ణయం తీసుకోండి.',
    5: 'గురుడు మీ ఐదవ భావంలో ఉన్నారు. పిల్లలు, చదువు, పూజా కార్యాలు అనుకూలం. నీతిని వదలకండి.',
    6: 'గురుడు మీ ఆరవ భావంలో ఉన్నారు. ఆరోగ్యం, అప్పులు, సేవలో ఓపిక కావాలి. చదువు, దానం రక్షిస్తాయి.',
    7: 'గురుడు మీ ఏడవ భావంలో ఉన్నారు. మంచి ఒప్పందాలు, ఇతరుల ద్వారా మార్గదర్శనం లభిస్తాయి.',
    8: 'గురుడు మీ ఎనిమిదవ భావంలో ఉన్నారు. పన్నులు, పరిశోధన, దాగిన విషయాలు. గురువు సాయం, దానం మేలు చేస్తాయి.',
    9: 'గురుడు మీ తొమ్మిదవ భావంలో ఉన్నారు. ధర్మం, తండ్రి, గురువు, దూర ప్రయాణం తలుపులు తెరుస్తాయి.',
    10: 'గురుడు మీ పదవ భావంలో ఉన్నారు. కర్తవ్యాన్ని నేర్చుకుంటూ ఉంటే ఉద్యోగం ఎదుగుతుంది.',
    11: 'గురుడు మీ పదకొండవ భావంలో ఉన్నారు. స్నేహితులు, ఆశలు ఫలిస్తాయి.',
    12: 'గురుడు మీ పన్నెండవ భావంలో ఉన్నారు. విదేశాలు, విశ్రాంతి, ఆధ్యాత్మికం. చూపు కోసం కాదు, ధర్మం కోసం ఖర్చు పెట్టండి.'
  };

  var SHANI_EN = {
    1: 'Saturn on lagna — duty, health, identity. One job at a time.',
    2: 'Saturn on 2nd — family accounts and speech. Slow saving wins.',
    3: 'Saturn in 3rd — effort is your friend. Keep writing, keep walking.',
    4: 'Saturn on home — delays in peace or property. Structure the day.',
    5: 'Saturn on 5th — study and children need patience, not pressure.',
    6: 'Saturn in 6th — classic help: work, rivals, debts yield to discipline.',
    7: 'Saturn on 7th — contracts and spouse test time. Do not rush marriage talk.',
    8: 'Saturn in 8th — Ashtama feel. Insurance, research, no sudden risk.',
    9: 'Saturn on 9th — dharma is heavy. Keep the promise to a teacher.',
    10: 'Saturn on 10th — career mountain. Climb daily; skip shortcuts.',
    11: 'Saturn in 11th — gains after labour. Friends who work are gold.',
    12: 'Saturn in 12th — Sade Sati first phase possible. Endings, foreign, rest.'
  };
  var SHANI_TE = {
    1: 'శని మీ లగ్నంలో ఉన్నారు. ఆరోగ్యం, బాధ్యత, గుర్తింపు పరీక్షకు నిలుస్తాయి. ఒకసారికి ఒక పనే చేయండి.',
    2: 'శని మీ రెండవ భావంలో ఉన్నారు. కుటుంబ లెక్కలు, మాటలు నెమ్మదిగా సరిచేసుకోండి. నిదానంగా పొదుపు చేయడం గెలుస్తుంది.',
    3: 'శని మీ మూడవ భావంలో ఉన్నారు. కృషే మీ స్నేహితుడు. రాయడం, నడవడం ఆపకండి.',
    4: 'శని మీ నాలుగవ భావంలో ఉన్నారు. ఇల్లు, ఆస్తి విషయాల్లో ఆలస్యం ఉండవచ్చు. రోజును క్రమపరచుకోండి.',
    5: 'శని మీ ఐదవ భావంలో ఉన్నారు. చదువు, పిల్లల విషయాల్లో ఒత్తిడి కాదు, ఓపిక కావాలి.',
    6: 'శని మీ ఆరవ భావంలో ఉన్నారు. ఇది మంచి స్థానం. పని, పోటీ, అప్పులు క్రమశిక్షణకు లొంగుతాయి.',
    7: 'శని మీ ఏడవ భావంలో ఉన్నారు. వివాహం, ఒప్పందాలు సమయాన్ని పరీక్షిస్తాయి. తొందరపడి మాట ఇవ్వవద్దు.',
    8: 'శని మీ ఎనిమిదవ భావంలో ఉన్నారు. అష్టమ శని భావం. బీమా, పరిశోధన మంచివి. ఆకస్మిక ప్రమాదాలు మానండి.',
    9: 'శని మీ తొమ్మిదవ భావంలో ఉన్నారు. ధర్మం బరువుగా అనిపిస్తుంది. గురువుకు ఇచ్చిన మాట నిలబెట్టుకోండి.',
    10: 'శని మీ పదవ భావంలో ఉన్నారు. ఉద్యోగం ఒక పర్వతం లాంటిది. ప్రతి రోజు కొంచెం ఎక్కండి. సులభమార్గాలు వద్దు.',
    11: 'శని మీ పదకొండవ భావంలో ఉన్నారు. కష్టపడిన తర్వాతే లాభం. పని చేసే స్నేహితులే నిజమైన సంపద.',
    12: 'శని మీ పన్నెండవ భావంలో ఉన్నారు. సడెసతి మొదటి దశ కావచ్చు. ముగింపులు, విదేశాలు, విశ్రాంతి ముందుకు వస్తాయి.'
  };

  var state = { period: 'day', today: null, monthMid: null, monthStart: null, monthEnd: null, yearStart: null, parts: null, posts: [] };

  function housesOf(chart, rasiIdx) {
    var map = {};
    T.GRAHAS.forEach(function (g) {
      map[g] = T.houseFrom(rasiIdx, chart.grahas[g].rashiIdx);
    });
    return map;
  }

  function toneMoon(h) {
    if ([1, 3, 6, 10, 11].indexOf(h) >= 0) return { en: 'Favourable', te: MOOD_TE.Favourable, emoji: '🟢' };
    if ([4, 8, 12].indexOf(h) >= 0) return { en: 'Caution', te: MOOD_TE.Caution, emoji: '🟠' };
    return { en: 'Mixed', te: MOOD_TE.Mixed, emoji: '🔵' };
  }

  function yearlyMood(h) {
    var guruGood = [1, 2, 5, 7, 9, 11].indexOf(h.Guru) >= 0;
    var ss = [12, 1, 2].indexOf(h.Shani) >= 0;
    if (guruGood && !ss) return { en: 'Favourable', te: MOOD_TE.Favourable, emoji: '🟢' };
    if (!guruGood && ss) return { en: 'Caution', te: MOOD_TE.Caution, emoji: '🟠' };
    return { en: 'Mixed', te: MOOD_TE.Mixed, emoji: '🔵' };
  }

  function lastDayOfMonth(y, m) {
    return new Date(Date.UTC(y, m, 0)).getUTCDate();
  }

  function weekdayIdx(name) {
    var i = WEEKDAY_EN.indexOf(name);
    return i < 0 ? 0 : i;
  }

  function tags(i, period) {
    var r = T.RASHIS[i];
    var en = T.RASHI_EN[i];
    var te = T.RASHI_TE[i].replace(/\s/g, '');
    var p = period === 'day' ? 'DailyHoroscope' : (period === 'month' ? 'MonthlyHoroscope' : 'YearlyHoroscope');
    var pTe = period === 'day' ? 'ఈరోజురాశిఫలం' : (period === 'month' ? 'ఈనెలరాశిఫలం' : 'సంవత్సరరాశిఫలం');
    return '#' + r + ' #' + en + ' #' + te + 'రాశి #Rashifal #రాశిఫలం #' + p + ' #' + pTe + ' #ScientificAstrology';
  }

  function sadeNote(rasiIdx, shaniIdx, te) {
    var h = T.houseFrom(rasiIdx, shaniIdx);
    if (h === 12) return te
      ? 'శని సడెసతి మొదటి దశ — చంద్రుడికి పన్నెండవ భావంలో శని. ఒత్తిడి, ముగింపులు ఉంటాయి. ఒక కర్తవ్యం చేస్తే చాలు.'
      : 'Sade Sati first phase (12th from Moon) — pressure and endings. One duty is enough.';
    if (h === 1) return te
      ? 'శని సడెసతి గరిష్ఠ దశ — చంద్రుడి రాశిలోనే శని. ఆరోగ్యం, గుర్తింపు, బాధ్యతలు బరువుగా ఉంటాయి. నిద్ర, రోజువారీ క్రమం రక్షణ.'
      : 'Sade Sati peak (1st from Moon) — health, identity, duty. Sleep and routine protect.';
    if (h === 2) return te
      ? 'శని సడెసతి చివరి దశ — చంద్రుడికి రెండవ భావంలో శని. కుటుంబం, మాటలు, ఆర్థిక వ్యవహారాలు సరిచేసుకోండి.'
      : 'Sade Sati last phase (2nd from Moon) — family, speech, resources. Settle accounts.';
    return '';
  }

  function dayPost(i, chart, parts, lang) {
    var h = housesOf(chart, i);
    var mood = toneMoon(h.Chandra);
    var dateEn = T.pad(parts.day) + ' ' + MONTH_EN[parts.month] + ' ' + parts.year;
    var dateTe = T.pad(parts.day) + ' ' + MONTH_TE[parts.month] + ' ' + parts.year;
    var wd = weekdayIdx(parts.weekday);
    var headEn = GLYPH[i] + ' ' + T.RASHIS[i] + ' | ' + T.RASHI_EN[i] + ' | ' + T.RASHI_TE[i] + '\n📅 Daily Rashifal · ' + WEEKDAY_EN[wd] + ', ' + dateEn;
    var headTe = GLYPH[i] + ' ' + T.RASHI_TE[i] + ' రాశి | ' + T.RASHIS[i] + ' | ' + T.RASHI_EN[i] + '\n📅 ఈరోజు రాశిఫలం · ' + WEEKDAY_TE[wd] + ', ' + dateTe;
    var extraEn = '';
    var extraTe = '';
    if (chart.grahas.Chandra.rashiIdx === i) {
      extraEn = '\n✨ This is today’s Moon sign — feelings run louder. Rest and food first.';
      extraTe = '\n✨ ఈ రోజు చంద్రుడు మీ రాశిలోనే ఉన్నారు. భావాలు బలంగా కదులుతాయి. ముందు విశ్రాంతి, ఆహారం చూసుకోండి.';
    }
    if (chart.grahas.Budha.retro) {
      extraEn += '\n⚠️ Mercury retrograde — re-check messages and payments.';
      extraTe += '\n⚠️ బుధుడు వక్రగతిలో ఉన్నారు. సందేశాలు, చెల్లింపులు మళ్లీ ఒకసారి చూసుకోండి.';
    }
    if (lang === 'te') {
      return headTe + '\n\n' + mood.emoji + ' ఫలితం: ' + mood.te + '\n\n🌙 ' + MOON_TE[h.Chandra] +
        '\n☀️ ' + SUN_TE[h.Surya] + extraTe +
        '\n\n💼 ' + CAREER_TE[h.Surya] +
        '\n💰 ' + MONEY_TE[h.Shukra] +
        '\n❤️ ' + LOVE_TE[h.Chandra] +
        '\n🌿 ' + HEALTH_TE[h.Chandra] +
        '\n\n🙏 సూచన: ' + DEITY_TE[i] + ' స్మరణ చేయండి. అదృష్ట రంగు ' + LUCKY_COLOR_TE[i] +
        '. అదృష్ట సంఖ్య ' + LUCKY_NUM[i] + '. అనుకూల దిక్కు ' + LUCKY_DIR_TE[i] +
        '.\n\n' + tags(i, 'day');
    }
    return headEn + '\n\n' + mood.emoji + ' Mood: ' + mood.en + '\n\n🌙 ' + MOON_EN[h.Chandra] +
      '\n☀️ Sun in the ' + h.Surya + 'th — let visible work rest there.' + extraEn +
      '\n\n💼 ' + CAREER_EN[h.Surya] +
      '\n💰 ' + MONEY_EN[h.Shukra] +
      '\n❤️ ' + LOVE_EN[h.Chandra] +
      '\n🌿 ' + HEALTH_EN[h.Chandra] +
      '\n\n🙏 Tip: A short prayer to ' + DEITY[i] + '. Lucky colour ' + LUCKY_COLOR[i] +
      ' · Number ' + LUCKY_NUM[i] + ' · Face ' + LUCKY_DIR[i] +
      '.\n\n' + tags(i, 'day');
  }

  function monthPost(i, startC, midC, endC, parts, lang) {
    var h0 = housesOf(startC, i);
    var h1 = housesOf(midC, i);
    var h2 = housesOf(endC, i);
    var last = lastDayOfMonth(parts.year, parts.month);
    var mood = toneMoon(h1.Chandra);
    var rangeEn = '1–' + last + ' ' + MONTH_EN[parts.month] + ' ' + parts.year;
    var rangeTe = '1–' + last + ' ' + MONTH_TE[parts.month] + ' ' + parts.year;
    var kujaEn = startC.grahas.Kuja.rashiIdx !== endC.grahas.Kuja.rashiIdx
      ? '\n🔥 Mars changes sign this month (' + startC.grahas.Kuja.rashi + ' → ' + endC.grahas.Kuja.rashi + '). Finish old fights before the shift.'
      : '';
    var kujaTe = startC.grahas.Kuja.rashiIdx !== endC.grahas.Kuja.rashiIdx
      ? '\n🔥 ఈ నెల కుజుడు ' + startC.grahas.Kuja.rashiTe + ' నుంచి ' + endC.grahas.Kuja.rashiTe + ' రాశికి మారతారు. మార్పుకు ముందు పాత గొడవలు ముగించండి.'
      : '';
    if (lang === 'te') {
      return GLYPH[i] + ' ' + T.RASHI_TE[i] + ' రాశి | ' + T.RASHIS[i] + '\n📅 ఈ నెల రాశిఫలం · ' + rangeTe +
        '\n\n' + mood.emoji + ' ఫలితం: ' + mood.te +
        '\n\n☀️ ఈ నెల మొదట సూర్యుడు ' + startC.grahas.Surya.rashiTe + ' రాశిలో ఉన్నారు (మీ ' + BHAVA_TE[h0.Surya] + ' భావం). నెల చివర ' + endC.grahas.Surya.rashiTe + ' రాశికి వెళ్తారు (మీ ' + BHAVA_TE[h2.Surya] + ' భావం). ఇదే ఈ నెల కథ.' +
        '\n' + GURU_TE[h1.Guru] +
        '\n' + SHANI_TE[h1.Shani] + kujaTe +
        '\n\n💼 ' + CAREER_TE[h1.Surya] +
        '\n💰 ' + MONEY_TE[h1.Shukra] +
        '\n❤️ ' + LOVE_TE[h1.Shukra] +
        '\n🌿 ' + HEALTH_TE[h1.Chandra] +
        '\n\n🙏 సూచన: ' + DEITY_TE[i] + ' స్మరణ చేయండి. అదృష్ట రంగు ' + LUCKY_COLOR_TE[i] + '. అదృష్ట సంఖ్య ' + LUCKY_NUM[i] +
        '.\n\n' + tags(i, 'month');
    }
    return GLYPH[i] + ' ' + T.RASHIS[i] + ' | ' + T.RASHI_EN[i] + '\n📅 Monthly Rashifal · ' + rangeEn +
      '\n\n' + mood.emoji + ' Mood: ' + mood.en +
      '\n\n☀️ Sun opens in ' + startC.grahas.Surya.rashi + ' (H' + h0.Surya + ') and ends in ' + endC.grahas.Surya.rashi + ' (H' + h2.Surya + ') — that is the month’s public story.' +
      '\n' + GURU_EN[h1.Guru] +
      '\n' + SHANI_EN[h1.Shani] + kujaEn +
      '\n\n💼 ' + CAREER_EN[h1.Surya] +
      '\n💰 ' + MONEY_EN[h1.Shukra] +
      '\n❤️ ' + LOVE_EN[h1.Shukra] +
      '\n🌿 ' + HEALTH_EN[h1.Chandra] +
      '\n\n🙏 Tip: Honour ' + DEITY[i] + '. Colour ' + LUCKY_COLOR[i] + ' · Number ' + LUCKY_NUM[i] +
      '.\n\n' + tags(i, 'month');
  }

  function yearPost(i, today, yearStart, lang) {
    var h = housesOf(today, i);
    var mood = yearlyMood(h);
    var ssEn = sadeNote(i, today.grahas.Shani.rashiIdx, false);
    var ssTe = sadeNote(i, today.grahas.Shani.rashiIdx, true);
    var y = today.parts.year;
    if (lang === 'te') {
      return GLYPH[i] + ' ' + T.RASHI_TE[i] + ' రాశి | ' + T.RASHIS[i] + '\n📅 ఈ సంవత్సరం రాశిఫలం · ' + y +
        '\n\n' + mood.emoji + ' ఫలితం: ' + mood.te +
        '\n\n' + GURU_TE[h.Guru] +
        '\n' + SHANI_TE[h.Shani] +
        (ssTe ? '\n⚠️ ' + ssTe : '') +
        '\nరాహువు మీ ' + BHAVA_TE[h.Rahu] + ' భావంలో, కేతువు మీ ' + BHAVA_TE[h.Ketu] + ' భావంలో ఉన్నారు. రాహువు కోరికలు పెంచుతాడు, కేతువు వదలమంటాడు. అన్ని కోరికల వెనక పరుగెత్తవద్దు.' +
        '\n\n💼 ' + CAREER_TE[h.Shani === 10 || h.Surya === 10 ? 10 : h.Guru] +
        '\n💰 ' + MONEY_TE[h.Guru] +
        '\n❤️ ' + LOVE_TE[h.Shukra] +
        '\n🌿 ' + HEALTH_TE[h.Shani] +
        '\n\n🙏 ఈ సంవత్సరం సూచన: ' + DEITY_TE[i] + ' స్మరణ, మితమైన దానం, సమయానికి నిద్ర.' +
        '\nఅదృష్ట రంగు ' + LUCKY_COLOR_TE[i] + '. అదృష్ట సంఖ్య ' + LUCKY_NUM[i] + '. అనుకూల దిక్కు ' + LUCKY_DIR_TE[i] +
        '.\n\n' + tags(i, 'year');
    }
    return GLYPH[i] + ' ' + T.RASHIS[i] + ' | ' + T.RASHI_EN[i] + '\n📅 Yearly Rashifal · ' + y +
      '\n\n' + mood.emoji + ' Mood: ' + mood.en +
      '\n\n' + GURU_EN[h.Guru] +
      '\n' + SHANI_EN[h.Shani] +
      (ssEn ? '\n⚠️ ' + ssEn : '') +
      '\nRahu in the ' + h.Rahu + 'th, Ketu in the ' + h.Ketu + 'th — ambition vs release. Do not chase every Rahu desire.' +
      '\n\n💼 ' + CAREER_EN[h.Shani === 10 || h.Surya === 10 ? 10 : h.Guru] +
      '\n💰 ' + MONEY_EN[h.Guru] +
      '\n❤️ ' + LOVE_EN[h.Shukra] +
      '\n🌿 ' + HEALTH_EN[h.Shani] +
      '\n\n🙏 Year tip: Worship ' + DEITY[i] + ', small daan, sleep on time.' +
      '\nLucky colour ' + LUCKY_COLOR[i] + ' · Number ' + LUCKY_NUM[i] + ' · Face ' + LUCKY_DIR[i] +
      '.\n\n' + tags(i, 'year');
  }

  function buildPosts() {
    var list = [];
    for (var i = 0; i < 12; i++) {
      var en, te;
      if (state.period === 'day') {
        en = dayPost(i, state.today, state.parts, 'en');
        te = dayPost(i, state.today, state.parts, 'te');
      } else if (state.period === 'month') {
        en = monthPost(i, state.monthStart, state.monthMid, state.monthEnd, state.parts, 'en');
        te = monthPost(i, state.monthStart, state.monthMid, state.monthEnd, state.parts, 'te');
      } else {
        en = yearPost(i, state.today, state.yearStart, 'en');
        te = yearPost(i, state.today, state.yearStart, 'te');
      }
      list.push({ i: i, en: en, te: te, both: en + '\n\n————————\n\n' + te });
    }
    state.posts = list;
    return list;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  function render() {
    var posts = buildPosts();
    document.getElementById('smMount').innerHTML = posts.map(function (p) {
      return '<article class="card parchment sm-card">' +
        '<header class="sm-card-head"><div><h3>' + GLYPH[p.i] + ' ' + T.RASHIS[p.i] + '</h3>' +
        '<small>' + T.RASHI_EN[p.i] + ' · ' + T.RASHI_TE[p.i] + '</small></div></header>' +
        '<div class="sm-cols">' +
        '<div class="sm-col"><h4>English</h4><pre class="sm-post" id="en-' + p.i + '">' + esc(p.en) + '</pre>' +
        '<div class="sm-copy-row"><button type="button" data-copy="en" data-i="' + p.i + '">Copy English</button></div></div>' +
        '<div class="sm-col"><h4>తెలుగు</h4><pre class="sm-post" id="te-' + p.i + '">' + esc(p.te) + '</pre>' +
        '<div class="sm-copy-row"><button type="button" data-copy="te" data-i="' + p.i + '">Copy Telugu</button>' +
        '<button type="button" data-copy="both" data-i="' + p.i + '">Copy both</button></div></div>' +
        '</div></article>';
    }).join('');
  }

  function toast(msg) {
    var el = document.getElementById('smToast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.hidden = true; }, 1600);
  }

  function copyText(text, okMsg) {
    function done() { toast(okMsg || 'Copied'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallback(text); done();
      });
    } else {
      fallback(text); done();
    }
  }

  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function joinAll(key) {
    var p = state.parts;
    var date = T.pad(p.day) + '/' + T.pad(p.month) + '/' + p.year;
    var head;
    if (key === 'te') {
      var titleTe = state.period === 'day' ? 'ఈరోజు రాశిఫలం' : (state.period === 'month' ? 'ఈ నెల రాశిఫలం' : 'ఈ సంవత్సరం రాశిఫలం');
      head = '✦ సైంటిఫిక్ ఆస్ట్రాలజీ · ' + titleTe + ' · ' + date + '\nహైదరాబాదు · లాహిరి గోచారం (చంద్ర రాశి ఆధారంగా)\n';
    } else {
      var title = state.period === 'day' ? 'DAILY RASHIFAL' : (state.period === 'month' ? 'MONTHLY RASHIFAL' : 'YEARLY RASHIFAL');
      head = '✦ Scientific Astrology · ' + title + ' · ' + date + '\nHyderabad · Lahiri gochara from Chandra rasi\n';
    }
    return head + '\n' + state.posts.map(function (x) { return x[key]; }).join('\n\n────────────\n\n');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var now = new Date();
    var parts = T.istParts(now);
    state.parts = parts;
    state.today = T.computeAt(parts, T.HYDERABAD);
    var ms = { year: parts.year, month: parts.month, day: 1, hour: 12, minute: 0, second: 0 };
    var mm = { year: parts.year, month: parts.month, day: 15, hour: 12, minute: 0, second: 0 };
    var me = { year: parts.year, month: parts.month, day: lastDayOfMonth(parts.year, parts.month), hour: 18, minute: 0, second: 0 };
    var ys = { year: parts.year, month: 1, day: 1, hour: 12, minute: 0, second: 0 };
    state.monthStart = T.computeAt(ms, T.HYDERABAD);
    state.monthMid = T.computeAt(mm, T.HYDERABAD);
    state.monthEnd = T.computeAt(me, T.HYDERABAD);
    state.yearStart = T.computeAt(ys, T.HYDERABAD);

    document.getElementById('metaLine').innerHTML =
      '<b>' + T.pad(parts.day) + '/' + T.pad(parts.month) + '/' + parts.year + '</b> · ' +
      parts.weekday + ' · Moon in ' + state.today.grahas.Chandra.rashi + ' · Copy for Instagram / WhatsApp / Facebook';

    render();

    document.querySelectorAll('.period-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        state.period = b.getAttribute('data-period');
        document.querySelectorAll('.period-btn').forEach(function (x) {
          x.classList.toggle('is-on', x === b);
        });
        render();
      });
    });

    document.getElementById('smMount').addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-copy]');
      if (!btn) return;
      var i = +btn.getAttribute('data-i');
      var kind = btn.getAttribute('data-copy');
      var p = state.posts[i];
      if (!p) return;
      copyText(p[kind], kind === 'te' ? 'Telugu copied' : (kind === 'en' ? 'English copied' : 'Both copied'));
    });

    document.getElementById('copyAllEn').onclick = function () { copyText(joinAll('en'), 'All 12 English copied'); };
    document.getElementById('copyAllTe').onclick = function () { copyText(joinAll('te'), 'All 12 Telugu copied'); };
    document.getElementById('copyAllBoth').onclick = function () { copyText(joinAll('both'), 'All 12 EN+TE copied'); };
  });
})();
