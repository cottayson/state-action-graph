// https://refactoring.guru/design-patterns/factory-method/typescript/example

abstract class Creator {

  public abstract factoryMethod(): Product;// <=> create

  public someOperation(): string {
    const product = this.factoryMethod();
    // use  the product
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}
// === CREATORS ==========================================
class Creator1 extends Creator {
  public factoryMethod(): Product {
    return new Product1();
  }
}

class Creator2 extends Creator {
  public factoryMethod(): Product {
    return new Product2();
  }
}
// =======================================================

// === PRODUCTS ==========================================
interface Product {
  operation(): string;
}

class Product1 implements Product {
  constructor() {}

  operation() {
    return 'RESULT OF PRODUCT 1';
  }
}

class Product2 implements Product {
  constructor() {}

  operation() {
    return 'RESULT OF PRODUCT 2';
  }
}

function clientCode(creator: Creator) {
  console.log(`CLient: I'm not aware of the creators class, but it still works`);
}

console.log('App: Launched with the ConcreteCreator1.');
clientCode(new Creator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new Creator2());
