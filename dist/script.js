'use strict';

const translations = {
  ru: {
    title: 'sp1ne — сайты с характером', description: 'sp1ne — frontend и разработка с AI. Сайты, интерфейсы и внимание к деталям. Мои проекты и контакты.',
    skip: 'Перейти к проектам', home: 'sp1ne — главная', navLabel: 'Основная навигация', navWork: 'Проекты', navAbout: 'Обо мне', navContact: 'Обсудить проект', languageLabel: 'Язык сайта', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню',
    heroTitle: 'Собираю сайты.<br><em>Воплощаю идеи.</em>', heroDescription: 'Frontend и&nbsp;разработка с&nbsp;AI.<br>Сайты с&nbsp;вниманием к&nbsp;деталям.', heroCta: 'Посмотреть проекты', heroNote: 'Работы можно открыть и посмотреть',
    workTitle: 'Мои проекты', workIntro: 'Разные проекты и настроения.<br>От макета до работающего сайта.', practice: 'Учебный проект',
    futurePreview: 'Открыть демо Future Tech в новой вкладке', areaPreview: 'Открыть демо Area в новой вкладке', futureAlt: 'Главная страница Future Tech: тёмная тема и жёлтые акценты', areaAlt: 'Главная страница Area: крупная типографика и светлый интерфейс', previewHint: 'Посмотреть сайт',
    futureDescription: 'Сайт про современные технологии.<br>Новости, статьи и раздел подкастов.<br>Тёмная тема и редакционная сетка.', areaDescription: 'Лендинг для сервиса аналитики.<br>Крупный шрифт и свободная сетка.<br>Внятный рассказ о самом продукте.', projectRole: 'Моя работа — вёрстка по макету Figma, с опорой на видеоуроки.', technologies: 'Технологии', openSite: 'Открыть сайт', workFootnote: 'От первого макета к собственному подходу.', allRepos: 'Все репозитории',
    forestAlt: 'Тёмный хвойный лес, уходящий в горный туман', aboutTitle: 'За интерфейсом<br><em>стоит человек.</em>', aboutLead: 'Я — sp1ne. Мне интересно, как из идеи, нескольких строк и точных деталей получается цельный сайт.', aboutBody: 'Начинал с макетов в Figma.<br>Учился по видео на YouTube.<br>Сейчас собираю сайты с AI,<br>изучаю код и исправляю баги.', aboutAside: 'Также изучал backend. Сейчас мой главный фокус — frontend.', skillsTools: 'Инструменты', skillsApproach: 'Подход', skillsApproachValue: 'AI + ручная доработка',
    approachTitle: 'От идеи до сайта', approachIntro: 'Сначала — задача и первая версия.<br>Затем — проверка и точные детали.', stepOneTitle: 'Понять задачу', stepOneBody: 'Разберём вашу идею и задачу.<br>Поймём, кто придёт на сайт.<br>Решим, что важно показать.', stepTwoTitle: 'Собрать основу', stepTwoBody: 'Наметим структуру и стиль.<br>Соберу первую версию с AI.<br>Обсудим, что стоит улучшить.', stepThreeTitle: 'Довести детали', stepThreeBody: 'Проверим сайт на телефоне.<br>Проверим на большом экране.<br>Доведём оставшиеся детали.',
    contactTitle: 'Обсудим идею.<br><em>Соберём сайт.</em>', contactBody: 'Расскажите, что хотите сделать. Можно начать с пары предложений или ссылки на понравившийся сайт.', contactCta: 'Обсудить в Telegram', contactNote: 'Начнём с обсуждения вашей идеи', footerLine: 'Frontend. AI. Внимание к деталям.', backToTop: 'sp1ne — наверх', toTop: 'К началу'
  },
  en: {
    title: 'sp1ne — websites with character', description: 'sp1ne — frontend and AI-assisted development. Websites, interfaces and attention to detail. Selected work and contact.',
    skip: 'Skip to selected work', home: 'sp1ne — home', navLabel: 'Main navigation', navWork: 'Selected work', navAbout: 'About me', navContact: 'Let’s talk', languageLabel: 'Website language', openMenu: 'Open menu', closeMenu: 'Close menu',
    heroTitle: 'Ideas into form.<br><em>Built for the web.</em>', heroDescription: 'Frontend, thoughtful details and&nbsp;AI.<br>Turning ideas into living interfaces.', heroCta: 'Explore my work', heroNote: 'Real projects you can explore',
    workTitle: 'Selected work', workIntro: 'Two projects. Two different moods.<br>From designs to working websites.', practice: 'Practice project',
    futurePreview: 'Open the Future Tech demo in a new tab', areaPreview: 'Open the Area demo in a new tab', futureAlt: 'Future Tech homepage with a dark theme and yellow accents', areaAlt: 'Area homepage with large typography and a light interface', previewHint: 'Explore website',
    futureDescription: 'A multi-page technology website.<br>News, articles and podcast layouts.<br>A dark, editorial visual language.', areaDescription: 'An analytics product landing page.<br>Expressive type and open layouts.<br>A clear, step-by-step product story.', projectRole: 'My contribution: implementing a Figma design, guided by video tutorials.', technologies: 'Technologies', openSite: 'Visit website', workFootnote: 'From following designs to finding my own approach.', allRepos: 'All repositories',
    forestAlt: 'Dark evergreen forest disappearing into mountain mist', aboutTitle: 'A human behind<br><em>every interface.</em>', aboutLead: 'I’m sp1ne. I enjoy turning ideas into websites, paying attention to the small details that make them feel right.', aboutBody: 'I started with Figma layouts<br>and followed video tutorials.<br>Now I build websites with AI,<br>work through code and fix bugs.', aboutAside: 'I’ve also explored backend.<br>My focus today is frontend.', skillsTools: 'Tools', skillsApproach: 'Approach', skillsApproachValue: 'AI + hands-on refinement',
    approachTitle: 'How I work', approachIntro: 'A clear idea and a working draft.<br>A thoughtful review of the details.', stepOneTitle: 'Understand the idea', stepOneBody: 'We’ll talk through your idea.<br>Find the audience and purpose.<br>Decide what the site should do.', stepTwoTitle: 'Build the foundation', stepTwoBody: 'We’ll shape the look and layout.<br>I’ll build a first version with AI.<br>Then we’ll review it together.', stepThreeTitle: 'Refine the details', stepThreeBody: 'We’ll check the mobile layout.<br>Review it on a larger screen.<br>And refine the final details.',
    contactTitle: 'Let’s talk ideas.<br><em>And build a site.</em>', contactBody: 'Tell me what you have in mind. A few sentences or a link to a website you like is a good place to start.', contactCta: 'Let’s talk on Telegram', contactNote: 'Start with a simple conversation', footerLine: 'Frontend. AI. Thoughtful details.', backToTop: 'sp1ne — back to top', toTop: 'Back to top'
  }
};

const menuButton = document.querySelector('.menu-toggle');
let currentLanguage = 'ru';

function keepShortWordsTogether(text, language) {
  const words = language === 'ru' ? 'в|на|с|к|у|о|и|а|но|из|за|по|до|от' : 'a|an|the|of|in|on|to|and|or';
  return text.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${words}) (?=\\S)`, 'giu'), '$1\u00a0');
}

function setMenu(open) {
  document.body.classList.toggle('nav-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', translations[currentLanguage][open ? 'closeMenu' : 'openMenu']);
}

function setLanguage(language, updateUrl = true) {
  if (!translations[language]) return;
  currentLanguage = language;
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.title = dictionary.title;
  document.querySelector('meta[name="description"]').content = dictionary.description;
  document.querySelector('meta[property="og:title"]').content = dictionary.title;
  document.querySelector('meta[property="og:description"]').content = dictionary.description;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = keepShortWordsTogether(dictionary[element.dataset.i18n], language);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    element.innerHTML = keepShortWordsTogether(dictionary[element.dataset.i18nHtml], language);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => element.setAttribute('aria-label', dictionary[element.dataset.i18nAria]));
  document.querySelectorAll('[data-i18n-alt]').forEach(element => element.alt = dictionary[element.dataset.i18nAlt]);
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  setMenu(false);
  try { localStorage.setItem('sp1ne-language', language); } catch { /* Storage may be unavailable in private browsing. */ }
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  }
}

let savedLanguage;
try { savedLanguage = localStorage.getItem('sp1ne-language'); } catch { /* Use the default. */ }
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
setLanguage(translations[requestedLanguage] ? requestedLanguage : (translations[savedLanguage] ? savedLanguage : 'ru'), false);
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('nav-open')) { setMenu(false); menuButton.focus(); }
});
document.addEventListener('click', event => {
  if (document.body.classList.contains('nav-open') && !event.target.closest('.header')) setMenu(false);
});
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

document.getElementById('year').textContent = new Date().getFullYear();
