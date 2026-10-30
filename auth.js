/* Local guest / login for rasi-phala (this browser only). */
(function (global) {
  'use strict';
  var USERS = 'visharada.users';
  var SESSION = 'visharada.session';

  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS) || '[]'); }
    catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(USERS, JSON.stringify(list)); }

  function current() {
    var email = localStorage.getItem(SESSION);
    if (!email) return null;
    var list = loadUsers();
    for (var i = 0; i < list.length; i++) if (list[i].email === email) return list[i];
    return null;
  }

  function register(name, email, pass) {
    email = String(email || '').trim().toLowerCase();
    name = String(name || '').trim();
    if (!name || !email || !pass || pass.length < 4) return { ok: false, err: 'Name, email and a password of 4+ characters are required.' };
    var list = loadUsers();
    if (list.some(function (u) { return u.email === email; })) {
      return { ok: false, err: 'This email is already registered on this device.' };
    }
    list.push({ name: name, email: email, pass: hash(pass), birth: null });
    saveUsers(list);
    localStorage.setItem(SESSION, email);
    return { ok: true, user: current() };
  }

  function login(email, pass) {
    email = String(email || '').trim().toLowerCase();
    var list = loadUsers();
    var u = null;
    for (var i = 0; i < list.length; i++) if (list[i].email === email) u = list[i];
    if (!u || u.pass !== hash(pass)) return { ok: false, err: 'Email or password is not correct.' };
    localStorage.setItem(SESSION, email);
    return { ok: true, user: u };
  }

  function logout() { localStorage.removeItem(SESSION); }

  function saveBirth(birth) {
    var u = current();
    if (!u) return { ok: false, err: 'Login first to save this kundli.' };
    var list = loadUsers();
    for (var i = 0; i < list.length; i++) {
      if (list[i].email === u.email) list[i].birth = birth;
    }
    saveUsers(list);
    return { ok: true, user: current() };
  }

  global.VisharadaAuth = {
    current: current, register: register, login: login, logout: logout, saveBirth: saveBirth
  };
})(window);
