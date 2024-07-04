

const memory = allocate_memory("#memory-section table", 16, 2);

// selectText({ row: 0, column: 1 }, { row: 0, column: 2 });

let is_running = false;
const run_button = document.getElementById("run");
run_button.addEventListener('click', ()=>{
    if(!is_running){  
        is_running = true; 
        append_to_console('$ run');
        run(editor, memory)
        .then(data => {
            console.dir(data);
            append_to_console(data.ostream);
            is_running = false;
        })
        .catch( err => {
            console.log(err);
        })
        .finally(()=>{
            is_running = false;
        });
    }
    else{
        console.log("interpreter is busy! Please wait...");
    }
});

document.getElementById("reset").addEventListener('click', ()=>{
    console.log("relax babe!");
    append_to_console('$ clear')
    memory.reset();
    clear_console();
});



