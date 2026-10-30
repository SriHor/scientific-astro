/* South Indian + North Indian chart HTML for rasi-phala. */
(function (global) {
  'use strict';

  var SI_ORDER = [
    'Meena', 'Mesha', 'Vrishabha', 'Mithuna',
    'Kumbha', null, null, 'Karka',
    'Makara', null, null, 'Simha',
    'Dhanu', 'Vrischika', 'Tula', 'Kanya'
  ];
  var ABBR = {
    Lagna: 'As', Surya: 'Su', Chandra: 'Mo', Kuja: 'Ma', Budha: 'Me', Guru: 'Ju',
    Shukra: 'Ve', Shani: 'Sa', Rahu: 'Ra', Ketu: 'Ke'
  };

  function fmtDeg(d) {
    var x = Number(d);
    if (!isFinite(x)) return '';
    var deg = Math.floor(x);
    var m = Math.round((x - deg) * 60);
    if (m === 60) { m = 0; deg++; }
    return deg + '°' + String(m).padStart(2, '0') + '′';
  }

  function byRashi(chart, includeLagna) {
    var map = {};
    var T = global.RasiTransit;
    T.RASHIS.forEach(function (r) { map[r] = []; });
    T.GRAHAS.forEach(function (g) {
      var p = chart.grahas[g];
      map[p.rashi].push({
        name: g, deg: p.deg, retro: p.retro, nak: p.nakshatra
      });
    });
    if (includeLagna && chart.lagna && chart.lagna.rashi && map[chart.lagna.rashi]) {
      map[chart.lagna.rashi].unshift({
        name: 'Lagna', deg: chart.lagna.deg, retro: false, nak: ''
      });
    }
    return map;
  }

  function houseOf(rashi, lagnaRashi) {
    var T = global.RasiTransit;
    var a = T.RASHIS.indexOf(rashi);
    var b = T.RASHIS.indexOf(lagnaRashi);
    return ((a - b + 12) % 12) + 1;
  }

  var SHORT = {
    Mesha: 'Me', Vrishabha: 'Ve', Mithuna: 'Mi', Karka: 'Ka', Simha: 'Si', Kanya: 'Kn',
    Tula: 'Tu', Vrischika: 'Vc', Dhanu: 'Dh', Makara: 'Mk', Kumbha: 'Ku', Meena: 'Mn'
  };

  function planetLine(p, compact) {
    var lab = compact ? (ABBR[p.name] || p.name) : p.name;
    var r = p.retro ? (compact ? 'R' : ' (R)') : '';
    var d = compact ? '' : (' <span class="deg">' + fmtDeg(p.deg) + '</span>');
    return '<div class="si-p ni-p">' + lab + r + d + '</div>';
  }

  function siCell(r, lagnaRashi, map, compact) {
    var isL = r === lagnaRashi;
    var h = houseOf(r, lagnaRashi);
    var pls = (map[r] || []).map(function (p) { return planetLine(p, !!compact); }).join('');
    var rashi = compact ? (SHORT[r] || r) : r;
    var hLab = compact ? '' : '<div class="si-h">' + (isL ? 'L' : h) + '</div>';
    return '<td class="' + (isL ? 'lagna' : '') + '">' + hLab +
      '<div class="si-r">' + rashi + '</div>' + pls + '</td>';
  }

  function south(chart, lagnaRashi, title, includeLagna, compact) {
    var map = byRashi(chart, includeLagna);
    var mid = (title || 'D-1').replace(/\s*·\s*South Indian/i, '');
    var html = '<table class="si-grid' + (compact ? ' si-compact' : '') + '" cellspacing="0" cellpadding="0"><tbody>';
    html += '<tr>' + siCell('Meena', lagnaRashi, map, compact) + siCell('Mesha', lagnaRashi, map, compact) +
      siCell('Vrishabha', lagnaRashi, map, compact) + siCell('Mithuna', lagnaRashi, map, compact) + '</tr>';
    html += '<tr>' + siCell('Kumbha', lagnaRashi, map, compact) +
      '<td class="si-mid" colspan="2" rowspan="2"><span>' + mid + '</span></td>' +
      siCell('Karka', lagnaRashi, map, compact) + '</tr>';
    html += '<tr>' + siCell('Makara', lagnaRashi, map, compact) + siCell('Simha', lagnaRashi, map, compact) + '</tr>';
    html += '<tr>' + siCell('Dhanu', lagnaRashi, map, compact) + siCell('Vrischika', lagnaRashi, map, compact) +
      siCell('Tula', lagnaRashi, map, compact) + siCell('Kanya', lagnaRashi, map, compact) + '</tr>';
    html += '</tbody></table>';
    return '<div class="chart-card' + (compact ? ' is-compact' : '') + '"><h4>' + title +
      '</h4><div class="si-wrap">' + html + '</div></div>';
  }

  function north(chart, lagnaRashi, title, includeLagna, compact) {
    var T = global.RasiTransit;
    var map = byRashi(chart, includeLagna);
    var lagIdx = T.RASHIS.indexOf(lagnaRashi);
    var houses = '';
    var h, r, isL, pls;
    for (h = 1; h <= 12; h++) {
      r = T.RASHIS[(lagIdx + h - 1) % 12];
      isL = h === 1;
      pls = (map[r] || []).map(function (p) { return planetLine(p, true); }).join('');
      houses += '<div class="ni-h ni-h' + h + (isL ? ' lagna' : '') + '">' +
        (compact ? '' : '<div class="ni-num">' + (isL ? 'L' : h) + '</div>') +
        '<div class="ni-r">' + (compact ? (SHORT[r] || r) : r) + '</div>' + pls + '</div>';
    }
    return '<div class="chart-card' + (compact ? ' is-compact' : '') + '"><h4>' + title + '</h4>' +
      '<div class="ni-wrap"><div class="ni-box"><div class="ni-diamond"></div>' + houses + '</div></div></div>';
  }

  function render(chart, lagnaRashi, title, style, includeLagna, compact) {
    title = title || 'Rasi Chart';
    return style === 'north'
      ? north(chart, lagnaRashi, title, includeLagna, compact)
      : south(chart, lagnaRashi, title, includeLagna, compact);
  }

  /* Parashari / JHora continuous D-9: floor(sid / 3°20′) mod 12. Same as getNavamsaRashi. */
  function navamsaIdx(sid) {
    var lon = ((Number(sid) % 360) + 360) % 360;
    return Math.floor(lon / (10 / 3)) % 12;
  }

  function navamsaDeg(sid) {
    var lon = ((Number(sid) % 360) + 360) % 360;
    return (lon % (10 / 3)) * 9;
  }

  function mapChart(chart, idxFn, degFn) {
    var T = global.RasiTransit;
    var grahas = {};
    T.GRAHAS.forEach(function (g) {
      var p = chart.grahas[g];
      var idx = idxFn(p.sid);
      grahas[g] = {
        name: g, en: p.en, sid: p.sid, rashi: T.RASHIS[idx], rashiEn: T.RASHI_EN[idx],
        rashiTe: T.RASHI_TE[idx], rashiIdx: idx, deg: degFn(p.sid),
        nakshatra: p.nakshatra, retro: p.retro
      };
    });
    var lIdx = idxFn(chart.lagna.sid);
    return {
      grahas: grahas,
      lagna: {
        sid: chart.lagna.sid, rashi: T.RASHIS[lIdx], rashiEn: T.RASHI_EN[lIdx],
        rashiTe: T.RASHI_TE[lIdx], rashiIdx: lIdx, deg: degFn(chart.lagna.sid)
      }
    };
  }

  function toNavamsaChart(chart) {
    return mapChart(chart, navamsaIdx, navamsaDeg);
  }

  /* Parashari Saptamsa (D-7): 7 parts of 30/7°. Odd signs from the sign; even signs from the 7th. */
  function saptamsaIdx(sid) {
    var lon = ((Number(sid) % 360) + 360) % 360;
    var idx = Math.floor(lon / 30);
    var d = lon % 30;
    var part = Math.floor(d / (30 / 7));
    if (part > 6) part = 6;
    var start = (idx % 2 === 0) ? idx : (idx + 6) % 12;
    return (start + part) % 12;
  }

  function saptamsaDeg(sid) {
    var lon = ((Number(sid) % 360) + 360) % 360;
    return (lon % (30 / 7)) * 7;
  }

  function toSaptamsaChart(chart) {
    return mapChart(chart, saptamsaIdx, saptamsaDeg);
  }

  global.RasiCharts = {
    render: render,
    south: south,
    north: north,
    toNavamsaChart: toNavamsaChart,
    toSaptamsaChart: toSaptamsaChart,
    fmtDeg: fmtDeg,
    ABBR: ABBR
  };
})(window);
