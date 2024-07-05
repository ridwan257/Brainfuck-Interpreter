const memory = allocate_memory("#memory-section table", 8, 25);

let is_running = false;
let is_killed = false;
let __interpreter_state = default_opts();
let t1, t2;

const run_button = document.getElementById("run");

function change_run_button_style(mode){
    if(mode == 'run'){
        run_button.innerText = 'Run';
        run_button.classList.replace('btn-outline-info', 'btn-outline-success');
        run_button.classList.replace('btn-outline-warning', 'btn-outline-success');
        return;
    }
    if(mode == 'pause'){
        run_button.innerText = 'Pause';
        run_button.classList.replace('btn-outline-info', 'btn-outline-warning');
        run_button.classList.replace('btn-outline-success', 'btn-outline-warning');
        return;
    }
    if(mode == 'continue'){
        run_button.innerText = 'Resume';
        run_button.classList.replace('btn-outline-success', 'btn-outline-info');
        run_button.classList.replace('btn-outline-warning', 'btn-outline-info');
        return;
    }
}

change_run_button_style('run');

run_button.addEventListener('click', ()=>{
    if(!is_running){  
        is_running = true;
        append_to_console('$ run');
        change_run_button_style('pause');
        
        const ss = editor.getValue();

        t1 = new Date();
        interpreter(ss, memory, __interpreter_state)
        .then(data => {
            __interpreter_state = data;
            // console.dir(data);
            t2 = new Date();
            append_to_console(`${(t2-t1)/1000}s elapsed...`);
        })
        .catch( err => {
            console.log(err);
        })
        .finally(()=>{
            // ------------ after interpreter execution --------------
            
            is_running = false;
            reset_estatus();

            console.dir(__interpreter_state);
            console.log(`is_killed - ${is_killed}`)
            if(__interpreter_state.exit_status == 'success' || is_killed){
                change_run_button_style('run');
                __interpreter_state = default_opts();
                is_killed = false;
            }
            else{
                change_run_button_style('continue');
            }   
        });
    }
    else{
        console.log("interpreter is busy! Please wait...");
        force_stop();   
    }
});

document.getElementById("reset").addEventListener('click', ()=>{
    console.log("relax babe!");
    console.log("reseting memory...");
    console.log("clearing console...");
    append_to_console('$ clear')
    memory.reset();
    clear_console();
});

document.getElementById("stop").addEventListener('click', ()=>{
    console.log("okay babe!");
    force_stop();
    is_killed = true;
    if(!is_running){
        // process has been paused state
        reset_estatus();
        change_run_button_style('run');
        __interpreter_state = default_opts();
        is_killed = false;
    }
});

document.querySelector('#speed-controller select').addEventListener('change', (e)=>{
    const speed = Number(e.target.value);
    set_delay(speed);
    console.log(speed);
});


document.getElementById('clear-memory').addEventListener('click',()=>{
    memory.reset();
});