
class Memory{
    constructor(total_size){
        this.blocks = [];
    }

    get(index){
        return {
            value : Number(this.blocks[index].innerText),
            block : this.blocks[index]
        }
    }

    at(index){
        return Number(this.blocks[index].innerText);
    }

    set(value=0){
        const td = document.createElement('td');
        td.innerText = value;
        this.blocks.push(td);
        return td;
    }

    update(index, value){
        this.blocks[index].innerText = value;
    }

    reset(){
        this.blocks.forEach(e => {
            e.innerText = 0;
            e.style.backgroundColor = 'bisque';
        });
    }

    push(item){
        this.blocks.push(item);
    }

    highlight(index, state){
        const bg_color = (state) ? 'yellow' : 'bisque';
        this.blocks[index].style.backgroundColor = bg_color;
    }


}

function allocate_memory(query_specifier, block_size, total) {
    const memory_block = new Memory(block_size*total);

    const memory_section = document.querySelector(query_specifier);
    
    for(let i = 0; i < total; i++){
        const tr = document.createElement("tr");
        for(let j=0; j < block_size; j++){
            const memory = memory_block.set(0);
            tr.appendChild(memory);
        }
        memory_section.appendChild(tr);
    }
    
    return memory_block;
}
