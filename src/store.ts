import { Drink } from "./models"
import type { Element } from "./models"


export class Store {
    private drinks: Drink[]=[];

    addDrink(drink:Drink){
        this.drinks.push(drink);
    }

    getDrink(id:string){
        return this.drinks.find(d => d.id === id);
    }

    updateDrink(id:string, name?: string, elements?: Element[]){

        const drink = this.drinks.find(d => d.id === id);
        if (!drink) return;
        if(name){
            drink.name =name;
        }

        if(elements){
            drink.elements=elements;
        }
    }

    deleteDrink(id:string){
        this.drinks=this.drinks.filter(d=>d.id !== id);
    }

    getAllDrinks(){
        return this.drinks;
    }
}