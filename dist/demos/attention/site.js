import { androidRelease } from './release.js?v=1.7.1';
import { supportLinks } from './support.js';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const compactLayout = matchMedia('(max-width: 850px)');
const gallery = document.querySelector('[data-gallery]');
const featureList = gallery.querySelector('.feature-list');
const features = [...featureList.querySelectorAll('[data-screen]')];
const stage = gallery.querySelector('.screen-stage');
const caption = stage.querySelector('[data-screen-caption]');
const counter = stage.querySelector('[data-screen-count]');
const captions = ['План на сегодня', 'Интервал фокуса', 'Учебная роадмапа'];

function showFeature(feature, index) {
  if (stage.dataset.current === feature.dataset.screen) return;
  features.forEach(button => {
    button.classList.toggle('active', button === feature);
    button.setAttribute('aria-pressed', String(button === feature));
  });
  stage.dataset.current = feature.dataset.screen;
  stage.querySelectorAll('[data-slide]').forEach(image => {
    image.setAttribute('aria-hidden', String(image.dataset.slide !== feature.dataset.screen));
  });
  caption.textContent = captions[index];
  counter.textContent = `0${index + 1} / 0${features.length}`;
}

let scrollFrame = 0;
let selectionTimer = 0;

function syncGallery() {
  scrollFrame = 0;
  if (selectionTimer) return;
  const compact = compactLayout.matches;
  const listBounds = featureList.getBoundingClientRect();
  const target = compact ? listBounds.left + listBounds.width / 2 : window.innerHeight / 2;
  let nearest = 0;
  let distance = Infinity;
  features.forEach((button, index) => {
    const bounds = button.getBoundingClientRect();
    const center = compact ? bounds.left + bounds.width / 2 : bounds.top + bounds.height / 2;
    if (Math.abs(center - target) < distance) {
      distance = Math.abs(center - target);
      nearest = index;
    }
  });
  showFeature(features[nearest], nearest);
}

function scheduleGallerySync() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncGallery);
}

features.forEach((feature, index) => {
  feature.addEventListener('click', () => {
    showFeature(feature, index);
    clearTimeout(selectionTimer);
    const behavior = reduceMotion.matches ? 'instant' : 'smooth';
    if (compactLayout.matches) {
      const listBounds = featureList.getBoundingClientRect();
      const card = feature.getBoundingClientRect();
      featureList.scrollBy({
        left: card.left + card.width / 2 - listBounds.left - listBounds.width / 2,
        behavior,
      });
    } else {
      feature.scrollIntoView({ block: 'center', behavior });
    }
    selectionTimer = setTimeout(() => {
      selectionTimer = 0;
      scheduleGallerySync();
    }, reduceMotion.matches ? 0 : 550);
  });
});
window.addEventListener('scroll', scheduleGallerySync, { passive: true });
window.addEventListener('resize', scheduleGallerySync);
featureList.addEventListener('scroll', scheduleGallerySync, { passive: true });
scheduleGallerySync();

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('has-entered');
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.18 });
  document.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));
}

const downloadButton = document.querySelector('#download-button');
const downloadLabel = downloadButton.querySelector('[data-download-label]');
const progress = document.querySelector('#download-progress');
const status = document.querySelector('#download-status');

downloadButton.addEventListener('click', async () => {
  downloadButton.disabled = true;
  downloadLabel.textContent = 'Загружаем…';
  status.textContent = '';
  progress.value = 0;
  progress.hidden = false;
  const parts = [];
  let received = 0;
  try {
    for (let index = 0; index < androidRelease.partCount; index++) {
      const response = await fetch(androidRelease.partUrl(index));
      if (!response.ok || !response.body) throw new Error('Download failed');
      const reader = response.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          parts.push(value);
          received += value.byteLength;
          progress.value = Math.min(99, Math.floor(received / androidRelease.size * 100));
        }
      } finally {
        reader.releaseLock();
      }
    }
    const apk = new Blob(parts, { type: 'application/vnd.android.package-archive' });
    if (apk.size !== androidRelease.size) throw new Error('Invalid APK size');
    const digest = await crypto.subtle.digest('SHA-256', await apk.arrayBuffer());
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    if (hash !== androidRelease.sha256) throw new Error('Invalid APK digest');

    const url = URL.createObjectURL(apk);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Attention-${androidRelease.version}.apk`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    status.textContent = 'APK передан браузеру для сохранения.';
  } catch {
    status.textContent = 'Не удалось скачать APK. Попробуйте ещё раз.';
  } finally {
    progress.hidden = true;
    downloadLabel.textContent = 'Скачать Attention';
    downloadButton.disabled = false;
  }
});

const support = document.querySelector('[data-support-links]');
for (const { label, url } of supportLinks) {
  if (!label || !/^https?:\/\//i.test(url)) continue;
  const link = document.createElement('a');
  link.className = 'textlink';
  link.textContent = label;
  link.href = url;
  support.append(link);
}
support.hidden = !support.childElementCount;

const tonAddress = document.querySelector('#ton-donation-address');
const copyTonAddress = document.querySelector('#copy-ton-address');
const tonCopyStatus = document.querySelector('#ton-copy-status');
if (tonAddress && copyTonAddress && tonCopyStatus && navigator.clipboard?.writeText) {
  copyTonAddress.hidden = false;
  copyTonAddress.addEventListener('click', async () => {
    tonCopyStatus.textContent = '';
    try {
      await navigator.clipboard.writeText(tonAddress.textContent.trim());
      tonCopyStatus.textContent = 'Адрес скопирован.';
    } catch {
      tonCopyStatus.textContent = 'Выделите и скопируйте адрес вручную.';
    }
  });
}
