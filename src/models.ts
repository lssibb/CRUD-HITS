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
        return "Действие: Вскипятить";
    }
}

export class Grind extends Action {
    execute(): void {}
    describe(): string {
        return "Действие: Перемолоть";
    }
}

export class Mix extends Action {
    execute(): void {}
    describe(): string {
        return "Действие: Перемешать";
    }
}

export class Pour extends Action {
    execute(): void {}
    describe(): string {
        return "Действие: Пролить";
    }
}

export class Whip extends Action {
    execute(): void {}
    describe(): string {
        return "Действие: Взбить";
    }
}

export class Add extends Action {
    execute(): void {}
    describe(): string {
        return "Действие: Добавить";
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
