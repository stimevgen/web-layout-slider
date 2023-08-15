window.addEventListener('scroll', function (e) {
    let menu = document.getElementsByClassName("menu");
    if (menu[0].getBoundingClientRect().y < 0) {
        document.getElementsByTagName("header")[0].classList.add("header-focus");
    }
    if (menu[0].getBoundingClientRect().y >= 0) {
        document.getElementsByTagName("header")[0].classList.remove("header-focus");
    }
});

window.onload = function () {
    Array.prototype.forEach.call(document.getElementsByClassName("contact"), (element) => {
        element.addEventListener("click", (e) => {
            contact(e);
        });
    });
    document.getElementById("accept").addEventListener("click", () => {
        document.getElementsByClassName("cookie").item(0).remove();
    });
    document.getElementById("decline").addEventListener("click", () => {
        document.getElementsByClassName("cookie").item(0).remove();
    });
}

function contact() {
    let div = document.createElement("div");
    const close = document.createElement("button");
    close.classList.add("close");
    close.innerText = "x";
    close.addEventListener("click", () => {
        div.remove();
    })
    div.setAttribute("class", "form-contact");
    let section = document.createElement("section");
    section.id = "form";
    let form = document.createElement("form");
    form.style.cssText = "color:#181818;";
    let name = createElementForm("name", "Name", "text", true);
    let email = createElementForm("email", "Email", "email", true);
    let phone = createElementForm("phone", "Phone number", "number", true);
    let company = createElementForm("company", "Company", "text");
    let site = createElementForm("site", "Website/Store URL", "url");
    let button = document.createElement("button");
    let p = document.createElement("p");
    p.innerHTML = "By submitting this form you are agreeing to Budss's <a>Privacy Policy</a> and <a>Terms of Use</a>";
    p.style.cssText = "margin-top: 20px; margin-bottom: 20px; color: black;font-size: 14px;";
    button.innerText = "Contact sales";
    button.addEventListener("click", (e) => {
        e.preventDefault();
        let valid = false;
        const requiredInputs = document.querySelectorAll('input[required]');
        requiredInputs.forEach(i => {
            valid = validate(i);
        });
        if (valid) {
            form.remove();
            section.appendChild(supper(div));
        }
    });

    form.appendChild(name);
    form.appendChild(email);
    form.appendChild(phone);
    form.appendChild(company);
    form.appendChild(site);
    form.appendChild(p);
    form.appendChild(button);
    section.appendChild(close);
    section.appendChild(form)
    div.appendChild(section);
    document.body.appendChild(div);
}

function supper(root) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let pictures = document.createElement("picture");
    pictures.innerHTML = "<img src='./img/modal-image.webp' alt='modal-image' style='width: 297px;'>";
    p.innerText = "Thank you!";
    p.style.cssText = "color: #954CED; font-size: 36px; font-weight: 600; margin-top: 40px; margin-bottom: 20px; text-align: center;";
    let h2 = document.createElement("h2");
    h2.innerText = "Thank you, we have received your application and will contact you soon!";
    h2.style.cssText = "color: black; font-size: 24px; font-weight: 400; margin-bottom: 40px; text-align: center; line-height: 120%;";
    let button = document.createElement("button");
    button.style.cssText = "width:100%";
    button.innerText = "Supper!";
    button.addEventListener("click", () => {
        root.remove();
    })
    div.appendChild(pictures);
    div.appendChild(p);
    div.appendChild(h2);
    div.appendChild(button);
    return div;
}

function createElementForm(name, labeName, type, valid = false) {
    let block = document.createElement("label");
    let picture = document.createElement("picture");
    picture.style.cssText = "margin-top: 5px; margin-right:5px;";
    picture.innerHTML = "<img src='./img/RU.png' alt='RU'>";
    let p = document.createElement("p");
    p.id = name + "-req";
    p.style.cssText = "color:red;font-size: 12px; display:none";
    p.innerText = "This field is required."
    block.setAttribute("class", name);
    let label = document.createElement("div");
    label.innerText = labeName;
    block.appendChild(label);
    let input = document.createElement("input");
    input.placeholder = "Enter " + labeName;
    input.type = type;
    input.name = name;
    if (valid) {
        let span = document.createElement("span");
        span.innerText = "*";
        label.append(span);
        input.required = true;
        input.addEventListener("blur", (element) => {
            element.target.classList.add("req");
            validate(element.target);
        })
    }
    let div = document.createElement("div");
    div.id = "input";
    if (name === "phone") {
        div.append(picture);
    }
    div.append(input);
    block.appendChild(div);
    if (valid) {
        block.appendChild(p);
    }
    return block;
}

function validate(element) {
    let reg = RegExp("");
    document.getElementById(element.name + "-req").style.removeProperty("display");
    document.getElementById("input").style.borderColor = "red";
    if (element.value.trim().length === 0) {
        return false;
    }
    if (element.type === "email") {
        reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    }
    if (element.type === "number") {
        reg = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    }
    if (!reg.test(element.value)) {
        element.style.borderColor = "red";
        return false;
    }
    document.getElementById("input").style.borderColor = "#e4e5e7";
    document.getElementById(element.name + "-req").style.setProperty("display", "none");
    return true;
}