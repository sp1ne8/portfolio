const sections = {
  classic: {
    title: 'Классика',
    items: [
      ['Эспрессо', 'Двойной шот с плотным вкусом.', '40 мл', 190],
      ['Американо', 'Двойной эспрессо и горячая вода.', '200 мл', 220],
      ['Фильтр-кофе', 'Чёрный кофе на зерне дня.', '250 мл', 250],
      ['Капучино', 'Двойной эспрессо и нежная молочная пена.', '250 мл', 290],
      ['Латте', 'Эспрессо и молоко с тонкой пеной.', '300 мл', 310],
      ['Флэт уайт', 'Двойной эспрессо и немного молока.', '180 мл', 320]
    ]
  },
  seasonal: {
    title: 'Сезонное',
    items: [
      ['Эспрессо-тоник', 'Кофе, тоник, лёд и апельсиновая цедра.', '300 мл', 360],
      ['Латте с солёной карамелью', 'Эспрессо, молоко и солёная карамель.', '300 мл', 390],
      ['Облепиховый чай', 'Облепиха, апельсин и розмарин.', '400 мл', 350],
      ['Какао с корицей', 'Какао на молоке с щепоткой корицы.', '250 мл', 330]
    ]
  },
  pastry: {
    title: 'Выпечка',
    items: [
      ['Сливочный круассан', 'Классический круассан на сливочном масле.', '80 г', 220],
      ['Миндальный круассан', 'Слоёное тесто, миндальный крем и сахарная пудра.', '105 г', 320],
      ['Булочка с корицей', 'Мягкое сдобное тесто с корицей и сливочной глазурью.', '110 г', 270],
      ['Банановый кекс', 'Ломтик бананового кекса с грецким орехом.', '100 г', 260]
    ]
  }
};

const filters = document.querySelector('.filters');
const popular = document.querySelector('#popular-menu');
const full = document.querySelector('#full-menu');
const status = document.querySelector('#menu-status');

function renderSection({ title, items }) {
  const section = document.createElement('div');
  section.className = 'list-section';
  const heading = document.createElement('h3');
  heading.textContent = title;
  section.append(heading);

  for (const [name, description, size, price] of items) {
    const row = document.createElement('div');
    row.className = 'menu-row';
    const info = document.createElement('div');
    const item = document.createElement('h4');
    item.textContent = name;
    const detail = document.createElement('p');
    detail.textContent = description;
    info.append(item, detail);
    const portion = document.createElement('span');
    portion.className = 'portion';
    portion.textContent = size;
    const cost = document.createElement('strong');
    cost.textContent = `${price} ₽`;
    row.append(info, portion, cost);
    section.append(row);
  }

  return section;
}

filters.addEventListener('click', (event) => {
  const active = event.target.closest('button[data-menu]');
  if (!active || active.getAttribute('aria-pressed') === 'true') return;

  for (const button of filters.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button === active));
  }

  const key = active.dataset.menu;
  popular.hidden = key !== 'popular';
  full.hidden = key === 'popular';
  if (key !== 'popular') {
    const selected = key === 'all' ? Object.values(sections) : [sections[key]];
    full.replaceChildren(...selected.map(renderSection));
  }
  status.textContent = `Показан раздел «${active.textContent}».`;
});
