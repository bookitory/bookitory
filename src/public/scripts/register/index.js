const inputEls = document.querySelectorAll("input:not(:first-of-type)");
const statusCodeEl = document.querySelector("input[type='hidden']");

window.onload = () => {
    let statusCode = Number(statusCodeEl.value);

    if (statusCode === 0) return;

    switch (statusCode) {
        case 200:
            registerResponse("회원 가입 성공!", "/");
            break;

        case 23000:
            registerResponse("중복된 ID가 있습니다.", "/register");
            break;

        default:
            registerResponse("Something Broken", "/register");
            break;
    }
}

function registerResponse(msg, location) {
    alert(msg);
    window.location.href = location;
}

document.getElementById("register").addEventListener("submit", (e) => {
    e.preventDefault();

    let form = e.currentTarget;
    let nullValue = 0;
    let currentNullInput;

    for(const input of inputEls){
        if(!input.value){
            nullValue++;
            currentNullInput = input;
            break;
        }
    }

    if (nullValue !== 0) {
        currentNullInput.focus();
    } else {
        form.submit();
    }
});