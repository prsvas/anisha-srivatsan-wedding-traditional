/* Anonymous invitation view counter for Anisha & Srivatsan. */

const RSVP_DASHBOARD_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw4-uxFKKT3p9yC9JGYNBNAMmo33v4-M2OA7L4_Cf2OcToT5T6t1NkqSB5GWGcaxFAajQ/exec';

(function trackInvitationOpen() {
  if (!RSVP_DASHBOARD_WEB_APP_URL.startsWith('https://script.google.com/') ||
      !RSVP_DASHBOARD_WEB_APP_URL.endsWith('/exec')) return;

  let visitorId = '';
  try {
    visitorId = localStorage.getItem('as_wedding_visitor_id') || '';
    if (!visitorId) {
      visitorId = self.crypto && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, '')
        : 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 16);
      localStorage.setItem('as_wedding_visitor_id', visitorId);
    }
  } catch (error) {
    visitorId = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 16);
  }

  const url = RSVP_DASHBOARD_WEB_APP_URL +
    '?action=track&visitor=' + encodeURIComponent(visitorId) +
    '&t=' + Date.now();

  fetch(url, { mode: 'no-cors', cache: 'no-store', keepalive: true }).catch(function() {});
})();
