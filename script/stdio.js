// ---------------- charecter finding ----------------
function find_prev(stringstream, index, ch='[]'){
    let sum = 0;
    for(let i = index; i>=0; i--){
        if(stringstream[i] == ch[0]){
            sum++;
        }
        else if(stringstream[i] == ch[1]){
            sum--;
        }
        
        if(sum == 0){
            return i;
        }
    }

    return -1;
}

function find_next(stringstream, index, ch = '[]'){
    let sum = 0;
    for(let i = index; i<stringstream.length; i++){
        if(stringstream[i] == ch[0]){
            sum++;
        }
        else if(stringstream[i] == ch[1]){
            sum--;
        }
        
        if(sum == 0){
            return i;
        }
    }

    return -1;
}


// ------------------ editor -------------------
const editor = ace.edit(document.querySelector('#code-editor'), {
    selectionStyle: "text"
});

function locate_position(text, index){
    const position = { row : 0, col : 0 }
    for(let i=0; i<text.length; i++){
        if( i == index ) return position;
        if(text[i] === '\n'){
            position.row += 1;
            position.col = 0;
            continue;
        }
        position.col += 1;
    }

    return { row : -1, col : -1 };
}

function select_text(element, positionStart, positionEnd) {
    // positionStart = [row, column]
    // 
    const Range = ace.require('ace/range').Range;
    const range = new Range(positionStart.row, positionStart.col, positionEnd.row, positionEnd.col);
    element.getSession().getSelection().setSelectionRange(range);
}

function select_char_from_index(element, index){
    const pre_position = locate_position(element.getValue(), index);
    const next_position = Object.assign({}, pre_position);
    next_position.col += 1;
    select_text(element, pre_position, next_position);
}







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
    elem.innerHTML += text;
}