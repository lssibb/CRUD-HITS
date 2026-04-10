export interface Element {
    describe():string;
}

export abstract class  Ingredient implements Element {
    constructor(public weightGrams: number) {
        
    }

    abstract describe(): string;
}

export abstract class Action implements Element {
    abstract execute(): void;
    abstract describe(): string;
    abstract ingredient: Ingredient;
}

export class Water extends Ingredient {
    describe(): string {
        return `Вода - ${this.weightGrams}г`
    }
}

export class CoffeeBean extends Ingredient {
    describe(): string {
        return `Кофейное зерно - ${this.weightGrams}г`
    }
}

export class Ice extends Ingredient {
    describe(): string {
        return `Лед - ${this.weightGrams}г`
    }
}

export class Milk extends Ingredient {
    describe(): string {
        return `Молоко - ${this.weightGrams}г`
    }
}

export class Syrup extends Ingredient {
    describe(): string {
        return `Сироп - ${this.weightGrams}г`
    }
}

export class Boil extends Action {
    execute(): void {}
    describe(): string {
        return `Вскипятить ${this.ingredient.describe()} ${this.ingredient.weightGrams}г`;
    }
    ingredient: Ingredient;
    constructor(ingredient: Ingredient) {        super();
        this.ingredient = ingredient;
    }
}

export class Grind extends Action {
    execute(): void {}
    describe(): string {
        return `Перемолоть ${this.ingredient.describe()} ${this.ingredient.weightGrams}г`;
    }
    ingredient: Ingredient;
    constructor(ingredient: Ingredient  ) {        super();
        this.ingredient = ingredient;
    }
}

export class Mix extends Action {
    execute(): void {}
    describe(): string {
        return `Перемешать ${this.ingredient.describe()} ${this.ingredient.weightGrams}г`;
    }
    ingredient: Ingredient;
    constructor(ingredient: Ingredient  ) {        super();
        this.ingredient = ingredient;
    }
}

export class Pour extends Action {
    execute(): void {}
    describe(): string {
        return `Пролить ${this.ingredient.describe()} ${this.ingredient.weightGrams}г`;
    }  
    ingredient: Ingredient;
    constructor(ingredient: Ingredient  ) {        super();
        this.ingredient = ingredient;
    }
}

export class Whip extends Action {
    execute(): void {}
    describe(): string {
        return `Взбить ${this.ingredient.describe()} ${this.ingredient.weightGrams}г`;
    }
    ingredient: Ingredient; 
    constructor(ingredient: Ingredient  ) {        super();
        this.ingredient = ingredient;
    }
}

export class Add extends Action {
    execute(): void {}
    describe(): string {
        return `Добавить ${this.ingredient.describe()} ${this.ingredient.weightGrams}г`;
    }
    ingredient: Ingredient;
    constructor(ingredient: Ingredient) {        super();
        this.ingredient = ingredient;
    }   
}

export class Drink {
    public id: string;
  constructor(
    public name: string,
    public elements: Element[]
  ) {
    this.id=crypto.randomUUID();
  }
}
