import { Drink } from "./models";
import { Store } from "./store";
import type { Element } from "./models";


const store = new Store();

const creationInput = document.getElementById("drink-name")!;
const btnCreate = document.getElementById("btn-create")!;
const currentElements: Element[] = [];
btnCreate.addEventListener("click", () => {
  const name = (creationInput as HTMLInputElement).value;
  const drink = new Drink(name, currentElements);
  store.addDrink(drink);
  currentElements.length = 0
  renderDrinks();
});





const drinksList = document.getElementById("drinks-list")!;


function renderDrinks(){
  drinksList.innerHTML = "";
  for(const drink of store.getAllDrinks()){
    const line = document.createElement('div');
    line.textContent = `${drink.name}: ${drink.elements.map(e => e.describe()).join(", ")}`;
    drinksList.appendChild(line);
  }
}


