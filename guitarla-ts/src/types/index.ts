type Guitar = {
	id: number;
	name: string;
	image: string;
	description: string;
	price: number;
};
/* 
type CartItem = Guitar & {
    quantity: number;
} */
//Usando utility types para seleccionar los elementos que queremos y agregarlos al nuevo type
type CartItem = Pick<Guitar, 'id'|'name'| 'image'| 'description'|'price' > &{
    quantity: number;
}
//Omit evita los types que uno seleccione 
/* type CartItem = Omit<Guitar, 'id'|'name'| 'image' > &{
    quantity: number;
} */
type GuitarProps = {
	guitar: Guitar;
	addToCard: (item: Guitar) => void;
};


export type {Guitar, GuitarProps, CartItem} 