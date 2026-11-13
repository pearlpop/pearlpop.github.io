'use strict';
(() => {
  const data = window.HUB;
  const icons = {
    world: '<circle cx="20" cy="20" r="15"/><ellipse cx="20" cy="20" rx="7" ry="15"/><path d="M5 20h30M9 10h22M9 30h22"/>',
    vr: '<path d="M9 12h22l5 7v11h-9l-7-6-7 6H4V19ZM4 20h32"/><circle cx="12" cy="20" r="3"/><circle cx="28" cy="20" r="3"/>',
    social: '<path d="M5 7h24v18H15l-7 6v-6H5ZM29 14h6v18h-6l-5 4v-4h-6v-7"/><path d="M11 13h12M11 19h8"/>',
    celebrate: '<path d="m8 16 16 16-21 5ZM13 7l3-4M26 11l5-5M31 23l6-1M21 3l1 4M34 12l3 3"/><path d="M18 16c0-5 5-3 5-8M25 23c5 0 3-5 8-5"/>',
    mail: '<rect x="5" y="9" width="30" height="23" rx="3"/><path d="m6 11 14 11 14-11"/><path d="m6 31 10-10m18 10-10-10"/>',
    sheet: '<rect x="7" y="5" width="26" height="30" rx="3"/><path d="M7 14h26M7 22h26M7 29h26M16 14v21M25 14v21"/>',
    database: '<ellipse cx="20" cy="10" rx="13" ry="5"/><path d="M7 10v20c0 7 26 7 26 0V10M7 20c0 7 26 7 26 0"/><path d="m17 17 7 5-7 5"/>',
    form: '<rect x="7" y="5" width="26" height="30" rx="3"/><path d="M13 12h14M13 19h14M13 26h7"/><path d="m25 28 3 3 6-7"/>',
    cards: '<rect x="6" y="8" width="21" height="28" rx="3" transform="rotate(-12 6 8)"/><rect x="15" y="5" width="21" height="29" rx="3" fill="var(--icon-bg)"/><path d="m25 12-5 7 5 7 5-7Z"/>',
    portfolio: '<rect x="5" y="12" width="30" height="22" rx="3"/><path d="M14 12V7h12v5M5 21h30M17 20v5h6v-5"/>',
    bag: '<path d="M8 13h24l3 22H5ZM14 14V9a6 6 0 0 1 12 0v5"/>',
    coffee: '<path d="M7 11h22v13a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9ZM29 13h3a5 5 0 0 1 0 10h-3M6 36h26M13 4v3M21 3v4"/>'
  };
  const set = (id, value) => { document.getElementById(id).textContent = value; };
  const safeURL = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
  set('handle', data.handle); set('bio', data.bio); set('intro', data.intro);
  document.querySelector('h1').replaceChildren(document.createTextNode(data.name), Object.assign(document.createElement('span'), { className: 'dot', textContent: '.' }));
  document.title = `${data.name} — Links`;
  // Refresh on load, midnight, and return from a suspended/background tab.
  let copyrightTimer;
  const updateCopyrightYear = () => {
    const now = new Date();
    set('year', now.getFullYear());
    clearTimeout(copyrightTimer);
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    copyrightTimer = setTimeout(updateCopyrightYear, midnight.getTime() - now.getTime() + 100);
  };
  updateCopyrightYear();
  window.addEventListener('pageshow', updateCopyrightYear);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateCopyrightYear();
  });
  for (const section of ['articles', 'apps', 'projects', 'goodies']) {
    const container = document.getElementById(`${section}-links`);
    for (const item of data[section]) {
      const url = safeURL(item.url);
      if (item.visible === false || (!url && !item.pending)) continue;
      const link = document.createElement(url ? 'a' : 'div'); link.className = 'link-row';
      if (url) link.href = url; else link.classList.add('pending-project');
      const text = document.createElement('span'); text.className = 'link-copy';
      const title = document.createElement('span'); title.className = 'link-title'; title.textContent = item.title;
      const note = document.createElement('span'); note.className = 'link-note'; note.textContent = item.note || '';
      const arrow = document.createElement('span'); arrow.className = 'arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
      const visual = document.createElement('span');
      visual.className = `link-visual visual-${item.icon || 'portfolio'}`;
      visual.setAttribute('aria-hidden', 'true');
      visual.innerHTML = `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[item.icon] || icons.portfolio}</svg>`;
      text.append(title, note); link.append(visual, text); if (url) link.append(arrow); container.append(link);
    }
    if (section === 'goodies' && container.childElementCount) { document.getElementById(section).hidden = false; document.getElementById('goodies-nav').hidden = false; }
  }
  const signupURL = safeURL(data.newsletter.url);
  if (signupURL) {
    document.getElementById('newsletter').hidden = false;
    set('newsletter-title', data.newsletter.title); set('newsletter-description', data.newsletter.description);
    document.getElementById('subscribe').href = signupURL;
  }
})();
