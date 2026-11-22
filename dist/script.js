'use strict';

const translations = {
  ru: {
    title: 'sp1ne — сайты с характером', description: 'sp1ne — frontend и разработка с AI. Сайты, интерфейсы и внимание к деталям. Мои проекты и контакты.',
    skip: 'Перейти к проектам', home: 'sp1ne — главная', navLabel: 'Основная навигация', navWork: 'Проекты', navAbout: 'Обо мне', navContact: 'Обсудить проект', languageLabel: 'Язык сайта', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню',
    heroTitle: 'Собираю сайты.<br><em>Воплощаю идеи.</em>', heroDescription: 'Frontend и&nbsp;разработка с&nbsp;AI.<br>Сайты с&nbsp;вниманием к&nbsp;деталям.', heroCta: 'Посмотреть проекты', heroNote: 'Работы можно открыть и посмотреть',
    workTitle: 'Мои проекты', workIntro: 'Разные проекты и настроения.<br>От макета до работающего сайта.', practice: 'Учебный проект', appLabel: 'Приложение', attentionDescription: 'Сайт приложения для концентрации: скачивание для Android и веб-планировщик с локальным сохранением.', attentionSiteAlt: 'Главная страница сайта Attention', attentionPreview: 'Открыть сайт Attention', attentionOpen: 'Открыть сайт', attentionStatus: 'Готовится к выпуску в Google Play. Ссылка появится после публикации.', attentionPlanAlt: 'Экран планировщика Attention', attentionFocusAlt: 'Настройка помодоро-сессии в Attention', clientProject: 'Клиентский проект', coffeeDescription: 'Сайт городской кофейни: меню напитков и выпечки, история и информация для посетителей.', hydraDescription: 'Полноценный сайт с каталогом материалов для GTA 5 RP и админ-панелью. В демо показана публичная часть.', coffeePreview: 'Открыть демо кофейни «Пауза»', hydraPreview: 'Открыть сайт HYDRA', coffeeAlt: 'Главный экран кофейни «Пауза»', hydraAlt: 'Логотип HYDRA', openDemo: 'Открыть демо',
    futurePreview: 'Открыть демо Future Tech в новой вкладке', areaPreview: 'Открыть демо Area в новой вкладке', futureAlt: 'Главная страница Future Tech: тёмная тема и жёлтые акценты', areaAlt: 'Главная страница Area: крупная типографика и светлый интерфейс', previewHint: 'Посмотреть сайт',
    futureDescription: 'Сайт про современные технологии.<br>Новости, статьи и раздел подкастов.<br>Тёмная тема и редакционная сетка.', areaDescription: 'Лендинг для сервиса аналитики.<br>Крупный шрифт и свободная сетка.<br>Внятный рассказ о самом продукте.', projectRole: 'Моя работа — вёрстка по макету Figma.', technologies: 'Технологии', openSite: 'Открыть сайт', workFootnote: 'От первого макета к собственному подходу.', allRepos: 'Все репозитории',
    forestAlt: 'Тёмный хвойный лес, уходящий в горный туман', aboutTitle: 'За интерфейсом<br><em>стоит человек.</em>', aboutLead: 'Я — sp1ne. Занимаюсь разработкой, изучаю новые технологии и превращаю идеи в собственные проекты.', aboutBody: 'Начинал с frontend: HTML, CSS, JavaScript и Vue.js. Затем стал изучать backend, чтобы понимать приложения не только со стороны интерфейса, но и изнутри.', aboutCurrent: 'Сейчас изучаю Rust и работаю над собственным проектом. Мне нравится пробовать разные подходы, разбираться в инструментах и самостоятельно находить решения.', aboutFuture: 'Дальше хочу развиваться в Machine Learning и искусственном интеллекте: получить больше практического опыта и реализовать свои идеи.', aboutAside: 'Продолжаю учиться, экспериментировать и работать над новыми проектами.', toolkitTitle: 'Мой стек', toolkitIntro: 'От интерфейса до логики приложения.', skillsTools: 'Инструменты и среда', skillsLearning: 'Сейчас изучаю', skillsFuture: 'Дальше — больше', skillsInterests: 'Машинное обучение / Искусственный интеллект',
    approachTitle: 'От идеи до сайта', approachIntro: 'Сначала — задача и первая версия.<br>Затем — проверка и точные детали.', stepOneTitle: 'Понять задачу', stepOneBody: 'Разберём вашу идею и задачу.<br>Поймём, кто придёт на сайт.<br>Решим, что важно показать.', stepTwoTitle: 'Собрать основу', stepTwoBody: 'Наметим структуру и стиль.<br>Соберу первую версию с AI.<br>Обсудим, что стоит улучшить.', stepThreeTitle: 'Довести детали', stepThreeBody: 'Проверим сайт на телефоне.<br>Проверим на большом экране.<br>Доведём оставшиеся детали.',
    contactTitle: 'Обсудим идею.<br><em>Соберём сайт.</em>', contactBody: 'Расскажите, что хотите сделать. Можно начать с пары предложений или ссылки на понравившийся сайт.', contactCta: 'Обсудить в Telegram', contactNote: 'Начнём с обсуждения вашей идеи', backToTop: 'sp1ne — наверх', toTop: 'К началу'
  },
  en: {
    title: 'sp1ne — websites with character', description: 'sp1ne — frontend and AI-assisted development. Websites, interfaces and attention to detail. Selected work and contact.',
    skip: 'Skip to selected work', home: 'sp1ne — home', navLabel: 'Main navigation', navWork: 'Selected work', navAbout: 'About me', navContact: 'Let’s talk', languageLabel: 'Website language', openMenu: 'Open menu', closeMenu: 'Close menu',
    heroTitle: 'Ideas into form.<br><em>Built for the web.</em>', heroDescription: 'Frontend, thoughtful details and&nbsp;AI.<br>Turning ideas into living interfaces.', heroCta: 'Explore my work', heroNote: 'Real projects you can explore',
    workTitle: 'Selected work', workIntro: 'Different projects and moods.<br>From designs to working websites.', practice: 'Practice project', appLabel: 'App', attentionDescription: 'A focus app website with an Android download and a browser-based planner with local storage.', attentionSiteAlt: 'Attention website homepage', attentionPreview: 'Open the Attention website', attentionOpen: 'Open website', attentionStatus: 'Being prepared for Google Play. A link will be added after release.', attentionPlanAlt: 'Attention planner screen', attentionFocusAlt: 'Setting up a Pomodoro session in Attention', clientProject: 'Client project', coffeeDescription: 'A city coffee bar concept with a menu, a story and visitor information.', hydraDescription: 'A full GTA 5 RP materials website with a catalog and admin panel. The demo shows the public-facing pages.', coffeePreview: 'Open the Pausa coffee demo', hydraPreview: 'Open the HYDRA website', coffeeAlt: 'Pausa coffee bar homepage', hydraAlt: 'HYDRA logo', openDemo: 'Open demo',
    futurePreview: 'Open the Future Tech demo in a new tab', areaPreview: 'Open the Area demo in a new tab', futureAlt: 'Future Tech homepage with a dark theme and yellow accents', areaAlt: 'Area homepage with large typography and a light interface', previewHint: 'Explore website',
    futureDescription: 'A multi-page technology website.<br>News, articles and podcast layouts.<br>A dark, editorial visual language.', areaDescription: 'An analytics product landing page.<br>Expressive type and open layouts.<br>A clear, step-by-step product story.', projectRole: 'My contribution: implementing a Figma design.', technologies: 'Technologies', openSite: 'Visit website', workFootnote: 'From following designs to finding my own approach.', allRepos: 'All repositories',
    forestAlt: 'Dark evergreen forest disappearing into mountain mist', aboutTitle: 'A human behind<br><em>every interface.</em>', aboutLead: 'I’m sp1ne. I build software, explore new technologies and turn ideas into projects of my own.', aboutBody: 'I started with frontend development: HTML, CSS, JavaScript and Vue.js. Then I began exploring backend development to understand how applications work beyond the interface.', aboutCurrent: 'I’m currently learning Rust and working on my own project. I enjoy trying different approaches, exploring new tools and finding solutions independently.', aboutFuture: 'Next, I want to explore machine learning and artificial intelligence, gain more hands-on experience and bring my own ideas to life.', aboutAside: 'Always learning, experimenting and working on new projects.', toolkitTitle: 'My toolkit', toolkitIntro: 'From interfaces to application logic.', skillsTools: 'Tools & environment', skillsLearning: 'Currently learning', skillsFuture: 'What’s next', skillsInterests: 'Machine Learning / Artificial Intelligence',
    approachTitle: 'How I work', approachIntro: 'A clear idea and a working draft.<br>A thoughtful review of the details.', stepOneTitle: 'Understand the idea', stepOneBody: 'We’ll talk through your idea.<br>Find the audience and purpose.<br>Decide what the site should do.', stepTwoTitle: 'Build the foundation', stepTwoBody: 'We’ll shape the look and layout.<br>I’ll build a first version with AI.<br>Then we’ll review it together.', stepThreeTitle: 'Refine the details', stepThreeBody: 'We’ll check the mobile layout.<br>Review it on a larger screen.<br>And refine the final details.',
    contactTitle: 'Let’s talk ideas.<br><em>And build a site.</em>', contactBody: 'Tell me what you have in mind. A few sentences or a link to a website you like is a good place to start.', contactCta: 'Let’s talk on Telegram', contactNote: 'Start with a simple conversation', backToTop: 'sp1ne — back to top', toTop: 'Back to top'
  }
};

const menuButton = document.querySelector('.menu-toggle');
const defaultLanguage = 'en';
let currentLanguage = defaultLanguage;

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
    if (language !== defaultLanguage) url.searchParams.set('lang', language);
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  }
}

let savedLanguage;
try { savedLanguage = localStorage.getItem('sp1ne-language'); } catch { /* Use the default. */ }
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
setLanguage(translations[requestedLanguage] ? requestedLanguage : (translations[savedLanguage] ? savedLanguage : defaultLanguage), false);
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

function revealOnce(selector, rootClass, preference, options = {}) {
  if (!('IntersectionObserver' in window) || !preference.matches) return;
  const elements = document.querySelectorAll(selector);
  document.documentElement.classList.add(rootClass);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: options.threshold ?? 0.08, rootMargin: options.rootMargin ?? '0px 0px 80px 0px' });
  elements.forEach(element => observer.observe(element));
  // A resize or preference change must never leave previously hidden text stranded.
  preference.addEventListener('change', () => {
    observer.disconnect();
    elements.forEach(element => element.classList.add('is-visible'));
    document.documentElement.classList.remove(rootClass);
  }, { once: true });
}

// Text stays immediately visible on touch layouts. Project reveals use compositor-only motion.
revealOnce('.reveal', 'motion-ready', window.matchMedia('(min-width: 801px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'));
revealOnce('.project', 'projects-motion', window.matchMedia('(prefers-reduced-motion: no-preference)'), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.getElementById('year').textContent = new Date().getFullYear();
