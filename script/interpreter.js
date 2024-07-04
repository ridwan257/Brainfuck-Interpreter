let __interpreter_interval_time = 0;
let __interpreter_execution_status = true;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function default_opts(){
    __interpreter_execution_status = true;
    return {
        current : 0,
        memory_index : 0,
        istream : '',
        ostream : '',
        end : null
    }
}

function force_stop(){
    __interpreter_execution_status = false;
    // console.log('force stop is called');
}

function set_delay(time_ms){
    __interpreter_interval_time = time_ms;
}

function grab_input(message=null) {
    return new Promise((resolve) => {

        const input_field = document.createElement('input');
        input_field.type = 'text';
        if(message) input_field.value = message;
        stdio.appendChild(input_field);
        input_field.focus();

        input_field.onkeydown = e => {
            if( e.key == 'Enter'){
                input_field.readOnly = true;
                resolve(input_field.value);
            }
        };

        document.getElementById('stop').onclick = () => {
            input_field.readOnly = true;
            force_stop();
            resolve(input_field.value);
            // console.log('inside input');
        };

        
    });
}

async function interpreter(stringstream, memory, opt){
    let current=opt.current;
    let index=opt.memory_index;
    let istream=opt.istream;
    let ostream=opt.ostream;
    let ouptput_holder = false;
    let ouptput_elem = null;
    let exit_status = 'success';
    const end = opt.end;

    while(true){
        if(__interpreter_interval_time){
            select_char_from_index(editor, current);
            editor.blur();
            await sleep(__interpreter_interval_time);
        }
        
        memory.highlight(index, true);
        ch = stringstream[current];
        
        if(!__interpreter_execution_status){
            exit_status = 'forced_stop';
            break;
        }
        else if(ch == null || (end && current > end))
        {
            break;
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
            memory.highlight(index, false);
            index++;
        }
        else if(ch == '<')
        {   
            memory.highlight(index, false);
            index--;
        }
        else if(ch == '[' && memory.at(index) == 0)
        {
            current = find_next(stringstream, current);
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
            // console.log(char);
        }
        else if(ch == ','){
            if(istream.length == 0){
                select_char_from_index(editor, current);
                istream = await grab_input();
            }
            ouptput_holder = false;

            const value = istream.charCodeAt(0);
            istream = istream.substring(1);
            memory.update(index, value);
        }
        else if(ch == '*'){
            select_char_from_index(editor, current);
            editor.blur();
            // exit_status = 'hault';
            const position = locate_position(stringstream, current);
            await grab_input(`idx:${current} | row:${position.row} col:${position.col}`);
        }
        
        
        current++;
    }

    return {
        ostream : ostream,
        istream : istream,
        current : current,
        memory_index : index,
        exit_status : exit_status
    };

}


function run(elem, mem) {
    return new Promise((res, err) => {
        try {
            console.log("hi babe!");
            const ss = elem.getValue();
            interpreter(ss, mem, default_opts())
            .then(report => {
                res(report); 
            })
            .catch(error => err(error));     
        } catch (error) {
            err(error);
        }
    });
}