/* Transit engine for rasi-phala page only.
   Lahiri (Chitrapaksha) sidereal · Hyderabad default · astronomy-engine primary.
   Independent of grahabalacaltotal.html */
(function (global) {
  'use strict';

  var DEG = Math.PI / 180;
  var RAD = 180 / Math.PI;
  var RASHIS = ['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
  var RASHI_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  var RASHI_TE = ['మేషం','వృషభం','మిథునం','కర్కాటకం','సింహం','కన్యా','తులా','వృశ్చికం','ధనుస్సు','మకరం','కుంభం','మీనం'];
  var GRAHAS = ['Surya','Chandra','Kuja','Budha','Guru','Shukra','Shani','Rahu','Ketu'];
  var GRAHA_EN = { Surya:'Sun', Chandra:'Moon', Kuja:'Mars', Budha:'Mercury', Guru:'Jupiter', Shukra:'Venus', Shani:'Saturn', Rahu:'Rahu', Ketu:'Ketu' };
  var BODY = { Surya:'Sun', Chandra:'Moon', Kuja:'Mars', Budha:'Mercury', Guru:'Jupiter', Shukra:'Venus', Shani:'Saturn' };
  var NAKSHATRAS = [
    'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
    'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
    'Moola','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'
  ];

  var HYDERABAD = { name:'Hyderabad, India', lat:17.3850, lng:78.4867, tz:5.5, tzName:'Asia/Kolkata' };

  function sind(d){ return Math.sin(d * DEG); }
  function cosd(d){ return Math.cos(d * DEG); }
  function norm360(d){ return ((d % 360) + 360) % 360; }
  function T(JD){ return (JD - 2451545.0) / 36525.0; }

  function calcJD(year, month, day, hour){
    var H = hour;
    var dayFrac = day + H / 24;
    var Y = year, M = month;
    if (M <= 2) { Y--; M += 12; }
    var A = Math.floor(Y / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + dayFrac + B - 1524.5;
  }

  function deltaT(JD){
    var y = 2000.0 + (JD - 2451545.0) / 365.25;
    var u, dt;
    if (y < 2005) {
      u = y - 2000;
      dt = 63.86 + 0.3345 * u - 0.060374 * u * u + 0.0017275 * u * u * u;
    } else if (y < 2050) {
      u = y - 2000;
      dt = 62.92 + 0.32217 * u + 0.005589 * u * u;
    } else {
      u = (y - 1820) / 100;
      dt = -20 + 32 * u * u - 0.5628 * (2150 - y);
    }
    return dt;
  }

  function JD_TT(JD_UT){ return JD_UT + deltaT(JD_UT) / 86400.0; }

  function lahiriAyanamsha(JD){
    var t = (JD - 2451545.0) / 36525.0;
    function pA(x){ return 5029.0966 * x + 1.11113 * x * x - 0.000006 * x * x * x; }
    var T_EPOCH = (2435553.5 - 2451545.0) / 36525.0;
    var AYA_EPOCH = 23.250182778 - 0.004658035;
    return norm360(AYA_EPOCH + (pA(t) - pA(T_EPOCH)) / 3600.0);
  }

  function nutation(JD){
    var t = T(JD);
    var Om = (125.04452 - 1934.136261 * t + 0.0020708 * t * t) * DEG;
    var L = (280.4665 + 36000.7698 * t) * DEG;
    var Lp = (218.3165 + 481267.8813 * t) * DEG;
    return {
      dPsi: -17.20 * Math.sin(Om) - 1.32 * Math.sin(2 * L) - 0.23 * Math.sin(2 * Lp) + 0.21 * Math.sin(2 * Om),
      dEps: 9.20 * Math.cos(Om) + 0.57 * Math.cos(2 * L) + 0.10 * Math.cos(2 * Lp) - 0.09 * Math.cos(2 * Om)
    };
  }

  function astronomyTimeFromJdTt(JD_TT_val){
    if (typeof Astronomy === 'undefined' || !Astronomy.AstroTime) return null;
    var JD_UT = JD_TT_val - deltaT(JD_TT_val) / 86400.0;
    return new Astronomy.AstroTime(JD_UT - 2451545.0);
  }

  function astronomyGeoEclipticLon(bodyEnglish, JD_TT_val){
    var time = astronomyTimeFromJdTt(JD_TT_val);
    if (!time) return null;
    try {
      var vec = Astronomy.GeoVector(bodyEnglish, time, true);
      return norm360(Astronomy.Ecliptic(vec).elon);
    } catch (e) {
      return null;
    }
  }

  function astronomyRahuTrueLon(JD_TT_val){
    var time = astronomyTimeFromJdTt(JD_TT_val);
    if (!time) return null;
    try {
      var t1 = time.AddDays(1 / 24);
      var ecl0 = Astronomy.Ecliptic(Astronomy.GeoVector('Moon', time, false));
      var ecl1 = Astronomy.Ecliptic(Astronomy.GeoVector('Moon', t1, false));
      function cart(lon, lat){
        var L = lon * DEG, B = lat * DEG;
        return { x: Math.cos(B) * Math.cos(L), y: Math.cos(B) * Math.sin(L), z: Math.sin(B) };
      }
      var r0 = cart(ecl0.elon, ecl0.elat);
      var r1 = cart(ecl1.elon, ecl1.elat);
      var nx = r0.y * r1.z - r0.z * r1.y;
      var ny = r0.z * r1.x - r0.x * r1.z;
      return norm360(Math.atan2(nx, -ny) * RAD);
    } catch (e) {
      return null;
    }
  }

  function sunLonFallback(JD){
    var t = T(JD);
    var L0 = norm360(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
    var M = norm360(357.52911 + 35999.05029 * t - 0.0001537 * t * t) * DEG;
    var C = (1.914602 - 0.004817 * t) * Math.sin(M) + 0.019993 * Math.sin(2 * M);
    return norm360(L0 + C);
  }

  function tropLon(name, JD){
    if (name === 'Surya') {
      var s = astronomyGeoEclipticLon('Sun', JD);
      return s != null ? s : sunLonFallback(JD);
    }
    if (name === 'Chandra') {
      var m = astronomyGeoEclipticLon('Moon', JD);
      return m != null ? m : sunLonFallback(JD);
    }
    if (name === 'Rahu') {
      var r = astronomyRahuTrueLon(JD);
      return r != null ? r : norm360(125.0445479 - 1934.1362608 * T(JD));
    }
    if (name === 'Ketu') return norm360(tropLon('Rahu', JD) + 180);
    var eng = BODY[name];
    var hp = eng ? astronomyGeoEclipticLon(eng, JD) : null;
    return hp != null ? hp : 0;
  }

  function toSidereal(trop, JD, alreadyApparent){
    var nut = alreadyApparent ? 0 : nutation(JD).dPsi / 3600.0;
    return norm360(trop + nut - lahiriAyanamsha(JD));
  }

  function isRetrograde(name, JD){
    if (name === 'Surya' || name === 'Chandra') return false;
    if (name === 'Rahu' || name === 'Ketu') return true;
    var lon0 = tropLon(name, JD);
    var lon1 = tropLon(name, JD + 1);
    var delta = (lon1 - lon0 + 360) % 360;
    return delta > 180;
  }

  /* Same ascendant formula as grahabalacaltotal.html (tropical ecliptic longitude). */
  function calcLagna(JD_UT, lat, lng){
    var t = T(JD_UT);
    var nut = nutation(JD_UT);
    var eps0 = 23.439291111 - 0.013004167 * t - 0.00000164 * t * t + 0.000000504 * t * t * t;
    var eps = (eps0 + nut.dEps / 3600) * DEG;
    var JD0 = Math.floor(JD_UT - 0.5) + 0.5;
    var H = (JD_UT - JD0) * 24;
    var t0 = (JD0 - 2451545.0) / 36525.0;
    var GMST0 = 100.4606184 + 36000.770053608 * t0 + 0.000387933 * t0 * t0 - (t0 * t0 * t0) / 38710000;
    var GMST = norm360(GMST0 + 360.98564736629 * H / 24);
    var GAST = norm360(GMST + (nut.dPsi / 3600) * Math.cos(eps));
    var LST = norm360(GAST + lng);
    var RAMC = LST * DEG;
    var latR = lat * DEG;
    var y = Math.cos(RAMC);
    var x = -Math.sin(RAMC) * Math.cos(eps) - Math.tan(latR) * Math.sin(eps);
    return norm360(Math.atan2(y, x) * RAD);
  }

  function lonToRashi(sid){
    var ri = Math.floor(sid / 30) % 12;
    return { idx: ri, rashi: RASHIS[ri], en: RASHI_EN[ri], te: RASHI_TE[ri], deg: sid - Math.floor(sid / 30) * 30 };
  }

  function lonToNak(sid){
    return NAKSHATRAS[Math.floor(sid / (40 / 3)) % 27] || '';
  }

  function houseFrom(baseIdx, planetIdx){
    return ((planetIdx - baseIdx + 12) % 12) + 1;
  }

  function pad(n){ return String(n).padStart(2, '0'); }

  function istParts(date){
    var fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      weekday: 'long', hourCycle: 'h23'
    });
    var map = {};
    fmt.formatToParts(date).forEach(function (p) { map[p.type] = p.value; });
    return {
      year: +map.year, month: +map.month, day: +map.day,
      hour: +map.hour, minute: +map.minute, second: +map.second,
      weekday: map.weekday,
      iso: map.year + '-' + map.month + '-' + map.day,
      clock: map.hour + ':' + map.minute + ':' + map.second
    };
  }

  function partsToJdUt(p, tz){
    var localH = p.hour + p.minute / 60 + (p.second || 0) / 3600;
    var uh = localH - tz;
    var y = p.year, m = p.month, d = p.day;
    if (uh < 0) { uh += 24; d--; }
    if (uh >= 24) { uh -= 24; d++; }
    if (d <= 0) { m--; if (m <= 0) { m = 12; y--; } d += 31; }
    var dpm = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) dpm[2] = 29;
    if (d > dpm[m]) { d -= dpm[m]; m++; if (m > 12) { m = 1; y++; } }
    return calcJD(y, m, d, uh);
  }

  function sundayStartIst(parts){
    var names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var idx = names.indexOf(parts.weekday);
    if (idx < 0) idx = 0;
    var noonUtc = Date.UTC(parts.year, parts.month - 1, parts.day, 6, 30, 0);
    var q = istParts(new Date(noonUtc - idx * 86400000));
    return { year: q.year, month: q.month, day: q.day, hour: 6, minute: 0, second: 0, weekday: 'Sunday' };
  }

  function addDaysParts(p, days){
    var src = (p && p.parts) ? p.parts : p;
    var y = +src.year, m = +src.month, d = +src.day;
    if (!y || !m || !d) {
      var now = istParts(new Date());
      y = now.year; m = now.month; d = now.day;
    }
    var utc = Date.UTC(y, m - 1, d, 6, 30, 0) + days * 86400000;
    var q = istParts(new Date(utc));
    return { year: q.year, month: q.month, day: q.day, hour: src.hour || 6, minute: src.minute || 0, second: src.second || 0, weekday: q.weekday };
  }

  function computeAt(parts, place){
    place = place || HYDERABAD;
    var JD_UT = partsToJdUt(parts, place.tz);
    var JD = JD_TT(JD_UT);
    var grahas = {};
    GRAHAS.forEach(function (g) {
      var trop = tropLon(g, JD);
      var sid = g === 'Ketu' ? norm360(toSidereal(tropLon('Rahu', JD), JD) + 180) : toSidereal(trop, JD);
      var rd = lonToRashi(sid);
      grahas[g] = {
        name: g, en: GRAHA_EN[g], sid: sid,
        rashi: rd.rashi, rashiEn: rd.en, rashiTe: rd.te, rashiIdx: rd.idx,
        deg: rd.deg, nakshatra: lonToNak(sid), retro: isRetrograde(g, JD)
      };
    });
    var lagTrop = calcLagna(JD_UT, place.lat, place.lng);
    var lagSid = toSidereal(lagTrop, JD, true);
    var lag = lonToRashi(lagSid);
    return {
      parts: parts, place: place, JD: JD, JD_UT: JD_UT,
      ayanamsha: lahiriAyanamsha(JD),
      grahas: grahas,
      lagna: { sid: lagSid, rashi: lag.rashi, rashiEn: lag.en, rashiTe: lag.te, rashiIdx: lag.idx, deg: lag.deg }
    };
  }

  global.RasiTransit = {
    RASHIS: RASHIS, RASHI_EN: RASHI_EN, RASHI_TE: RASHI_TE,
    GRAHAS: GRAHAS, GRAHA_EN: GRAHA_EN, NAKSHATRAS: NAKSHATRAS,
    HYDERABAD: HYDERABAD,
    houseFrom: houseFrom, lonToRashi: lonToRashi, lonToNak: lonToNak,
    istParts: istParts, sundayStartIst: sundayStartIst, addDaysParts: addDaysParts,
    computeAt: computeAt, pad: pad,
    calcJD: calcJD, partsToJdUt: partsToJdUt, JD_TT: JD_TT,
    tropLon: tropLon, toSidereal: toSidereal, lahiriAyanamsha: lahiriAyanamsha,
    isRetrograde: isRetrograde, norm360: norm360, dateToJdUt: function (date) {
      return date.getTime() / 86400000 + 2440587.5;
    }
  };
})(window);
