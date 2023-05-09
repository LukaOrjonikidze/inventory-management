class inventory {
    public id: number;
    public name: string;
    public location: string;
    public price: number;
    constructor(id: number, name: string, location: string, price: number) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.price = price;
    }
}
export default inventory;