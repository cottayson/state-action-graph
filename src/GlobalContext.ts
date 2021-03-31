import * as p5 from "p5";
import { MyNode } from "./MyNode";
import * as States from "./State";
import {
  IBaseState, Vector2D, DigitOptions
} from "./State";
import { ChessBoardState, ChessBoardOptions } from './ChessBoardState';
import { p5lib } from './index'; // import p5lib singleton

export class GlobalContext {
  public objects: any[];
  constructor() {
    this.objects = [];
    this.init();
  }

  init() {
    this.objects = [];
    const state1 = new States.DigitState();
    const state2 = new States.DigitState({ value: -10 }); // not valid state
    this.addDigitStateNode({ x: 200, y: 400 }, { value: 3 });
    // const state4 = new States.TupleState({ x: 2, y: 4 });

    this.objects.push(new MyNode(state1, { x: 100, y: 200 }));
    this.objects.push(new MyNode(state2, { x: 100, y: 300 }));
    // this.objects.push(new MyNode(state3, { x: 200, y: 400 }));
    // this.objects.push(new MyNode(state4, { x: 200, y: 300 }));
    // this.addNode({x: 100, y: 200}, States.DigitState, 2);
    // this.addNode({x: 100, y: 300}, States.DigitState, 3);
    this.addNode({x: 200, y: 200}, States.TupleState, { x: 2, y: 4 });

    const chessBoard = this.addChessBoardStateNode(
      { x: 300, y: 200 },
      {
        width: 8,
        height: 8,
      },
    )
  }

  addChessBoardStateNode(pos: Vector2D, options: ChessBoardOptions) {
    const state = new ChessBoardState(options);
    this.objects.push(new MyNode(state, pos));
  }

  addDigitStateNode(pos: Vector2D, options: DigitOptions) {
    const state = new States.DigitState(options);
    this.objects.push(new MyNode(state, pos));
  }

  addNode(pos: { x: number, y: number }, stateClass: any, options: any) {
    let state = new stateClass(options);
    this.objects.push(new MyNode(state, p5lib.createVector(pos.x, pos.y)));
  }

  forAll(methodNameString: string) {
    for (let obj of this.objects) {
      if (methodNameString in obj) {
        // @ts-ignore
        obj[methodNameString]();
      } else {
        throw new Error(`${methodNameString} does not exist!`);
      }
    }
  }

  check() {
    this.objects.forEach(o => o.check());
  }

  show() {
    p5lib.background(200);
    this.objects.forEach(o => o.show());
  }
}