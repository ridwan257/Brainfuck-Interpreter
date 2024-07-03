
const stdio = document.getElementById('stdio');

function append_to_console(text) {
    const new_line = document.createElement('div');
    new_line.textContent = text;
    stdio.appendChild(new_line);
}

function clear_console(command) {
    while (stdio.firstChild) {
        stdio.removeChild(stdio.firstChild);
    }
}

function create_new_holder(){
    const p = document.createElement('div');
    p.innerText = '';
    stdio.appendChild(p);
    return p;
}

function append_to_console_element(elem, text){
    elem.innerText += text;
}