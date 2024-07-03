// ------------------ editor -------------------
function select_text(element, positionStart, positionEnd) {
    // positionStart = [row, column]
    // 
    const Range = ace.require('ace/range').Range;
    const range = new Range(positionStart[0], positionStart[1], positionEnd[0], positionEnd[1]);
    element.getSession().getSelection().setSelectionRange(range);
}

const editor = ace.edit(document.querySelector('#code-editor'), {
    selectionStyle: "text"
});









// --------------- console --------------
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