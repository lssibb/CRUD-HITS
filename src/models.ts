export interface Element {
    describe():string;
}

export abstract class  Ingredient implements Element {
    constructor(public weightGrams: number) {
        
    }

    abstract describe(): string;
}

export abstract class Action implements Element {

    abstract describe(): string;
}

export class Water extends Ingredient {
    describe(): string {
        return `Вода - ${this.weightGrams}г`
    }
}

export class CoffeBean extends Ingredient {
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

export class Boil extends Action{
    describe(): string {
        return "Действие: Вскипятить";
    }
}

export class Grind extends Action{
    describe(): string {
        return "Действие: Перемолоть";
    }
}

export class Mix extends Action{
    describe(): string {
        return "Действие: Смешать";
    }
}

export class Pour extends Action{
    describe(): string {
        return "Действие: Налить";
    }
}

export class Whip extends Action{
    describe(): string {
        return "Действие: Взбить";
    }
}

export class Add extends Action {
  describe(): string {
    return "Действие: Добавить";
  }
}

export class Drink {
  constructor(
    public id: number,
    public name: string,
    public elements: Element[]
  ) {}
}
