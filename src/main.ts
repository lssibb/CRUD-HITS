import { Add, Boil, CoffeBean, Drink, Grind, Ice, Milk, Mix, Pour, Syrup, Water, Whip } from "./models";
import { Store } from "./store";
import type { Element } from "./models";


const store = new Store();

const creationInput = document.getElementById("drink-name")!;
const btnCreate = document.getElementById("btn-create")!;
const elementSelection = document.getElementById("element-select")!;
const btnAdd = document.getElementById("btn-add-element")!;
const weightInput = document.getElementById("weight-input")!;
const currentDrinkDescription = document.getElementById("current-drink")!;
let currentElements: Element[] = [];

btnAdd.addEventListener("click", () => {
  let element : Element;
  const weight = Number((weightInput as HTMLInputElement).value);
  switch ((elementSelection as HTMLSelectElement).value){
    case "water": element = new Water(weight);break;
    case "coffee": element = new CoffeBean(weight);break;
    case "milk": element = new Milk(weight);break;
    case "syrup": element = new Syrup(weight);break;
    case "ice": element = new Ice(weight);break;
    case "add": element = new Add();break;
    case "boil": element = new Boil();break;
    case "grind": element = new Grind();break;
    case "mix": element = new Mix();break;
    case "pour": element = new Pour();break;
    case "whip": element = new Whip();break;
  }
  
  
  currentElements.push(element!);
  renderСurrentElements();
});


btnCreate.addEventListener("click", () => {
  const name = (creationInput as HTMLInputElement).value;
  const drink = new Drink(name, [...currentElements]);
  store.addDrink(drink);
  currentElements.length = 0;
  renderСurrentElements();
  renderDrinks();
});





const drinksList = document.getElementById("drinks-list")!;


function renderDrinks(){
  drinksList.innerHTML = "";
  for(const drink of store.getAllDrinks()){
    const btnDeleteElement = document.createElement('button');
    const line = document.createElement('div');
    line.textContent = `${drink.name}: ${drink.elements.map(e => e.describe()).join(", ")}`;
    btnDeleteElement.textContent='❌';
    btnDeleteElement.addEventListener("click", () => {
      store.deleteDrink(drink.id);
      renderDrinks();
    })
    line.appendChild(btnDeleteElement);
    drinksList.appendChild(line);
  }
}

function renderСurrentElements(){
  currentDrinkDescription.innerHTML = "";
  
  for(const element of currentElements){
    const btnDeleteElement = document.createElement('button');
    const line = document.createElement('div');
    btnDeleteElement.textContent='❌';
    btnDeleteElement.addEventListener("click", () => {
      currentElements=currentElements.filter(e=>e!=element);
      renderСurrentElements();
    })
    line.textContent=element.describe();
    line.appendChild(btnDeleteElement);
    currentDrinkDescription.appendChild(line);
    
  }

  
}
