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

// Beta applications use the same email handoff as player support.
const betaForm = document.querySelector('#beta-form');

if (betaForm) {
  betaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(betaForm);
    const subject = 'Beta tester application';
    const body = [
      `Name: ${data.get('name') || '(not provided)'}`,
      `Google Play email: ${data.get('email')}`,
      'Testing interest: Upcoming FribbeGames titles',
      `Device / Android version: ${data.get('device')}`,
      '',
      data.get('message') || '',
      '',
    ].join('\n');

    window.location.href =
      'mailto:fribbegames@outlook.com?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);

    document.querySelector('#beta-status').textContent =
      'Your email app should open with your application. Send the email there to apply. ' +
      'If it does not open, email fribbegames@outlook.com with your details. ' +
      'Your application has not been submitted by this website.';
  });
}

// Filter the game list by release status and game type.
const filters = document.querySelector('#game-filters');

if (filters) {
  const games = [...document.querySelectorAll('.game[data-status]')];
  const chips = [...filters.querySelectorAll('.chip')];
  const statusText = document.querySelector('#filter-status');
  const empty = document.querySelector('#games-empty');
  const active = { status: 'all', type: 'all' };

  const matches = (game, status, type) =>
    (status === 'all' || game.dataset.status === status) &&
    (type === 'all' || game.dataset.type.split(' ').includes(type));

  const apply = () => {
    let shown = 0;
    games.forEach((game) => {
      const visible = matches(game, active.status, active.type);
      game.hidden = !visible;
      if (visible) shown += 1;
    });

    chips.forEach((chip) => {
      const kind = chip.dataset.filter;
      const value = chip.dataset.value;
      chip.setAttribute('aria-pressed', String(active[kind] === value));
      const other = kind === 'status' ? active.type : active.status;
      const count = games.filter((game) =>
        kind === 'status' ? matches(game, value, other) : matches(game, other, value)
      ).length;
      chip.dataset.count = count;
      chip.classList.toggle('is-empty', count === 0 && value !== 'all');
    });

    statusText.textContent = `Showing ${shown} of ${games.length} games`;
    empty.hidden = shown !== 0;
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      active[chip.dataset.filter] = chip.dataset.value;
      apply();
    });
  });

  document.querySelector('#filter-reset').addEventListener('click', () => {
    active.status = 'all';
    active.type = 'all';
    apply();
  });

  filters.hidden = false;
  apply();
}

// Keep the hero game counts in sync with the game list.
document.querySelectorAll('[data-stat]').forEach((stat) => {
  const count = document.querySelectorAll(`.game[data-status="${stat.dataset.stat}"]`).length;
  if (count) stat.textContent = count;
});
