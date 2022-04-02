const inputEls = document.querySelectorAll("input");

document.getElementById("register").addEventListener("submit", (e) => {
    e.preventDefault();

    let form = e.currentTarget;

    let nullValue = 0;
    let currentNullInput;
    for(const input of document.querySelectorAll("form input")){
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