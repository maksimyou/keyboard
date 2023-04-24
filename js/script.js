import { syblKeysEng, syblKeysEngShift, syblKeysRus, syblKeysRusShift, keyActive } from "./data.js"
const body = document.querySelector("body");
const keyboard = document.createElement("div");
const screnInput = document.createElement("textarea");
const infoKeyboard = document.createElement("div");
const infoKeyboard2 = document.createElement("div");
const titleKeyboard = document.createElement("div");

keyboard.setAttribute("id", "keyboard");
screnInput.classList.add("scren-input");
infoKeyboard.classList.add("info-keyboard");
infoKeyboard2.classList.add("info-keyboard");
titleKeyboard.classList.add("title-keyboard");
infoKeyboard.textContent = `Клавиатура создана в операционной системе Windows`;
infoKeyboard2.textContent = `Для переключения языка комбинация: левыe ctrl + alt`;
titleKeyboard.textContent = 'RSS Виртуальная клавиатура';
body.append(titleKeyboard);
body.append(screnInput);
body.append(keyboard);
body.append(infoKeyboard);
body.append(infoKeyboard2);
screnInput.focus();


function createButton(text, data, id) {
    let elem = document.createElement("div");
    let elem2 = document.createElement("span");
    if (id >= 1 && id <= 12 || id >= 16 && id <= 27 || id >= 31 && id <= 41 || id >= 45 && id <= 54) {
        elem.classList.add("tab-vb-lite");
    } else if (id == 13) {
        elem.classList.add("tab-back");
    } else if (id == 15) {
        elem.classList.add("tab");
    } else if (id == 28) {
        elem.classList.add("tab-vb");
    } else if (id == 30 || id == 55 || id == 63) {
        elem.classList.add("caps-shift");
    } else if (id == 42 || id == 44) {
        elem.classList.add("enter-shift");
    } else if (id == 58 || id == 59 || id == 60 || id == 62) {
        elem.classList.add("frame-5");
    } else if (id == 61) {
        elem.classList.add("space");
    } else {
        elem.classList.add("dark-btn");
    }

    elem2.textContent = text;

    if (id == 44) {
        elem.dataset.code = 'ShiftLeft';
    }
    if (id == 58) {
        elem.dataset.code = 'ControlLeft';
    }
    if (id == 55) {
        elem.dataset.code = 'ShiftRight';
    }
    if (id == 63) {
        elem.dataset.code = 'ControlRight';
    }
    if (id == 60) {
        elem.dataset.code = 'AltLeft';
    }
    if (id == 62) {
        elem.dataset.code = 'AltRight';
    }

    elem.dataset.keyk = data;
    elem.append(elem2);
    return elem;
}

if (localStorage.getItem('layout') === null || localStorage.getItem('layout') === 'ENG') {
    syblKeysEng.forEach((el, id) => {
        let btn = createButton(el[1], el[0], id);
        keyboard.append(btn)
    })
} else if (localStorage.getItem('layout') === 'RUS') {
    syblKeysRus.forEach((el, id) => {
        let btn = createButton(el[1], el[0], id);
        keyboard.append(btn)
    })
}

function sortKysFunc(array) {
    if (keyboard.children.length) {
        for (let i = 0; i < keyboard.children.length; i++) {
            keyboard.children[i].firstChild.textContent = array[i][1];
        }
    }
}

function messageOutput(eveent) {

    if (eveent.key === "Delete") {
        keyActive.Delete(screnInput);
    }
    else if (eveent.key === "Backspace") {
        keyActive.Backspace(screnInput);
    } else if (eveent.key === "Tab") {
        keyActive.Tab(screnInput);
    } else if (eveent.key === "Enter") {
        keyActive.Enter(screnInput);
    } else if (eveent.key === "Control" || eveent.key === "Shift" || eveent.key === "CapsLock" || eveent.key === "Alt" || eveent.key === "Home" || eveent.key === "PageUp" || eveent.key === "PageDown" || eveent.key === "AltGraph") {
    } else if (eveent.key === "ArrowLeft") {
        keyActive.ArrowLeft(screnInput);
    } else if (eveent.key === "ArrowRight") {
        keyActive.ArrowRight(screnInput);
    } else {
        let lengthh = screnInput.selectionStart;
        if (localStorage.getItem('layout') === null || localStorage.getItem('layout') === 'ENG') {
            if (eveent.shiftKey && keyboard.children[16].textContent == 'Q' && !eveent.repeat) {
                let subl = syblKeysEngShift.filter(i => { if (i[0] === eveent.keyCode) return true; });
                screnInput.value = screnInput.value.slice(0, screnInput.selectionStart) + subl[0][1] + screnInput.value.slice(screnInput.selectionStart)
                screnInput.selectionStart = screnInput.selectionEnd = lengthh += 1;
                screnInput.focus()
            } else {

                let subl = syblKeysEng.filter(i => { if (i[0] === eveent.keyCode) return true; });
                screnInput.value = screnInput.value.slice(0, screnInput.selectionStart) + subl[0][1] + screnInput.value.slice(screnInput.selectionStart)
                screnInput.selectionStart = screnInput.selectionEnd = lengthh += 1;
                screnInput.focus()
            }
        } else if (localStorage.getItem('layout') === 'RUS') {
            if (eveent.shiftKey && keyboard.children[16].textContent == 'Й' && !eveent.repeat) {
                let subl = syblKeysRusShift.filter(i => { if (i[0] === eveent.keyCode) return true; });
                screnInput.value = screnInput.value.slice(0, screnInput.selectionStart) + subl[0][1] + screnInput.value.slice(screnInput.selectionStart)
                screnInput.selectionStart = screnInput.selectionEnd = lengthh += 1;
                screnInput.focus()
            } else {
                let subl = syblKeysRus.filter(i => { if (i[0] === eveent.keyCode) return true; });
                screnInput.value = screnInput.value.slice(0, screnInput.selectionStart) + subl[0][1] + screnInput.value.slice(screnInput.selectionStart)
                screnInput.selectionStart = screnInput.selectionEnd = lengthh += 1;
                screnInput.focus()
            }
        }
    }
}


document.addEventListener("keydown", function (event) {
    console.log(event)
    messageOutput(event);
    Array.from(keyboard.children).forEach(el => {
        if (event.shiftKey && el.dataset.keyk == '16' && event.code === el.dataset.code) {
            el.classList.add("active")
        } else if (event.ctrlKey && el.dataset.keyk == '17' && event.code === el.dataset.code) {
            el.classList.add("active")
        } else if (event.altKey && el.dataset.keyk == '18' && event.code === el.dataset.code) {
            el.classList.add("active")
        } else if (+el.dataset.keyk === event.keyCode && !event.shiftKey && !event.ctrlKey && !event.altKey) {
            el.classList.add("active")
        }
    })
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && keyboard.children[16].textContent == 'q') {
        sortKysFunc(syblKeysRus)
        localStorage.setItem('layout', 'RUS')
    } else if (event.ctrlKey && event.altKey && keyboard.children[16].textContent == 'й') {
        sortKysFunc(syblKeysEng)
        localStorage.setItem('layout', 'ENG');
    }
    if (event.shiftKey && keyboard.children[16].textContent == 'q' && !event.repeat) {
        sortKysFunc(syblKeysEngShift)
    }

    if (event.shiftKey && keyboard.children[16].textContent == 'й' && !event.repeat) {
        sortKysFunc(syblKeysRusShift)
    }
    event.preventDefault();

});

document.addEventListener("keyup", (event) => {
    Array.from(keyboard.children).forEach(el => {
        el.classList.remove("active")
    })
    if (!event.shiftKey && keyboard.children[16].textContent == 'Й' && !event.repeat) {
        sortKysFunc(syblKeysRus)
    }
    if (!event.shiftKey && keyboard.children[16].textContent == 'Q' && !event.repeat) {
        sortKysFunc(syblKeysEng)
    }
    event.preventDefault();
});









