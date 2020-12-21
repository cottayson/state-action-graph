import * as p5 from "p5"; // import only types
import { p5lib } from './index'; // import p5lib singleton

export interface IBaseState {
  check: () => boolean;
  show: (pos: Vector2D) => void;
}

export interface Vector2D {
  x: number;
  y: number;
}

type Action = any;

export abstract class BaseState implements IBaseState {
  actions: Action[];
  constructor() {
    this.actions = [];
  }

  abstract check(): boolean;

  show(pos: Vector2D) {
    p5lib.push();
    p5lib.translate(pos.x, pos.y);
    this.showTranslated();
    p5lib.pop();
  }

  //abstract showTranslated: void;
  showTranslated() { };
}

export class PolyminoState extends BaseState {
  data: number[];
  constructor(public width: number, public height: number) {
    super();
    this.data = new Array(width * height);
  }

  getBoundingBox() {
    return [-10, -15, 20, 20];
  }
  
  check(): boolean {
    return true;
  }
  
  showTranslated() {
    // super.showTranslated();
    const r = this.getBoundingBox();
    p5lib.rect(r[0], r[1], r[2], r[3]);
    p5lib.textAlign(p5lib.CENTER);
    p5lib.text("Polyminp",  0, -20);
  }
}

export interface DigitOptions {
  value?: number;
}

export class DigitState extends BaseState {
  digit: number;
  constructor(options: DigitOptions = {}) {
    super();
    this.digit = options.value === undefined ? 0 : options.value;
  }
  
  check() {
    return this.digit >= 0 && this.digit <= 9;
  }
  
  showTranslated() {
    super.showTranslated();
    p5lib.rect(-10, -15, 20, 20);
    p5lib.textAlign(p5lib.CENTER);
    p5lib.text(this.digit, 0, 0);
    p5lib.text("Digit",  0, -20);
  }
}

export class TupleState extends BaseState {
  constructor(public tuple: {x: number, y: number}) {
    super();
  }
  
  check() {
    return true; // always valid
  }
  
  showTranslated() {
    super.showTranslated();
    p5lib.rect(-20, -15, 40, 20);
    p5lib.push();
    p5lib.stroke(0, 255, 255);
    p5lib.line(0, -15, 0, 5);
    p5lib.pop();
    p5lib.textAlign(p5lib.CENTER);
    p5lib.text(this.tuple.x, -10, 0);
    p5lib.text(this.tuple.y,  10, 0);
    p5lib.text("Tuple",  0, -20);
  }
}
