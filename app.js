const screens = [...document.querySelectorAll('.screen')];
const appRoot = document.querySelector('#app');
const navButtons = [...document.querySelectorAll('[data-nav]')];
const bottomButtons = [...document.querySelectorAll('.bottom-nav button')];
const taskSheet = document.querySelector('#taskSheet');
const sheetBackdrop = document.querySelector('#sheetBackdrop');
const toast = document.querySelector('#toast');

function navigate(name) {
  appRoot.scrollTop = 0;
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
  bottomButtons.forEach((button) => button.classList.toggle('active', button.dataset.nav === name));
  const current = document.querySelector(`[data-screen="${name}"] .scroll-content`);
  if (current) current.scrollTop = 0;
}

appRoot.scrollTop = 0;

navButtons.forEach((button) => button.addEventListener('click', () => navigate(button.dataset.nav)));

function setSheet(open) {
  taskSheet.classList.toggle('open', open);
  sheetBackdrop.classList.toggle('open', open);
  taskSheet.setAttribute('aria-hidden', String(!open));
}

document.querySelector('#startTask').addEventListener('click', () => setSheet(true));
document.querySelector('#closeSheet').addEventListener('click', () => setSheet(false));
sheetBackdrop.addEventListener('click', () => setSheet(false));
document.querySelector('#goCreate').addEventListener('click', () => {
  setSheet(false);
  navigate('create');
});

document.querySelectorAll('#toneChips button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('#toneChips button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('.choice-row .choice').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.choice-row .choice').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

const editor = document.querySelector('#creatorEditor');
const loading = document.querySelector('#loadingState');
const result = document.querySelector('#creatorResult');

function generate() {
  editor.hidden = true;
  result.hidden = true;
  loading.hidden = false;
  setTimeout(() => {
    loading.hidden = true;
    result.hidden = false;
    document.querySelector('[data-screen="create"] .scroll-content').scrollTop = 0;
  }, 1450);
}

document.querySelector('#generateBtn').addEventListener('click', generate);
document.querySelector('#regenBtn').addEventListener('click', () => {
  result.hidden = true;
  loading.hidden = false;
  setTimeout(() => {
    document.querySelector('.result-card h3').textContent = '带猫看世界的第 1 天：摄影师本人表示非常满意😼';
    document.querySelector('#captionText').textContent = '风很大，草很软，远处还有从没见过的朋友。花卷按下快门的那一刻，大概也偷偷把这片秋天收藏了起来。下一站想带它去哪？';
    loading.hidden = true;
    result.hidden = false;
  }, 1100);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelector('#acceptBtn').addEventListener('click', () => {
  document.querySelector('.progress i').style.width = '83%';
  document.querySelector('#profileScore').textContent = '82%';
  showToast('任务完成，花卷画像已更新 ✦');
  setTimeout(() => navigate('profile'), 1200);
});

document.querySelector('.edit-copy').addEventListener('click', () => {
  const caption = document.querySelector('#captionText');
  const updated = window.prompt('编辑 AI 草稿', caption.textContent);
  if (updated && updated.trim()) {
    caption.textContent = updated.trim();
    showToast('已保留你的修改，Petty 会学习这次偏好');
  }
});

document.querySelectorAll('.filter-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-tabs button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    showToast(`已切换到「${button.textContent}」`);
  });
});
