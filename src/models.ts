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
    public elements: Element[] = [];
    public add(element: Element){
        this.elements.push(element);
    }
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
        return `Вскипятить ${this.elements.map(e => e.describe()).join(", ")}`;
    }
    constructor(firstElement?: Element) {
           super();
            if (firstElement) this.elements.push(firstElement);
        }
}

export class Grind extends Action {
    execute(): void {}
    describe(): string {
        return `Перемолоть ${this.elements.map(e => e.describe()).join(", ")}`;
    }
    constructor(firstElement?: Element) {
        super();
        if (firstElement) this.elements.push(firstElement);
    }
}

export class Mix extends Action {
    execute(): void {}
    describe(): string {
        return `Перемешать ${this.elements.map(e => e.describe()).join(", ")}`;
    }
    constructor(firstElement?: Element) {
        super();
        if (firstElement) this.elements.push(firstElement);
    }
}

export class Pour extends Action {
    execute(): void {}
    describe(): string {
        return `Пролить ${this.elements.map(e => e.describe()).join(", ")}`;
    }  
    constructor(firstElement?: Element) {
        super();
        if (firstElement) this.elements.push(firstElement);
    }
}

export class Whip extends Action {
    execute(): void {}
    describe(): string {
        return `Взбить ${this.elements.map(e => e.describe()).join(", ")}`;
    }
    constructor(firstElement?: Element) {
        super();
        if (firstElement) this.elements.push(firstElement);
    }
}

export class Add extends Action {
    execute(): void {}
    describe(): string {
        return `Добавить ${this.elements.map(e => e.describe()).join(", ")}`;
    }
    constructor(firstElement?: Element) {
        super();
        if (firstElement) this.elements.push(firstElement);
    }   
}

export class Drink {
    public id: string;
  constructor(
    public name: string,
    public elements: Action[]
  ) {
    this.id=crypto.randomUUID();
  }
}
