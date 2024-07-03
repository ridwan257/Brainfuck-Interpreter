

const memory = allocate_memory("#memory-section table", 16, 2);

const editor = ace.edit(document.querySelector('#code-editor'), {
    selectionStyle: "text"
});



// selectText({ row: 0, column: 1 }, { row: 0, column: 2 });

document.getElementById("run").addEventListener('click', ()=>{
    append_to_console('$ run')
    run(editor, memory)
    .then(data => {
        append_to_console(data);
    })
    .catch( err => {
        console.log(err);
    })
});

document.getElementById("reset").addEventListener('click', ()=>{
    console.log("relax babe!");
    append_to_console('$ clear')
    memory.reset();
    clear_console();
});



