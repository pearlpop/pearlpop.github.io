'use strict';
(() => {
  const root = document.getElementById('tutoring');
  const config = window.HUB.tutoring;
  const form = root.querySelector('form');
  const emailInput = root.querySelector('#tutoring-email');
  const status = root.querySelector('#tutoring-status');
  const button = form.querySelector('button');
  const preview = root.querySelector('#booking-preview');
  root.querySelector('h2').textContent = config.title;
  root.querySelector('#tutoring-description').textContent = config.description;
  const demo = document.documentElement.dataset.preview === 'true';
  let requestId, lastEmail, widget, turnstileReady;
  const challenge = () => new Promise(async (resolve, reject) => {
    try {
      if (!turnstileReady) turnstileReady = new Promise((ready, fail) => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.onload = ready; script.onerror = fail; document.head.append(script);
      });
      await turnstileReady;
      if (widget !== undefined) window.turnstile.remove(widget);
      let host = root.querySelector('.spam-check');
      if (!host) { host = document.createElement('div'); host.className = 'spam-check'; form.append(host); }
      widget = window.turnstile.render(host, {sitekey:config.turnstileSiteKey,action:'discovery',theme:'dark',appearance:'interaction-only',callback:resolve,'error-callback':reject,'expired-callback':reject});
    } catch (error) { turnstileReady = null; reject(error); }
  });
  root.querySelector('#tutoring-back').addEventListener('click', () => {
    preview.hidden = true; form.hidden = false; emailInput.focus();
    root.querySelector('#booking-email-preview').value = '';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    const email = emailInput.value.trim();
    if (demo) {
      root.querySelector('#booking-email-preview').value = email;
      form.hidden = true; preview.hidden = false;
      root.querySelector('#booking-email-preview').focus();
      return;
    }
    if (!config.endpoint || !config.bookingUrl || !config.turnstileSiteKey) {
      status.textContent = 'Booking is not connected yet. Please try again later.';
      return;
    }
    // Validate destinations before collecting anything. No email in a request URL.
    let endpoint, destination;
    try {
      endpoint = new URL(config.endpoint, location.href);
      destination = new URL(config.bookingUrl);
      if (endpoint.protocol !== 'https:' || destination.protocol !== 'https:' || endpoint.username || endpoint.password || destination.username || destination.password) throw new Error();
      // This is a configured, owner-selected destination, never a URL supplied by a visitor.
      destination.searchParams.set(config.prefillParameter || 'email', email);
    } catch {
      status.textContent = 'Booking is not connected yet. Please try again later.';
      return;
    }
    button.disabled = true; status.textContent = 'Continuing…';
    try {
      if (lastEmail !== email || !requestId) { requestId = crypto.randomUUID(); lastEmail = email; }
      const token = await challenge();
      const response = await fetch(endpoint, {
        method: 'POST', credentials: 'omit', redirect: 'error',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, requestId, token }),
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) throw new Error();
      const receipt = await response.json();
      // Only the server's durable-save acknowledgment permits a redirect.
      if (receipt.saved !== true) throw new Error();
      location.assign(destination.href);
    } catch {
      status.textContent = 'Couldn’t confirm your submission. Please try again.';
      button.disabled = false;
    }
  });
})();
