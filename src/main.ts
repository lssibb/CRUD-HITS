import { Add, Boil, CoffeeBean, Drink, Grind, Ice, Milk, Mix, Pour, Syrup, Water, Whip, Action } from "./models";
import { Store } from "./store";
import './style.css';
import type { Element, Ingredient } from "./models";


const store = new Store();

const creationInput = document.getElementById("drink-name")!;
const btnCreateOrSave = document.getElementById("btn-create")!;
const btnCancel = document.getElementById("btn-cancel")!;
const elementSelection = document.getElementById("element-select")!;
const actionSelection = document.getElementById("action-select")!;
const btnAdd = document.getElementById("btn-add-element")!;
const weightInput = document.getElementById("weight-input")!;
const currentDrinkDescription = document.getElementById("current-drink")!;
let currentElements: Element[] = [];
let editingId: string | null = null;

function resetForm(){
  (creationInput as HTMLInputElement).value = "";
  currentElements.length = 0;
  editingId = null;
  btnCreateOrSave.textContent = "Создать";
  btnCancel.style.display = "none";
  renderСurrentElements();
}

btnCancel.addEventListener("click", () => {
  resetForm();
});

btnAdd.addEventListener("click", () => {

  let ingredient : Ingredient;
  const weight = Number((weightInput as HTMLInputElement).value);
  switch ((elementSelection as HTMLSelectElement).value){
    case "water": ingredient = new Water(weight);break;
    case "coffee": ingredient = new CoffeeBean(weight);break;
    case "milk": ingredient = new Milk(weight);break;
    case "syrup": ingredient = new Syrup(weight);break;
    case "ice": ingredient = new Ice(weight);break;
    default: return;
  }

  let action : Action;
   switch ((actionSelection as HTMLSelectElement).value){
    case "add": action = new Add(ingredient);break;
    case "boil": action = new Boil(ingredient);break;
    case "grind": action = new Grind(ingredient);break;
    case "mix": action = new Mix(ingredient);break;
    case "pour": action = new Pour(ingredient);break;
    case "whip": action = new Whip(ingredient);break;
    default: return;
  }

  currentElements.push(action);
  renderСurrentElements();
});


btnCreateOrSave.addEventListener("click", () => {
  const name = (creationInput as HTMLInputElement).value;
  if(editingId!==null){
    store.updateDrink(editingId, name, [...currentElements]);
  }
  else{
    const drink = new Drink(name, [...currentElements]);
    store.addDrink(drink);
  }
  resetForm();
  renderDrinks();
});





const drinksList = document.getElementById("drinks-list")!;


function renderDrinks(){
  drinksList.innerHTML = "";
  for(const drink of store.getAllDrinks()){
    const btnDeleteDrink = document.createElement('button');
    const btnEditDrink = document.createElement('button');
    const line = document.createElement('div');

    line.textContent = `${drink.name}: ${drink.elements.map(e => e.describe()).join(", ")}`;

    btnEditDrink.textContent='🖋';
    btnEditDrink.addEventListener("click", () => {
      (creationInput as HTMLInputElement).value = drink.name;
      currentElements = [...drink.elements];
      editingId = drink.id;
      btnCreateOrSave.textContent="Сохранить";
      btnCancel.style.display = "";
      renderСurrentElements();
      renderDrinks();
    })
    line.appendChild(btnEditDrink);

    btnDeleteDrink.textContent='❌';
    btnDeleteDrink.addEventListener("click", () => {
      store.deleteDrink(drink.id);
      renderDrinks();
    })
    line.appendChild(btnDeleteDrink);

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
