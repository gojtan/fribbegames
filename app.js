// Mobile navigation.
const menu = document.querySelector('.menu');

if (menu) {
  menu.addEventListener('click', () => {
    const open = document.querySelector('.navlinks').classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close ✕' : 'Menu ☰';
  });
}

// Prepare an email in the visitor's email application.
// The website does not submit or store the message.
const form = document.querySelector('#support-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const subject = `${data.get('topic')} — ${data.get('game')}`;
    const body = [
      `Game: ${data.get('game')}`,
      `Topic: ${data.get('topic')}`,
      `Device / Android version: ${data.get('device')}`,
      '',
      data.get('message'),
      '',
    ].join('\n');

    window.location.href =
      'mailto:fribbegames@outlook.com?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);

    document.querySelector('#form-status').textContent =
      'Your email app should open with your message. ' +
      'If it does not, email fribbegames@outlook.com directly. ' +
      'Your request is sent only when you press Send in your email app.';
  });
}
