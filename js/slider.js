var len;
var i;
var currPosition;
var widthElem;
window.onload = function () {
    len = document.getElementsByClassName('item').length;
    widthElem = document.getElementsByClassName('item')[0].clientWidth;
    currPosition = (-1) * widthElem;
    let lostItem = document.getElementsByClassName('item')[0].cloneNode(true);
    let firstItem = document.getElementsByClassName('item')[len - 1].cloneNode(true);
    document.getElementById('items').appendChild(lostItem);
    document.getElementById('items').insertBefore(firstItem, document.getElementsByClassName('item')[0]);
    let ul = document.createElement("ul");
    ul.setAttribute("class", "pagination");
    for (j = 0; j < len; j++) {
        let li = document.createElement("li");
        li.style.width = 100 / len + "px";
        li.addEventListener("click", (element) => {
            showSelectSlide(Number(element.target.attributes.getNamedItem("id").value));
        });
        li.setAttribute("id", ((j + 1) * widthElem * -1));
        li.setAttribute("class", "check");
        ul.appendChild(li);
    }
    document.getElementsByClassName('slider')[0].appendChild(ul);
    moveItem(currPosition);
    document.querySelector("#back").addEventListener("click", (element) => {
        cklick(Number(element.target.attributes.getNamedItem("speed").value));
    });
    document.querySelector("#forvard").addEventListener("click", (element) => {
        cklick(Number(element.target.attributes.getNamedItem("speed").value));
    });
};

async function cklick(vector) {
    if (await move(vector, 1)) {
        enableButton();
    }
}

async function showSelectSlide(position) {
    disableButton();
    let vStep = (currPosition - position) / widthElem;
    if (vStep > 0) {
        await move(-10, vStep)
    }
    if (vStep < 0) {
        await move(10, vStep * -1)
    }
    enableButton();
}

function disableButton() {
    document.getElementById('forvard').setAttribute('disabled', '');
    document.getElementById('back').setAttribute('disabled', '');
    Array.prototype.forEach.call(document.getElementsByClassName("check"), function (el) {
        el.classList.add("stop");
    });
}

function enableButton() {
    document.getElementById('forvard').removeAttribute('disabled');
    document.getElementById('back').removeAttribute('disabled');
    Array.prototype.forEach.call(document.getElementsByClassName("check"), function (el) {
        el.classList.remove("stop");
    });
}

const moveItem = (transform) => {
    document.getElementById('items').style.cssText = "transform:translate3d(" + transform + "px, 0px, 0px)";
    Array.prototype.forEach.call(document.getElementsByClassName("check"), function (el) {
        if (el.id == transform) {
            el.innerHTML = "&#8226";
            el.style.opacity = "1";
        } else {
            el.innerHTML = "&#8226";
            el.style.opacity = "0.4";
        }
    });
}

async function move(directing, step) {
    return await new Promise(resolve => {
        disableButton();
        i = 0;
        const intervalId = setInterval(() => {
            i++;
            currPosition = currPosition + directing;
            if (i === Math.floor(widthElem / ((directing > 0) ? directing : directing * -1)) * step) {
                if (currPosition > widthElem * (-1)) {
                    currPosition = -1 * (len) * widthElem;
                    moveItem(currPosition);
                    resolve(true);
                    clearInterval(intervalId);
                }
                if (currPosition < (-1 * (len) * widthElem)) {
                    currPosition = (-1) * widthElem;
                    moveItem(currPosition);
                    resolve(true);
                    clearInterval(intervalId);
                }
                resolve(true);
                clearInterval(intervalId);
            }
            moveItem(currPosition);
        }, 10);
    })
}