import {
  syblKeysEng,
  syblKeysEngShift,
  syblKeysRus,
  syblKeysRusShift,
  keyActive,
  syblKeysRusCaps,
  syblKeysEngCaps,
} from './data.js';

const body = document.querySelector('body');
const keyboard = document.createElement('div');
const screnInput = document.createElement('textarea');
const infoKeyboard = document.createElement('div');
const infoKeyboard2 = document.createElement('div');
const titleKeyboard = document.createElement('div');

keyboard.setAttribute('id', 'keyboard');
screnInput.classList.add('scren-input');
infoKeyboard.classList.add('info-keyboard');
infoKeyboard2.classList.add('info-keyboard');
titleKeyboard.classList.add('title-keyboard');
infoKeyboard.textContent = 'Клавиатура создана в операционной системе Windows';
infoKeyboard2.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
titleKeyboard.textContent = 'RSS Виртуальная клавиатура';
body.append(titleKeyboard);
body.append(screnInput);
body.append(keyboard);
body.append(infoKeyboard);
body.append(infoKeyboard2);
screnInput.focus();

function styleBtn(event) {
  event.target.parentNode.classList.toggle('active-click');
}
function capsStyle() {
  keyboard.querySelector('.caps-shift[data-keyk="20"]').firstChild.classList.toggle('active-click_caps');
}

function sortKysFunc(array) {
  if (keyboard.children.length) {
    for (let i = 0; i < keyboard.children.length; i += 1) {
      const child = keyboard.children[i].firstChild;
      const text = array[i][1];
      child.textContent = text;
    }
  }
}

function messageOutputClick(event) {
  if (event.target.parentNode.dataset.keyk === '20') {
    if (keyboard.children[16].textContent === 'й') {
      sortKysFunc(syblKeysRusCaps);
    } else if (keyboard.children[16].textContent === 'Й') {
      sortKysFunc(syblKeysRus);
    }
    if (keyboard.children[16].textContent === 'q') {
      sortKysFunc(syblKeysEngCaps);
    } else if (keyboard.children[16].textContent === 'Q') {
      sortKysFunc(syblKeysEng);
    }

    event.target.classList.toggle('active-click_caps');
  }
  if (event.target.parentNode.dataset.keyk === '8') {
    keyActive.Backspace(screnInput);
  } else if (event.target.parentNode.dataset.keyk === '9') {
    keyActive.Tab(screnInput);
  } else if (event.target.parentNode.dataset.keyk === '13') {
    keyActive.Enter(screnInput);
  } else if (event.target.parentNode.dataset.keyk === '46') {
    keyActive.Delete(screnInput);
  } else if (event.target.parentNode.dataset.keyk === '37') {
    keyActive.ArrowLeft(screnInput);
  } else if (event.target.parentNode.dataset.keyk === '39') {
    keyActive.ArrowRight(screnInput);
  } else if (event.target.parentNode.dataset.keyk === '16' || event.target.parentNode.dataset.keyk === '18' || event.target.parentNode.dataset.keyk === '17' || event.target.parentNode.dataset.keyk === '20' || event.target.parentNode.dataset.keyk === '36' || event.target.parentNode.dataset.keyk === '33' || event.target.parentNode.dataset.keyk === '34') {
    screnInput.value += '';
  } else {
    screnInput.value += event.target.textContent;
  }
}
function createButton(text, data, id) {
  const elem = document.createElement('div');
  const elem2 = document.createElement('span');
  if ((id >= 1 && id <= 12)
        || (id >= 16 && id <= 27) || (id >= 31 && id <= 41) || (id >= 45 && id <= 54)) {
    elem.classList.add('tab-vb-lite');
  } else if (id === 13) {
    elem.classList.add('tab-back');
  } else if (id === 15) {
    elem.classList.add('tab');
  } else if (id === 28) {
    elem.classList.add('tab-vb');
  } else if (id === 30 || id === 55 || id === 63) {
    elem.classList.add('caps-shift');
  } else if (id === 42 || id === 44) {
    elem.classList.add('enter-shift');
  } else if (id === 58 || id === 59 || id === 60 || id === 62) {
    elem.classList.add('frame-5');
  } else if (id === 61) {
    elem.classList.add('space');
  } else {
    elem.classList.add('dark-btn');
  }

  elem2.textContent = text;

  if (id === 44) {
    elem.dataset.code = 'ShiftLeft';
  }
  if (id === 58) {
    elem.dataset.code = 'ControlLeft';
  }
  if (id === 55) {
    elem.dataset.code = 'ShiftRight';
  }
  if (id === 63) {
    elem.dataset.code = 'ControlRight';
  }
  if (id === 60) {
    elem.dataset.code = 'AltLeft';
  }
  if (id === 62) {
    elem.dataset.code = 'AltRight';
  }

  elem.dataset.keyk = data;
  elem.append(elem2);
  elem.firstChild.addEventListener('mousedown', (event) => styleBtn(event));
  elem.firstChild.addEventListener('mouseup', (event) => styleBtn(event));
  elem.firstChild.addEventListener('click', (event) => messageOutputClick(event));
  return elem;
}

if (localStorage.getItem('layout') === null || localStorage.getItem('layout') === 'ENG') {
  syblKeysEng.forEach((el, id) => {
    const btn = createButton(el[1], el[0], id);
    keyboard.append(btn);
  });
} else if (localStorage.getItem('layout') === 'RUS') {
  syblKeysRus.forEach((el, id) => {
    const btn = createButton(el[1], el[0], id);
    keyboard.append(btn);
  });
}

function messageOutput(eveent) {
  if (eveent.key === 'Delete') {
    keyActive.Delete(screnInput);
  } else if (eveent.key === 'Backspace') {
    keyActive.Backspace(screnInput);
  } else if (eveent.key === 'Tab') {
    keyActive.Tab(screnInput);
  } else if (eveent.key === 'Enter') {
    keyActive.Enter(screnInput);
  } else if (eveent.key === 'Control' || eveent.key === 'Shift' || eveent.key === 'CapsLock' || eveent.key === 'Alt' || eveent.key === 'Home' || eveent.key === 'PageUp' || eveent.key === 'PageDown' || eveent.key === 'AltGraph') {
    console.log();
  } else if (eveent.key === 'ArrowLeft') {
    keyActive.ArrowLeft(screnInput);
  } else if (eveent.key === 'ArrowRight') {
    keyActive.ArrowRight(screnInput);
  } else {
    let lengthh = screnInput.selectionStart;
    if (localStorage.getItem('layout') === null || localStorage.getItem('layout') === 'ENG') {
      if (eveent.shiftKey && keyboard.children[16].textContent === 'Q' && !eveent.repeat) {
        const subl = syblKeysEngShift.filter((i) => i[0] === eveent.keyCode);
        screnInput.value = screnInput.value.slice(0, screnInput.selectionStart)
                    + subl[0][1] + screnInput.value.slice(screnInput.selectionStart);
        lengthh += 1;
        screnInput.selectionStart = lengthh;
        screnInput.selectionEnd = lengthh;
        screnInput.focus();
      } else {
        const subl = syblKeysEng.filter((i) => i[0] === eveent.keyCode);
        screnInput.value = screnInput.value.slice(0, screnInput.selectionStart)
                    + subl[0][1] + screnInput.value.slice(screnInput.selectionStart);
        lengthh += 1;
        screnInput.selectionStart = lengthh;
        screnInput.selectionEnd = lengthh;
        screnInput.focus();
      }
    } else if (localStorage.getItem('layout') === 'RUS') {
      if (eveent.shiftKey && keyboard.children[16].textContent === 'Й' && !eveent.repeat) {
        const subl = syblKeysRusShift.filter((i) => i[0] === eveent.keyCode);
        screnInput.value = screnInput.value.slice(0, screnInput.selectionStart)
                    + subl[0][1] + screnInput.value.slice(screnInput.selectionStart);
        lengthh += 1;
        screnInput.selectionStart = lengthh;
        screnInput.selectionEnd = lengthh;
        screnInput.focus();
      } else {
        const subl = syblKeysRus.filter((i) => i[0] === eveent.keyCode);
        screnInput.value = screnInput.value.slice(0, screnInput.selectionStart)
                    + subl[0][1] + screnInput.value.slice(screnInput.selectionStart);
        lengthh += 1;
        screnInput.selectionStart = lengthh;
        screnInput.selectionEnd = lengthh;
        screnInput.focus();
      }
    }
  }
}

document.addEventListener('keydown', (event) => {
  console.log(event);
  messageOutput(event);
  Array.from(keyboard.children).forEach((el) => {
    if (event.shiftKey && el.dataset.keyk === '16' && event.code === el.dataset.code) {
      el.classList.add('active');
    } else if (event.ctrlKey && el.dataset.keyk === '17' && event.code === el.dataset.code) {
      el.classList.add('active');
    } else if (event.altKey && el.dataset.keyk === '18' && event.code === el.dataset.code) {
      el.classList.add('active');
    } else if (+el.dataset.keyk === event.keyCode
            && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      el.classList.add('active');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey && keyboard.children[16].textContent === 'q') {
    sortKysFunc(syblKeysRus);
    localStorage.setItem('layout', 'RUS');
  } else if (event.ctrlKey && event.altKey && keyboard.children[16].textContent === 'й') {
    sortKysFunc(syblKeysEng);
    localStorage.setItem('layout', 'ENG');
  } else if (event.ctrlKey && event.altKey && keyboard.children[16].textContent === 'Й') {
    sortKysFunc(syblKeysEngCaps);
    localStorage.setItem('layout', 'ENG');
  } else if (event.ctrlKey && event.altKey && keyboard.children[16].textContent === 'Q') {
    sortKysFunc(syblKeysRusCaps);
    localStorage.setItem('layout', 'RUS');
  }

  if (event.shiftKey && keyboard.children[16].textContent === 'q' && !event.repeat) {
    sortKysFunc(syblKeysEngShift);
  } else if (event.shiftKey && keyboard.children[16].textContent === 'Q' && !event.repeat) {
    sortKysFunc(syblKeysEng);
  }

  if (event.shiftKey && keyboard.children[16].textContent === 'й' && !event.repeat) {
    sortKysFunc(syblKeysRusShift);
  } else if (event.shiftKey && keyboard.children[16].textContent === 'Й' && !event.repeat) {
    sortKysFunc(syblKeysRus);
  }

  if (event.code === 'CapsLock' && keyboard.children[16].textContent === 'й' && !event.repeat) {
    sortKysFunc(syblKeysRusCaps);
    capsStyle();
  } else if (event.code === 'CapsLock' && keyboard.children[16].textContent === 'Й' && !event.repeat) {
    sortKysFunc(syblKeysRus);
    capsStyle();
  }

  if (event.code === 'CapsLock' && keyboard.children[16].textContent === 'q' && !event.repeat) {
    sortKysFunc(syblKeysEngCaps);
    capsStyle();
  } else if (event.code === 'CapsLock' && keyboard.children[16].textContent === 'Q' && !event.repeat) {
    sortKysFunc(syblKeysEng);
    capsStyle();
  }

  event.preventDefault();
});

document.addEventListener('keyup', (event) => {
  Array.from(keyboard.children).forEach((el) => {
    el.classList.remove('active');
  });
  if (!event.shiftKey && event.code === 'ShiftLeft' && keyboard.children[16].textContent === 'Й' && !event.repeat) {
    sortKysFunc(syblKeysRus);
  } else if (!event.shiftKey && event.code === 'ShiftLeft' && keyboard.children[16].textContent === 'й' && !event.repeat) {
    sortKysFunc(syblKeysRus);
  }
  if (!event.shiftKey && event.code === 'ShiftLeft' && keyboard.children[16].textContent === 'Q' && !event.repeat) {
    sortKysFunc(syblKeysEng);
  } else if (!event.shiftKey && event.code === 'ShiftLeft' && keyboard.children[16].textContent === 'q' && !event.repeat) {
    sortKysFunc(syblKeysEng);
  }
  event.preventDefault();
});
