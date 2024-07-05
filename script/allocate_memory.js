
class Memory{
    constructor(total_size){
        this.blocks = [];
        this.ncolor = 'rgba(0, 0, 0, 0.5)';
        this.hcolor = 'red';

        for(let i = 0; i < total_size; i++){
            const memory = document.createElement('td');
            memory.innerText=0;
            this.blocks.push(memory);
        }

        this.highlight(0, true);

    }

    get(index){
        return {
            value : Number(this.blocks[index].innerText),
            block : this.blocks[index]
        }
    }

    size(){
        return this.blocks.length;
    }

    at(index){
        return Number(this.blocks[index].innerText);
    }

    extend(value=0){
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
            e.style.backgroundColor = this.ncolor;
        });
        this.highlight(0, true);
    }

    push(item){
        this.blocks.push(item);
    }

    highlight(index, state){
        const bg_color = (state) ? this.hcolor : this.ncolor;
        this.blocks[index].style.backgroundColor = bg_color;
    }


}

function allocate_memory(query_specifier, block_size, total) {
    const memory_block = new Memory(block_size*total);

    const memory_section = document.querySelector(query_specifier);
    
    for(let i = 0; i < total; i++){
        const tr = document.createElement("tr");
        for(let j=0; j < block_size; j++){
            tr.appendChild(memory_block.get(i*block_size+j).block);
        }
        memory_section.appendChild(tr);
    }
    
    return memory_block;
}
