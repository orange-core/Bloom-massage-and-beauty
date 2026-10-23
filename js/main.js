const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
document.querySelectorAll('[data-treatment]').forEach(link => {
  link.addEventListener('click', () => {
    const treatment = document.querySelector('#treatment');
    if (treatment) treatment.value = link.dataset.treatment;
  });
});
const form = document.querySelector('#enquiry-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const treatment = String(data.get('treatment') || '').trim();
    const message = String(data.get('message') || '').trim();
    const body = [
      'Hello Bloom Massage & Beauty,',
      '',
      'My name is ' + name + '. I would like to enquire about ' + treatment + '.',
      message ? 'A little more detail: ' + message : '',
      '',
      'Could you please share current pricing and availability?'
    ].filter(Boolean).join('\n');
    // The business WhatsApp number has not yet been verified. Copy the enquiry
    // for the visitor to send through Bloom's confirmed contact channel.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(body).then(() => {
        alert('Your enquiry has been copied. Open Bloom’s official contact channel and paste it to send. No appointment has been booked.');
      }).catch(() => showEnquiry(body));
    } else {
      showEnquiry(body);
    }
  });
}
function showEnquiry(body) {
  const existing = document.querySelector('.prepared-enquiry');
  if (existing) existing.remove();
  const wrap = document.createElement('div');
  wrap.className = 'prepared-enquiry';
  wrap.style.cssText = 'margin-top:16px;padding:16px;background:#f8f3ee;border:1px solid #c9d0c0;font-size:12px;white-space:pre-wrap;overflow-wrap:anywhere';
  const text = document.createElement('p');
  text.textContent = body;
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'button button-dark';
  copy.textContent = 'Copy enquiry';
  copy.addEventListener('click', () => {
    if (navigator.clipboard) navigator.clipboard.writeText(body);
    else {
      const range = document.createRange();
      range.selectNodeContents(text);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  wrap.append(text, copy);
  form.appendChild(wrap);
  wrap.scrollIntoView({behavior:'smooth', block:'nearest'});
}