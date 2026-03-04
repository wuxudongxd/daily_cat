const catImage = document.getElementById('cat-image');
const statusText = document.getElementById('status');
const nextBtn = document.getElementById('next-btn');

async function loadCat() {
  statusText.textContent = '正在加载小猫...';
  statusText.classList.remove('hidden');
  nextBtn.disabled = true;

  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const url = data?.[0]?.url;

    if (!url) {
      throw new Error('接口未返回图片地址');
    }

    catImage.src = url;

    await new Promise((resolve, reject) => {
      catImage.onload = resolve;
      catImage.onerror = () => reject(new Error('图片加载失败'));
    });

    statusText.classList.add('hidden');
  } catch (error) {
    statusText.textContent = `加载失败：${error.message}`;
  } finally {
    nextBtn.disabled = false;
  }
}

nextBtn.addEventListener('click', loadCat);
window.addEventListener('DOMContentLoaded', loadCat);
