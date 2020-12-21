// import * as p5 from "p5";
// import { StateFactory } from "./StateFactory";
import { IBaseState, Vector2D } from "./State";

interface INode {
  [prop: string]: any;
}

export class MyNode<T extends IBaseState> implements INode {
  public childList: any[];
  constructor(public state: T, public pos: Vector2D) {
    this.state = state;
    this.childList = [];
  }

  check() {
    this.state.check();
  }

  show() {
    this.state.show(this.pos);
  }
}


// export class MyNode implements INode {
//   public state: any;
//   public childList: any[];
//   constructor(public pos: Vector2D, stateClassName: any, ...args: any[]) {
//     this.state = new StateFactory().create(stateClassName, ...args);
//     this.childList = [];
//   }

//   check() {
//     this.state.check();
//   }

//   show() {
//     this.state.show(this.pos);
//   }
// }