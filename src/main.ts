import { Add, Boil, CoffeeBean, Drink, Grind, Ice, Milk, Mix, Pour, Syrup, Water, Whip, Action } from "./models";
import { Store } from "./store";
import './style.css';
import type { Ingredient } from "./models";

const store = new Store();

const creationInput = document.getElementById("drink-name")!;
const btnCreateOrSave = document.getElementById("btn-create")!;
const btnCancel = document.getElementById("btn-cancel")!;
const elementSelection = document.getElementById("element-select")!;
const actionSelection = document.getElementById("action-select")!;
const btnAdd = document.getElementById("btn-add-element")!;
const weightInput = document.getElementById("weight-input")!;
const currentDrinkDescription = document.getElementById("current-drink")!;

let currentElements: Action[] = [];
let editingId: string | null = null;
let activeAction: Action | null = null;

function resetForm(){
  (creationInput as HTMLInputElement).value = "";
  currentElements.length = 0;
  editingId = null;
  activeAction = null;
  btnCreateOrSave.textContent = "Создать";
  btnCancel.style.display = "none";
  renderCurrentElements();
}

btnCancel.addEventListener("click", () => {
  resetForm();
});

btnAdd.addEventListener("click", () => {
  const weight = Number((weightInput as HTMLInputElement).value);
  let ingredient : Ingredient;
  
  switch ((elementSelection as HTMLSelectElement).value){
    case "water": ingredient = new Water(weight);break;
    case "coffee": ingredient = new CoffeeBean(weight);break;
    case "milk": ingredient = new Milk(weight);break;
    case "syrup": ingredient = new Syrup(weight);break;
    case "ice": ingredient = new Ice(weight);break;
    default: return;
  }

  const actionType = (actionSelection as HTMLSelectElement).value;
  
  if (actionType === "none") {
    if (activeAction) {
      activeAction.add(ingredient);
      (weightInput as HTMLInputElement).value = "";
      renderCurrentElements();
    } else {
      alert("Сначала создайте или выберите действие (шаг рецепта), в которое нужно добавить ингредиент.");
    }
    return;
  }

  let action : Action;
  switch (actionType){
    case "add": action = new Add(ingredient);break;
    case "boil": action = new Boil(ingredient);break;
    case "grind": action = new Grind(ingredient);break;
    case "mix": action = new Mix(ingredient);break;
    case "pour": action = new Pour(ingredient);break;
    case "whip": action = new Whip(ingredient);break;
    default: return;
  }

  if (activeAction) {
    activeAction.add(action);
  } else {
    currentElements.push(action);
    activeAction = action;
  }

  (weightInput as HTMLInputElement).value = "";
  renderCurrentElements();
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

    line.textContent = `${drink.name}: ${drink.elements.map(e => e.describe()).join("; ")}`;

    btnEditDrink.textContent='✎';
    btnEditDrink.addEventListener("click", () => {
      (creationInput as HTMLInputElement).value = drink.name;
      currentElements = [...drink.elements];
      editingId = drink.id;
      activeAction = null;
      btnCreateOrSave.textContent="Сохранить";
      btnCancel.style.display = "";
      renderCurrentElements();
      renderDrinks();
    })
    line.appendChild(btnEditDrink);

    btnDeleteDrink.textContent='✕';
    btnDeleteDrink.addEventListener("click", () => {
      store.deleteDrink(drink.id);
      renderDrinks();
    })
    line.appendChild(btnDeleteDrink);

    drinksList.appendChild(line);
  }
}

function renderCurrentElements(){
  currentDrinkDescription.innerHTML = "";
  
  for(const action of currentElements){
    const container = document.createElement('div');
    container.style.padding = "5px";
    container.style.marginBottom = "5px";
    container.style.borderRadius = "4px";
    
    if (action === activeAction) {
        container.style.backgroundColor = "#e7f1ff";
        container.style.border = "1px solid #007bff";
    } else {
        container.style.border = "1px solid #ddd";
    }
    
    const line = document.createElement('span');
    line.textContent = action.describe();
    
    const btnSelect = document.createElement('button');
    btnSelect.textContent = action === activeAction ? '✓' : '+';
    btnSelect.style.marginLeft = "10px";
    btnSelect.addEventListener('click', () => {
      if (activeAction === action) {
        activeAction = null; 
      } else {
        activeAction = action;
      }
      renderCurrentElements();
    });

    const btnDeleteElement = document.createElement('button');
    btnDeleteElement.textContent='✕';
    btnDeleteElement.addEventListener("click", () => {
      if (activeAction === action) activeAction = null;
      currentElements = currentElements.filter(e => e != action);
      renderCurrentElements();
    })

    container.appendChild(line);
    container.appendChild(btnSelect);
    container.appendChild(btnDeleteElement);
    currentDrinkDescription.appendChild(container);
  }
}

renderDrinks();
renderCurrentElements();
