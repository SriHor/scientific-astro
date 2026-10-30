/* Visharada Rashifal — rashi first, then day / month / year. Elaborate gochara + kundli. */
(function () {
  'use strict';
  var T = window.RasiTransit;
  var C = window.RasiCharts;
  var A = window.VisharadaAuth;
  if (!T || !C || !A) return;

  var GLYPH = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  var LORDS = ['Kuja', 'Shukra', 'Budha', 'Chandra', 'Surya', 'Budha', 'Shukra', 'Kuja', 'Guru', 'Shani', 'Shani', 'Guru'];
  var ELEMENT = ['Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water'];
  var NATURE = ['Chara', 'Sthira', 'Dwiswabhava', 'Chara', 'Sthira', 'Dwiswabhava', 'Chara', 'Sthira', 'Dwiswabhava', 'Chara', 'Sthira', 'Dwiswabhava'];
  var LUCKY_NUM = ['9, 18, 27', '6, 15, 24', '5, 14, 23', '2, 7, 16', '1, 10, 19', '5, 14, 23', '6, 15, 24', '9, 18, 27', '3, 12, 21', '8, 17, 26', '4, 13, 22', '3, 12, 21'];
  var LUCKY_COLOR = ['Red', 'White / cream', 'Green', 'White / silver', 'Gold / orange', 'Green / grey', 'Pink / white', 'Deep red', 'Yellow / saffron', 'Black / navy', 'Blue / grey', 'Yellow / sea-green'];
  var LUCKY_DIR = ['East', 'South', 'West', 'North', 'East', 'South', 'West', 'North', 'East', 'South', 'West', 'North'];
  var STONE = ['Red coral', 'Diamond / opal', 'Emerald', 'Pearl', 'Ruby', 'Emerald', 'Diamond', 'Red coral', 'Yellow sapphire', 'Blue sapphire', 'Blue sapphire', 'Yellow sapphire'];
  var DEITY = ['Kartikeya / Hanuman', 'Lakshmi / Gowri', 'Vishnu / Budha', 'Parvati / Ganga', 'Surya / Narasimha', 'Vishnu', 'Lakshmi / Indra', 'Kartikeya / Kali', 'Dattatreya / Guru', 'Shiva / Shani', 'Shiva / Varuna', 'Vishnu / Guru'];
  var WEEKDAY = ['Tuesday', 'Friday', 'Wednesday', 'Monday', 'Sunday', 'Wednesday', 'Friday', 'Tuesday', 'Thursday', 'Saturday', 'Saturday', 'Thursday'];

  var HOUSE_NAME = {
    1: 'Lagna — self, body, vitality, how the world first meets you',
    2: 'Dhana — wealth, speech, family, food and stored resources',
    3: 'Sahaja — courage, siblings, short travel, effort and skill of the hands',
    4: 'Sukha — home, mother, vehicles, inner peace and landed property',
    5: 'Putra — children, intellect, romance, mantra, speculation and poorva-punya',
    6: 'Ripu — debts, disease, service, rivals, daily labour and litigation',
    7: 'Kalatra — spouse, partners, public, contracts and open enemies as well as open love',
    8: 'Ayur — longevity, sudden change, occult, inheritance, research and hidden fear',
    9: 'Bhagya — dharma, luck, father, guru, long travel and higher law',
    10: 'Karma — career, status, reputation, government and the fruit of work',
    11: 'Labha — gains, friends, networks, hopes fulfilled and elder-sibling support',
    12: 'Vyaya — loss, foreign lands, expenses, sleep, moksha and isolation'
  };

  var AREA_HOUSES = {
    career: [10, 6, 2, 11],
    wealth: [2, 11, 5, 9],
    health: [1, 6, 8, 12],
    love: [5, 7, 2, 8],
    family: [4, 2, 9, 12],
    mind: [1, 4, 5, 9]
  };

  var CITIES = [
    { n: 'Hyderabad, India', lat: 17.3850, lng: 78.4867 },
    { n: 'Bengaluru, India', lat: 12.9716, lng: 77.5946 },
    { n: 'Chennai, India', lat: 13.0827, lng: 80.2707 },
    { n: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
    { n: 'Delhi, India', lat: 28.6139, lng: 77.2090 },
    { n: 'Kolkata, India', lat: 22.5726, lng: 88.3639 },
    { n: 'Pune, India', lat: 18.5204, lng: 73.8567 },
    { n: 'Ahmedabad, India', lat: 23.0225, lng: 72.5714 },
    { n: 'Jaipur, India', lat: 26.9124, lng: 75.7873 },
    { n: 'Lucknow, India', lat: 26.8467, lng: 80.9462 },
    { n: 'Visakhapatnam, India', lat: 17.6868, lng: 83.2185 },
    { n: 'Vijayawada, India', lat: 16.5062, lng: 80.6480 },
    { n: 'Guntur, India', lat: 16.3067, lng: 80.4365 },
    { n: 'Tirupati, India', lat: 13.6288, lng: 79.4192 },
    { n: 'Warangal, India', lat: 17.9689, lng: 79.5941 },
    { n: 'Karimnagar, India', lat: 18.4386, lng: 79.1288 },
    { n: 'Nellore, India', lat: 14.4426, lng: 79.9865 },
    { n: 'Kochi, India', lat: 9.9312, lng: 76.2673 },
    { n: 'Thiruvananthapuram, India', lat: 8.5241, lng: 76.9366 },
    { n: 'Coimbatore, India', lat: 11.0168, lng: 76.9558 },
    { n: 'Madurai, India', lat: 9.9252, lng: 78.1198 },
    { n: 'Mysuru, India', lat: 12.2958, lng: 76.6394 },
    { n: 'Nagpur, India', lat: 21.1458, lng: 79.0882 },
    { n: 'Bhopal, India', lat: 23.2599, lng: 77.4126 },
    { n: 'Patna, India', lat: 25.5941, lng: 85.1376 },
    { n: 'Bhubaneswar, India', lat: 20.2961, lng: 85.8245 },
    { n: 'Chandigarh, India', lat: 30.7333, lng: 76.7794 },
    { n: 'Varanasi, India', lat: 25.3176, lng: 82.9739 },
    { n: 'Amritsar, India', lat: 31.6340, lng: 74.8723 },
    { n: 'Srinagar, India', lat: 34.0837, lng: 74.7973 }
  ];

  var state = {
    view: 'rashifal',
    rasi: null,
    period: 'day',
    chartStyle: 'south',
    today: null,
    monthStart: null,
    monthMid: null,
    monthEnd: null,
    yearStart: null,
    parts: null,
    natal: null,
    natalMeta: null
  };

  function housesOf(chart, rasiIdx) {
    var map = {};
    T.GRAHAS.forEach(function (g) {
      map[g] = T.houseFrom(rasiIdx, chart.grahas[g].rashiIdx);
    });
    return map;
  }

  function occupants(chart, rasiIdx, house) {
    var names = [];
    T.GRAHAS.forEach(function (g) {
      if (T.houseFrom(rasiIdx, chart.grahas[g].rashiIdx) === house) names.push(g);
    });
    return names;
  }

  function join(arr) {
    if (!arr.length) return '';
    if (arr.length === 1) return arr[0];
    return arr.slice(0, -1).join(', ') + ' and ' + arr.slice(-1);
  }

  function toneMoon(h) {
    if ([1, 3, 6, 10, 11].indexOf(h) >= 0) return 'Favourable';
    if ([4, 8, 12].indexOf(h) >= 0) return 'Caution';
    return 'Mixed';
  }

  function moodClass(m) {
    if (m === 'Favourable') return 'mood-good';
    if (m === 'Caution') return 'mood-warn';
    return 'mood-mix';
  }

  function dateLabel(p) {
    return T.pad(p.day) + '/' + T.pad(p.month) + '/' + p.year;
  }

  function lastDayOfMonth(y, m) {
    return new Date(Date.UTC(y, m, 0)).getUTCDate();
  }

  function ordinal(n) {
    var x = Number(n);
    var v = x % 100;
    if (v >= 11 && v <= 13) return x + 'th';
    if (x % 10 === 1) return x + 'st';
    if (x % 10 === 2) return x + 'nd';
    if (x % 10 === 3) return x + 'rd';
    return x + 'th';
  }

  function tithiName(chart) {
    var diff = ((chart.grahas.Chandra.sid - chart.grahas.Surya.sid) + 360) % 360;
    var n = Math.floor(diff / 12) + 1;
    var paksha = n <= 15 ? 'Shukla' : 'Krishna';
    var t = n <= 15 ? n : n - 15;
    if (t === 0) t = 15;
    var names = ['', 'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'];
    var label = t === 15 ? (paksha === 'Shukla' ? 'Purnima' : 'Amavasya') : names[t];
    return paksha + ' ' + label + ' (Tithi ' + n + ')';
  }

  function grahaHouseNote(g, house) {
    var focus = HOUSE_NAME[house];
    var notes = {
      Surya: 'Surya lights the ' + ordinal(house) + ' (' + focus + '). Visibility, authority and father-figures colour that area; keep ego clean and schedule important work in daylight.',
      Chandra: 'Chandra occupies the ' + ordinal(house) + ' (' + focus + '). Mood, public feeling and daily comfort swing with the Moon here — food, rest and speech matter more than usual.',
      Kuja: 'Kuja in the ' + ordinal(house) + ' (' + focus + ') adds heat, courage and conflict-potential. Use the energy for a finite task; do not pick a needless fight.',
      Budha: 'Budha in the ' + ordinal(house) + ' (' + focus + ') sharpens talk, trade, documents and short movement. Double-check numbers if Budha is retrograde.',
      Guru: 'Guru in the ' + ordinal(house) + ' (' + focus + ') expands dharma, teachers and timely help. Growth comes if you stay ethical and teachable.',
      Shukra: 'Shukra in the ' + ordinal(house) + ' (' + focus + ') sweetens comfort, art, money and relationship themes. Harmony helps; excess luxury does not.',
      Shani: 'Shani in the ' + ordinal(house) + ' (' + focus + ') delays, structures and tests. Duty done slowly is better than a shortcut that breaks later.',
      Rahu: 'Rahu in the ' + ordinal(house) + ' (' + focus + ') amplifies desire, foreign or unconventional paths. Ambition is useful; obsession is not.',
      Ketu: 'Ketu in the ' + ordinal(house) + ' (' + focus + ') detaches, spiritualises or scatters that house. Keep it simple; do not force outcomes.'
    };
    return notes[g] || (g + ' transits house ' + house + '.');
  }

  function sadeSati(rasiIdx, shaniIdx) {
    var h = T.houseFrom(rasiIdx, shaniIdx);
    if (h === 12) return { on: true, phase: 'first phase (12th from Moon — rising pressure, endings, foreign or hospital themes)', house: 12 };
    if (h === 1) return { on: true, phase: 'peak (1st from Moon — identity, health, duty, public weight)', house: 1 };
    if (h === 2) return { on: true, phase: 'last phase (2nd from Moon — family, speech, resources, settling accounts)', house: 2 };
    return { on: false, phase: '', house: h };
  }

  function yearlyMood(h) {
    var guruGood = [1, 2, 5, 7, 9, 11].indexOf(h.Guru) >= 0;
    var ss = [12, 1, 2].indexOf(h.Shani) >= 0;
    if (guruGood && !ss) return 'Favourable';
    if (!guruGood && ss) return 'Caution';
    return 'Mixed';
  }

  function areaBlock(title, houses, h, chart, rasiIdx) {
    var bits = [];
    houses.forEach(function (house) {
      var who = occupants(chart, rasiIdx, house);
      if (who.length) bits.push('House ' + house + ' holds ' + join(who) + ' — ' + HOUSE_NAME[house] + '.');
    });
    ['Guru', 'Shukra', 'Shani', 'Kuja', 'Chandra'].forEach(function (g) {
      if (houses.indexOf(h[g]) >= 0) bits.push(grahaHouseNote(g, h[g]));
    });
    if (!bits.length) {
      bits.push('No slow graha sits directly in the classic houses of this theme right now. Read the day from Chandra in the ' + ordinal(h.Chandra) + ' and Surya in the ' + ordinal(h.Surya) + '.');
    }
    return { title: title, text: bits.slice(0, 4).join(' ') };
  }

  function remedies(rasiIdx, h, mood) {
    var lord = LORDS[rasiIdx];
    var lines = [];
    lines.push('Honour rasi lord ' + lord + ' on ' + WEEKDAY[rasiIdx] + ' with simple satvik food and a calm mind.');
    if (mood === 'Caution') lines.push('Prefer one duty at a time. Avoid new debts, harsh speech and night-time arguments.');
    if ([6, 8, 12].indexOf(h.Shani) >= 0 || [12, 1, 2].indexOf(h.Shani) >= 0) {
      lines.push('Shani asks for discipline: sleep on time, keep accounts, serve elders or workers without show.');
    }
    if ([6, 8, 12].indexOf(h.Kuja) >= 0) lines.push('Cool Kuja: avoid rash driving; channel heat into exercise or repairs.');
    if (h.Rahu === 1 || h.Rahu === 7 || h.Rahu === 8) lines.push('Rahu themes run loud — fact-check rumours, limit intoxicants and late screens.');
    lines.push('A short prayer to ' + DEITY[rasiIdx] + ' and a small daan in ' + LUCKY_COLOR[rasiIdx].split('/')[0].trim().toLowerCase() + ' keeps the chart’s advice practical, not fearful.');
    return lines;
  }

  function luckyBox(i) {
    return [
      { k: 'Lucky colour', v: LUCKY_COLOR[i] },
      { k: 'Lucky numbers', v: LUCKY_NUM[i] },
      { k: 'Direction', v: LUCKY_DIR[i] },
      { k: 'Gem / metal hint', v: STONE[i] }
    ];
  }

  function dailyPhala(rasiIdx, today) {
    var h = housesOf(today, rasiIdx);
    var mood = toneMoon(h.Chandra);
    var overview = [];
    overview.push('From ' + T.RASHIS[rasiIdx] + ' as Chandra rasi, today’s Moon is in the ' + ordinal(h.Chandra) + ' house — ' + HOUSE_NAME[h.Chandra] + '.');
    overview.push('Surya transits the ' + ordinal(h.Surya) + '. Let the day’s visible work rest there.');
    overview.push(tithiName(today) + '. Chandra nakshatra: ' + today.grahas.Chandra.nakshatra + '.');
    if (today.grahas.Chandra.rashiIdx === rasiIdx) {
      overview.push('This is today’s Chandra rasi itself — feelings, food and family talk run louder. Protect sleep.');
    }
    var kendraB = [];
    ['Guru', 'Shukra', 'Budha'].forEach(function (g) {
      if ([1, 4, 7, 10].indexOf(h[g]) >= 0) kendraB.push(g + ' in H' + h[g]);
    });
    if (kendraB.length) overview.push('Support in kendra: ' + join(kendraB) + '.');
    var dust = [];
    ['Kuja', 'Shani', 'Rahu'].forEach(function (g) {
      if ([6, 8, 12].indexOf(h[g]) >= 0) dust.push(g + ' in H' + h[g]);
    });
    if (dust.length) overview.push('Watch: ' + join(dust) + ' — delay, dispute or hidden cost. Stay factual.');
    if (today.grahas.Budha.retro) overview.push('Budha is retrograde: re-read messages, tickets and payments before you send them.');
    if (today.grahas.Shukra.retro) overview.push('Shukra is retrograde: old money or relationship threads may return — settle, do not reopen every wound.');

    var areas = [
      areaBlock('Career & karma', AREA_HOUSES.career, h, today, rasiIdx),
      areaBlock('Wealth & gains', AREA_HOUSES.wealth, h, today, rasiIdx),
      areaBlock('Health & vitality', AREA_HOUSES.health, h, today, rasiIdx),
      areaBlock('Love & partnerships', AREA_HOUSES.love, h, today, rasiIdx),
      areaBlock('Home & family', AREA_HOUSES.family, h, today, rasiIdx),
      areaBlock('Mind, mantra & luck', AREA_HOUSES.mind, h, today, rasiIdx)
    ];
    return { mood: mood, overview: overview.join(' '), areas: areas, remedies: remedies(rasiIdx, h, mood), h: h };
  }

  function monthlyPhala(rasiIdx, startC, midC, endC, parts) {
    var h0 = housesOf(startC, rasiIdx);
    var h1 = housesOf(midC, rasiIdx);
    var h2 = housesOf(endC, rasiIdx);
    var moonPath = [h0.Chandra, h1.Chandra, h2.Chandra];
    var good = moonPath.filter(function (x) { return [1, 3, 6, 10, 11].indexOf(x) >= 0; }).length;
    var mood = good >= 2 ? 'Favourable' : (good === 0 ? 'Caution' : 'Mixed');
    var last = lastDayOfMonth(parts.year, parts.month);
    var overview = [];
    overview.push('This solar-calendar month (' + T.pad(parts.month) + '/' + parts.year + ', 1–' + last + ' IST) is read from ' + T.RASHIS[rasiIdx] + ' as Chandra rasi.');
    overview.push('Surya opens the month in ' + startC.grahas.Surya.rashi + ' (H' + h0.Surya + ' from you) and is in ' + endC.grahas.Surya.rashi + ' (H' + h2.Surya + ') by month-end — that is the month’s public story.');
    overview.push('Chandra’s sample path from this rasi: houses ' + join(moonPath.map(String)) + ' (start / mid / end). Emotional weather will not stay in one room.');
    overview.push('Budha stays around the ' + ordinal(h0.Budha) + '–' + ordinal(h2.Budha) + '; Shukra around the ' + ordinal(h0.Shukra) + '–' + ordinal(h2.Shukra) + '. Talk, trade and affection follow those houses.');
    if (startC.grahas.Kuja.rashiIdx !== endC.grahas.Kuja.rashiIdx) {
      overview.push('Kuja changes rasi this month (' + startC.grahas.Kuja.rashi + ' → ' + endC.grahas.Kuja.rashi + '). Energy and conflict themes shift house — finish old fights before the ingress if you can.');
    }
    overview.push('Slow grahas (Guru H' + h0.Guru + ', Shani H' + h0.Shani + ', Rahu H' + h0.Rahu + ') set the month’s background weather; they barely move.');

    var areas = [
      areaBlock('Career this month', AREA_HOUSES.career, h1, midC, rasiIdx),
      areaBlock('Money this month', AREA_HOUSES.wealth, h1, midC, rasiIdx),
      areaBlock('Health this month', AREA_HOUSES.health, h1, midC, rasiIdx),
      areaBlock('Relationships this month', AREA_HOUSES.love, h1, midC, rasiIdx),
      areaBlock('Home this month', AREA_HOUSES.family, h1, midC, rasiIdx),
      areaBlock('Learning & dharma', AREA_HOUSES.mind, h1, midC, rasiIdx)
    ];
    areas[0].text += ' Mid-month Surya in H' + h1.Surya + ' shows where bosses and government notice you.';
    return { mood: mood, overview: overview.join(' '), areas: areas, remedies: remedies(rasiIdx, h1, mood), h: h1 };
  }

  function yearlyPhala(rasiIdx, today, yearStart) {
    var h = housesOf(today, rasiIdx);
    var hy = housesOf(yearStart, rasiIdx);
    var mood = yearlyMood(h);
    var ss = sadeSati(rasiIdx, today.grahas.Shani.rashiIdx);
    var overview = [];
    overview.push(today.parts.year + ' for ' + T.RASHIS[rasiIdx] + ' is governed first by Guru in the ' + ordinal(h.Guru) + ' — ' + HOUSE_NAME[h.Guru] + '.');
    if ([1, 2, 5, 7, 9, 11].indexOf(h.Guru) >= 0) {
      overview.push('Jupiter here generally expands dharma, study, support and timely help in the current gochara.');
    } else if ([6, 8, 12].indexOf(h.Guru) >= 0) {
      overview.push('Jupiter in a dusthana asks patience with health, legal or expense themes; charity and study still protect.');
    } else {
      overview.push('Jupiter here rewards consistent work more than luck-strikes. Build slowly.');
    }
    overview.push('Shani is in the ' + ordinal(h.Shani) + ' — ' + HOUSE_NAME[h.Shani] + '.');
    if (ss.on) overview.push('Sade Sati is active (' + ss.phase + '). Prefer discipline, sleep and one duty at a time over big gambles.');
    else if ([3, 6, 11].indexOf(h.Shani) >= 0) overview.push('Saturn in 3/6/11 is classically helpful: effort, rivals and gains respond to persistence.');
    else if (h.Shani === 8) overview.push('Ashtama Shani (8th from Moon) can feel heavy: research, insurance, and not taking sudden risks matter more than luck.');
    else if (h.Shani === 4 || h.Shani === 7 || h.Shani === 10) overview.push('Kantaka-style Saturn on a kendra tests home, partner or career. Structure beats complaint.');
    else overview.push('Saturn asks for structure in that house. Delay is a teacher, not a stop sign.');
    overview.push('Rahu occupies the ' + ordinal(h.Rahu) + ' and Ketu the ' + ordinal(h.Ketu) + ' — ambition versus release. Do not chase every Rahu desire; keep Ketu’s house simple.');
    overview.push('Year opened with Guru in H' + hy.Guru + ' and Shani in H' + hy.Shani + ' from this rasi (1 Jan IST).');

    var areas = [
      areaBlock('Career in the year', AREA_HOUSES.career, h, today, rasiIdx),
      areaBlock('Wealth in the year', AREA_HOUSES.wealth, h, today, rasiIdx),
      areaBlock('Health in the year', AREA_HOUSES.health, h, today, rasiIdx),
      areaBlock('Marriage & public', AREA_HOUSES.love, h, today, rasiIdx),
      areaBlock('Family & property', AREA_HOUSES.family, h, today, rasiIdx),
      areaBlock('Dharma & higher mind', AREA_HOUSES.mind, h, today, rasiIdx)
    ];
    var extra = [];
    extra.push(grahaHouseNote('Guru', h.Guru));
    extra.push(grahaHouseNote('Shani', h.Shani));
    extra.push(grahaHouseNote('Rahu', h.Rahu));
    extra.push(grahaHouseNote('Ketu', h.Ketu));
    areas.push({ title: 'Slow grahas — the year’s spine', text: extra.join(' ') });
    return { mood: mood, overview: overview.join(' '), areas: areas, remedies: remedies(rasiIdx, h, mood), h: h };
  }

  function transitRows(chart, withLagna) {
    var rows = T.GRAHAS.map(function (g) {
      var p = chart.grahas[g];
      return '<tr><td><b>' + g + '</b> <span class="muted">' + p.en + '</span></td>' +
        '<td>' + p.rashi + ' <span class="muted">(' + p.rashiEn + ' / ' + p.rashiTe + ')</span></td>' +
        '<td>' + C.fmtDeg(p.deg) + '</td><td>' + p.nakshatra + '</td>' +
        '<td>' + (p.retro ? '<span class="retro">R</span>' : '—') + '</td></tr>';
    }).join('');
    if (withLagna && chart.lagna) {
      var L = chart.lagna;
      rows = '<tr><td><b>Lagna</b> <span class="muted">Ascendant</span></td>' +
        '<td>' + L.rashi + ' <span class="muted">(' + L.rashiEn + ' / ' + L.rashiTe + ')</span></td>' +
        '<td>' + C.fmtDeg(L.deg) + '</td><td>—</td><td>—</td></tr>' + rows;
    }
    return rows;
  }

  function houseRows(chart, rasiIdx) {
    var h = housesOf(chart, rasiIdx);
    return T.GRAHAS.map(function (g) {
      var house = h[g];
      return '<tr><td>' + g + '</td><td>H' + house + '</td><td>' + HOUSE_NAME[house] + '</td></tr>';
    }).join('');
  }

  function renderCharts(chart, lagnaRashi, title) {
    var style = state.chartStyle;
    var d1 = C.render(chart, lagnaRashi, title, style);
    var d9c = C.toNavamsaChart(chart);
    var d9 = C.render(d9c, d9c.lagna.rashi, 'Navamsa (D-9)', style);
    return d1 + d9;
  }

  function periodMeta() {
    var p = state.parts;
    if (state.period === 'day') {
      return dateLabel(p) + ' · ' + p.clock + ' IST · ' + p.weekday;
    }
    if (state.period === 'month') {
      var last = lastDayOfMonth(p.year, p.month);
      return '1/' + T.pad(p.month) + '/' + p.year + ' – ' + last + '/' + T.pad(p.month) + '/' + p.year + ' (IST month)';
    }
    return p.year + ' · Guru in ' + state.today.grahas.Guru.rashi + ' · Shani in ' + state.today.grahas.Shani.rashi;
  }

  function renderPhala() {
    var mount = document.getElementById('phalaMount');
    var i = state.rasi;
    if (i == null) { mount.innerHTML = ''; return; }
    var chart = state.period === 'month' ? state.monthMid : state.today;
    var ph;
    if (state.period === 'day') ph = dailyPhala(i, state.today);
    else if (state.period === 'month') ph = monthlyPhala(i, state.monthStart, state.monthMid, state.monthEnd, state.parts);
    else ph = yearlyPhala(i, state.today, state.yearStart);

    var isMoon = state.today.grahas.Chandra.rashiIdx === i;
    var isSun = state.today.grahas.Surya.rashiIdx === i;
    var badges = '';
    if (isMoon) badges += '<span class="badge moon">Today’s Chandra Rasi</span>';
    if (isSun) badges += '<span class="badge sun">Surya Rasi (solar month)</span>';
    badges += '<span class="badge lord">Lord ' + LORDS[i] + ' · ' + ELEMENT[i] + ' · ' + NATURE[i] + '</span>';

    var periodTitle = state.period === 'day' ? 'Day-wise Rashifal' : (state.period === 'month' ? 'Month-wise Rashifal' : 'Year-wise Rashifal');
    var user = A.current();
    var personal = '';
    if (user && user.birth && user.birth.chandraIdx === i) {
      personal = '<span class="badge moon">Matches your saved Moon sign</span>';
    }

    var areas = ph.areas.map(function (a) {
      return '<article class="area"><h3>' + a.title + '</h3><p>' + a.text + '</p></article>';
    }).join('');
    var lucky = luckyBox(i).map(function (x) {
      return '<div class="lucky"><span>' + x.k + '</span><b>' + x.v + '</b></div>';
    }).join('');
    var dos = ph.remedies.map(function (r) { return '<li>' + r + '</li>'; }).join('');

    mount.innerHTML =
      '<article class="card parchment phala-shell" id="phalaCard">' +
      '<header class="phala-head"><div><h2>' + GLYPH[i] + ' ' + T.RASHIS[i] + '</h2>' +
      '<p class="sub">' + T.RASHI_EN[i] + ' · ' + T.RASHI_TE[i] + ' · ' + periodTitle + '</p></div>' +
      '<div class="badges">' + badges + personal + '</div></header>' +
      '<p class="range">' + periodMeta() + ' · Hyderabad transits · houses counted from this Chandra rasi</p>' +
      '<div class="mood-row"><span class="pill ' + moodClass(ph.mood) + '">' + ph.mood + '</span>' +
      '<span class="pill mood-mix">Gochara · not janma kundli</span></div>' +
      '<p class="overview">' + ph.overview + '</p>' +
      '<div class="chart-panel"><div class="chart-toolbar"><h3>Charts from ' + T.RASHIS[i] + ' lagna (Moon-sign kundali)</h3>' +
      '<div class="style-tabs">' +
      '<button type="button" data-style="south"' + (state.chartStyle === 'south' ? ' class="is-on"' : '') + '>South Indian</button>' +
      '<button type="button" data-style="north"' + (state.chartStyle === 'north' ? ' class="is-on"' : '') + '>North Indian</button>' +
      '</div></div><div class="chart-pair" id="chartPair">' +
      renderCharts(chart, T.RASHIS[i], 'Gochara D-1') + '</div></div>' +
      '<div class="area-grid">' + areas + '</div>' +
      '<div class="lucky-row">' + lucky + '</div>' +
      '<div class="table-wrap"><table class="t-table"><thead><tr>' +
      '<th>Graha</th><th>Rasi</th><th>Degree</th><th>Nakshatra</th><th>Retro</th></tr></thead><tbody>' +
      transitRows(chart, true) + '</tbody></table></div>' +
      '<div class="table-wrap"><table class="t-table"><thead><tr><th>Graha</th><th>House from rasi</th><th>House meaning</th></tr></thead><tbody>' +
      houseRows(chart, i) + '</tbody></table></div>' +
      '<div class="dos-list"><h3>Upaya · do and don’t</h3><ul>' + dos + '</ul>' +
      '<p class="muted">Deity of the rasi: ' + DEITY[i] + '. Fasting or light diet on ' + WEEKDAY[i] + ' is a classical support, not a medical prescription.</p></div>' +
      '</article>';

    mount.querySelectorAll('[data-style]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.chartStyle = btn.getAttribute('data-style');
        renderPhala();
        var card = document.getElementById('phalaCard');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderRasiGrid() {
    var moonIdx = state.today.grahas.Chandra.rashiIdx;
    var user = A.current();
    var mine = user && user.birth ? user.birth.chandraIdx : null;
    document.getElementById('rasiGrid').innerHTML = T.RASHIS.map(function (r, i) {
      var on = state.rasi === i ? ' is-on' : '';
      var moon = i === moonIdx ? ' is-moon' : '';
      var tag = i === moonIdx ? '<span class="tag-moon">Moon today</span>' : (i === mine ? '<span class="tag-moon">Your Moon</span>' : '');
      return '<button type="button" class="rasi-btn' + on + moon + '" data-rasi="' + i + '">' +
        '<span class="glyph">' + GLYPH[i] + '</span>' +
        '<b>' + r + '</b>' +
        '<small>' + T.RASHI_EN[i] + '</small>' +
        '<span class="te">' + T.RASHI_TE[i] + '</span>' + tag +
        '</button>';
    }).join('');
  }

  function selectRasi(i) {
    state.rasi = i;
    document.getElementById('periodDock').classList.remove('is-hidden');
    document.getElementById('periodHint').textContent =
      'Now choose Day wise, Month wise or Year wise for ' + T.RASHIS[i] + ' (' + T.RASHI_EN[i] + ' / ' + T.RASHI_TE[i] + ')';
    renderRasiGrid();
    renderPhala();
    var dock = document.getElementById('periodDock');
    dock.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setPeriod(p) {
    state.period = p;
    document.querySelectorAll('.period-btn').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-period') === p);
    });
    renderPhala();
  }

  function switchView(name) {
    state.view = name;
    document.getElementById('viewRashifal').classList.toggle('is-on', name === 'rashifal');
    document.getElementById('viewRashifal').hidden = name !== 'rashifal';
    document.getElementById('viewKundli').classList.toggle('is-on', name === 'kundli');
    document.getElementById('viewKundli').hidden = name !== 'kundli';
    document.querySelectorAll('.nav-link').forEach(function (el) {
      el.classList.toggle('is-on', el.getAttribute('data-view') === name);
    });
    window.location.hash = name === 'kundli' ? 'kundli' : 'rashifal';
  }

  function paintAuth() {
    var slot = document.getElementById('authSlot');
    var pill = document.getElementById('modePill');
    var user = A.current();
    var saveBtn = document.getElementById('btnSaveKundli');
    if (user) {
      pill.textContent = 'Logged in';
      slot.innerHTML = '<span class="user-chip" title="' + user.email + '">' + user.name + '</span>' +
        '<button type="button" class="btn-out" id="btnLogout">Logout</button>';
      document.getElementById('btnLogout').onclick = function () {
        A.logout();
        paintAuth();
        renderRasiGrid();
      };
      if (saveBtn) saveBtn.hidden = !state.natalMeta;
    } else {
      pill.textContent = 'General';
      slot.innerHTML = '<button type="button" class="btn-login" id="btnLogin">Login</button>';
      document.getElementById('btnLogin').onclick = function () { openAuth('login'); };
      if (saveBtn) saveBtn.hidden = true;
    }
  }

  function openAuth(tab) {
    document.getElementById('authModal').hidden = false;
    setAuthTab(tab || 'login');
  }
  function setAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-auth') === tab);
    });
    document.getElementById('loginForm').hidden = tab !== 'login';
    document.getElementById('registerForm').hidden = tab !== 'register';
    document.getElementById('authErr').hidden = true;
  }

  function findCity(name) {
    var q = String(name || '').toLowerCase();
    for (var i = 0; i < CITIES.length; i++) {
      if (CITIES[i].n.toLowerCase() === q) return CITIES[i];
      if (CITIES[i].n.toLowerCase().indexOf(q.split(',')[0].trim()) === 0) return CITIES[i];
    }
    return CITIES[0];
  }

  function computeNatal(meta) {
    var city = findCity(meta.place);
    var parts = {
      year: meta.year, month: meta.month, day: meta.day,
      hour: meta.hour, minute: meta.minute, second: 0
    };
    var place = { name: city.n, lat: city.lat, lng: city.lng, tz: 5.5, tzName: 'Asia/Kolkata' };
    var chart = T.computeAt(parts, place);
    meta.chandraIdx = chart.grahas.Chandra.rashiIdx;
    meta.lagnaIdx = chart.lagna.rashiIdx;
    meta.placeResolved = city.n;
    return { chart: chart, place: place, meta: meta };
  }

  function renderKundli(pack) {
    var chart = pack.chart;
    var meta = pack.meta;
    var d9 = C.toNavamsaChart(chart);
    var hMoon = housesOf(chart, chart.grahas.Chandra.rashiIdx);
    var ss = sadeSati(chart.grahas.Chandra.rashiIdx, state.today.grahas.Shani.rashiIdx);
    var gochara = dailyPhala(chart.grahas.Chandra.rashiIdx, state.today);
    var chips =
      '<span class="chip"><b>Name</b> ' + meta.name + '</span>' +
      '<span class="chip"><b>Born</b> ' + T.pad(meta.day) + '/' + T.pad(meta.month) + '/' + meta.year + ' ' + T.pad(meta.hour) + ':' + T.pad(meta.minute) + '</span>' +
      '<span class="chip"><b>Place</b> ' + meta.placeResolved + '</span>' +
      '<span class="chip"><b>Lagna</b> ' + chart.lagna.rashi + ' ' + C.fmtDeg(chart.lagna.deg) + '</span>' +
      '<span class="chip"><b>Chandra</b> ' + chart.grahas.Chandra.rashi + ' · ' + chart.grahas.Chandra.nakshatra + '</span>' +
      '<span class="chip"><b>Ayanamsha</b> ' + chart.ayanamsha.toFixed(4) + '°</span>';

    document.getElementById('kundliMount').innerHTML =
      '<article class="card parchment phala-shell">' +
      '<header class="phala-head"><div><h2>Janma Kundli</h2><p class="sub">' + meta.name + ' · ' + (meta.gender || '') + '</p></div></header>' +
      '<div class="person-bar">' + chips + '</div>' +
      '<div class="chart-panel"><div class="chart-toolbar"><h3>Rasi (D-1) and Navamsa (D-9)</h3>' +
      '<div class="style-tabs" id="kStyle">' +
      '<button type="button" data-kstyle="south" class="' + (state.chartStyle === 'south' ? 'is-on' : '') + '">South Indian</button>' +
      '<button type="button" data-kstyle="north" class="' + (state.chartStyle === 'north' ? 'is-on' : '') + '">North Indian</button>' +
      '</div></div><div class="chart-pair">' +
      C.render(chart, chart.lagna.rashi, 'Janma Rasi (D-1)', state.chartStyle, true) +
      C.render(d9, d9.lagna.rashi, 'Navamsa (D-9)', state.chartStyle, true) +
      '</div></div>' +
      '<div class="table-wrap"><table class="t-table"><thead><tr><th>Graha</th><th>Rasi</th><th>Degree</th><th>Nakshatra</th><th>Retro</th></tr></thead><tbody>' +
      transitRows(chart, true) + '</tbody></table></div>' +
      '<div class="area-grid">' +
      '<article class="area"><h3>Lagna reading</h3><p>Ascendant is ' + chart.lagna.rashi + ' (' + chart.lagna.rashiEn + ' / ' + chart.lagna.rashiTe + ') at ' + C.fmtDeg(chart.lagna.deg) +
      '. Body, vitality and first impression follow this sign. Lord is ' + LORDS[chart.lagna.rashiIdx] + '.</p></article>' +
      '<article class="area"><h3>Chandra rasi</h3><p>Moon is in ' + chart.grahas.Chandra.rashi + ', nakshatra ' + chart.grahas.Chandra.nakshatra +
      '. Rashifal on this site is counted from this Moon. Open Rashifal and we can highlight ' + T.RASHIS[chart.grahas.Chandra.rashiIdx] + '.</p></article>' +
      '<article class="area"><h3>Today’s gochara on your Moon</h3><p>' + gochara.overview + '</p></article>' +
      '<article class="area"><h3>Sade Sati check</h3><p>' + (ss.on ? ('Active: ' + ss.phase) : ('Not in Sade Sati right now. Transit Shani is in the ' + ordinal(hMoon.Shani) + ' from your natal Moon (' + HOUSE_NAME[hMoon.Shani] + ').')) + '</p></article>' +
      '</div>' +
      '<p class="range">Guest charts are not stored unless you login and press Save. Calculations: Lahiri sidereal, astronomy-engine transits.</p>' +
      '</article>';

    document.getElementById('kStyle').querySelectorAll('button').forEach(function (b) {
      b.onclick = function () {
        state.chartStyle = b.getAttribute('data-kstyle');
        renderKundli(pack);
      };
    });

    var saveBtn = document.getElementById('btnSaveKundli');
    if (A.current()) {
      saveBtn.hidden = false;
      saveBtn.textContent = 'Save to my account';
      saveBtn.onclick = function () {
        var res = A.saveBirth(meta);
        if (!res.ok) { alert(res.err); return; }
        saveBtn.textContent = 'Saved to this device';
        paintAuth();
        renderRasiGrid();
      };
    } else {
      saveBtn.hidden = false;
      saveBtn.textContent = 'Login to save this kundli';
      saveBtn.onclick = function () { openAuth('register'); };
    }
  }

  function fillCities() {
    document.getElementById('cityList').innerHTML = CITIES.map(function (c) {
      return '<option value="' + c.n + '">';
    }).join('');
  }

  function bootCharts() {
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
      '<b>' + dateLabel(parts) + '</b> · ' + parts.clock + ' IST · ' +
      T.HYDERABAD.name + ' · Ayanamsha ' + state.today.ayanamsha.toFixed(4) + '° · ' +
      'Moon in ' + state.today.grahas.Chandra.rashi;

    var kDate = document.getElementById('kDate');
    var kTime = document.getElementById('kTime');
    var kPlace = document.getElementById('kPlace');
    if (kDate && !kDate.value) kDate.value = parts.iso;
    if (kTime && !kTime.value) kTime.value = '06:00';
    if (kPlace && !kPlace.value) kPlace.value = T.HYDERABAD.name;
  }

  function bind() {
    document.getElementById('rasiGrid').addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-rasi]');
      if (!btn) return;
      selectRasi(+btn.getAttribute('data-rasi'));
    });
    document.querySelectorAll('.period-btn').forEach(function (b) {
      b.addEventListener('click', function () { setPeriod(b.getAttribute('data-period')); });
    });
    document.querySelectorAll('[data-view]').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.preventDefault();
        switchView(b.getAttribute('data-view'));
      });
    });
    document.querySelectorAll('.auth-tab').forEach(function (b) {
      b.addEventListener('click', function () { setAuthTab(b.getAttribute('data-auth')); });
    });
    document.getElementById('authClose').onclick = function () {
      document.getElementById('authModal').hidden = true;
    };
    document.getElementById('authModal').addEventListener('click', function (ev) {
      if (ev.target.id === 'authModal') document.getElementById('authModal').hidden = true;
    });
    document.getElementById('loginForm').onsubmit = function (ev) {
      ev.preventDefault();
      var res = A.login(document.getElementById('loginEmail').value, document.getElementById('loginPass').value);
      if (!res.ok) {
        var e = document.getElementById('authErr');
        e.hidden = false; e.textContent = res.err; return;
      }
      document.getElementById('authModal').hidden = true;
      paintAuth();
      renderRasiGrid();
      if (res.user.birth) {
        selectRasi(res.user.birth.chandraIdx);
        document.getElementById('kName').value = res.user.birth.name || res.user.name;
      }
    };
    document.getElementById('registerForm').onsubmit = function (ev) {
      ev.preventDefault();
      var res = A.register(
        document.getElementById('regName').value,
        document.getElementById('regEmail').value,
        document.getElementById('regPass').value
      );
      if (!res.ok) {
        var e = document.getElementById('authErr');
        e.hidden = false; e.textContent = res.err; return;
      }
      document.getElementById('authModal').hidden = true;
      paintAuth();
    };
    document.getElementById('kundliForm').onsubmit = function (ev) {
      ev.preventDefault();
      var dt = document.getElementById('kDate').value.split('-');
      var tm = document.getElementById('kTime').value.split(':');
      var genderEl = document.querySelector('input[name="kGender"]:checked');
      var meta = {
        name: document.getElementById('kName').value.trim(),
        gender: genderEl ? genderEl.value : '',
        year: +dt[0], month: +dt[1], day: +dt[2],
        hour: +tm[0], minute: +tm[1] || 0,
        place: document.getElementById('kPlace').value.trim()
      };
      var pack = computeNatal(meta);
      state.natal = pack.chart;
      state.natalMeta = pack.meta;
      renderKundli(pack);
    };
  }

  function restoreUserKundli() {
    var user = A.current();
    if (!user || !user.birth) return;
    try {
      var pack = computeNatal(user.birth);
      state.natal = pack.chart;
      state.natalMeta = pack.meta;
      document.getElementById('kName').value = user.birth.name || user.name;
      if (user.birth.year) {
        document.getElementById('kDate').value = user.birth.year + '-' + T.pad(user.birth.month) + '-' + T.pad(user.birth.day);
        document.getElementById('kTime').value = T.pad(user.birth.hour) + ':' + T.pad(user.birth.minute);
        document.getElementById('kPlace').value = user.birth.place || T.HYDERABAD.name;
      }
    } catch (e) { console.warn(e); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    try {
      bootCharts();
      fillCities();
      bind();
      paintAuth();
      renderRasiGrid();
      restoreUserKundli();
      if (window.location.hash.indexOf('kundli') >= 0) switchView('kundli');
      var user = A.current();
      if (user && user.birth && user.birth.chandraIdx != null && window.location.hash.indexOf('kundli') < 0) {
        selectRasi(user.birth.chandraIdx);
      }
    } catch (err) {
      var mount = document.getElementById('phalaMount');
      if (mount) {
        mount.innerHTML = '<p class="err">Rasi results could not be filled. ' +
          String((err && err.message) || err) + '</p>';
      }
      console.error(err);
    }
  });
})();
