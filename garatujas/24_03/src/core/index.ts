class Item {
    constructor(
        public title: string
    ){}
}

class list {
    private items: Item[] = [];

    constructor( private filename: string){
        this.load()
    }

    add(item: Item): void {
        this.items.push(item);
        this.save()
    }

    remove(item: Item): void {
        const index = this.items.indexOf(item)
        if (index !== -1){
            this.items.splice(index,1)
        }
        this.save()
    }
    
    save(): void{
        const file = Bun.file(this.filename)
        const content = JSON.stringify(this.items)
        Bun.write(file,content)
    }

    getItems(): Item [] {
        return this.items
    }

    private async load(){
        try{
            const file = Bun.file(this.filename)
            const content = await file.json()
            console.warn("NÃO SE ESQUECA DE POPULAR A LIST NO CONSTRUCT")
        }catch (error) {
            Bun.write(this.filename, JSON.stringify([]))
        }
    }
}

const mercado = new list('mercado.json')

mercado.add(new Item("Comprar Energetico"))

mercado
    .add("comprar droga")
    .add("comprar mais coisas")

console.log(mercado.getItems())
