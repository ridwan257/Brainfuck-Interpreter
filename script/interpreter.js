function selectText(element, positionStart, positionEnd) {
    const Range = ace.require('ace/range').Range;
    const range = new Range(positionStart.row, positionStart.column, positionEnd.row, positionEnd.column);
    element.getSession().getSelection().setSelectionRange(range);
}

function find_prev(stringstream, index){
    let sum = 0;
    for(let i = index; i>=0; i--){
        if(stringstream[i] == ']'){
            sum++;
        }
        else if(stringstream[i] == '['){
            sum--;
        }
        
        if(sum == 0){
            return i;
        }
    }

    return -1;
}

function grab_input(message) {
    return new Promise((resolve) => {

        const input_field = document.createElement('input');
        input_field.type = 'text';
        stdio.appendChild(input_field);
        input_field.focus();

        input_field.onkeydown = e => {
            if( e.key == 'Enter'){
                input_field.readOnly = true;
                resolve(input_field.value);
            }
        };

        
    });
}

async function interpreter(stringstream, memory, current=0, index=0, end=null){

    let ostream = '';
    let ouptput_holder = false;
    let ouptput_elem = null;
    let istream = '';
    while(true){
        ch = stringstream[current];
        
        if(ch == null || (end && current > end))
        {
            return ostream;
        }
        else if(ch == '+')
        {
            const value = memory.at(index);
            memory.update(index, value+1);
        }
        else if(ch == '-')
        {
            const value = memory.at(index);
            memory.update(index, value-1);
        }
        else if(ch == '>')
        {
            index++;
        }
        else if(ch == '<')
        {
            index--;
        }
        else if(ch == '[')
        {
            
        }
        else if(ch == ']' && memory.at(index) != 0)
        {   
            current = find_prev(stringstream, current);
            continue; 
        }
        else if(ch == '.'){
            const char = String.fromCharCode(memory.at(index));
            ostream += char;
            if(!ouptput_holder){
                ouptput_elem = create_new_holder();
                ouptput_holder = true;
            }
            append_to_console_element(ouptput_elem, char);
        }
        else if(ch == ','){
            if(istream.length == 0){
                istream = await grab_input('Input');
            }
            ouptput_holder = false;

            const value = istream.charCodeAt(0);
            istream = istream.substring(1);
            memory.update(index, value);
        }
        
        
        current++;
    }

}


function run(elem, mem) {
    return new Promise((res, err) => {
        try {
            console.log("hi babe!");
            const ss = elem.getValue();
            const output_stream = interpreter(ss, mem);
            res(output_stream);
        } catch (error) {
            err(error);
        }
    });
}