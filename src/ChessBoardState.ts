import * as p5 from "p5"; // import only types
import { p5lib } from './index'; // import p5lib singleton
import { BaseState } from './State';
import { defaultParam } from './utils';
import { globalContext } from "./p5context";

declare type drawingContext = any;

export interface ChessBoardOptions {
  width?: number,
  height?: number,
}

export class ChessBoardState extends BaseState {
  width: number;
  height: number;
  cellSize: number;
  constructor(options: ChessBoardOptions) {
    super();
    // both ways must work
    this.width = defaultParam(options.width, 1);
    this.height = options.height === undefined ? 1 : options.height;
    this.cellSize = 20;
  }
  
  check() {
    return true; // always valid
  }
  
  showTranslated() {
    super.showTranslated();
    p5lib.push();
    const cs = this.cellSize;
    p5lib.textAlign(p5lib.CENTER);
    p5lib.stroke(100);
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        if ((i + j) % 2 === 1) {
          p5lib.fill([100, 100, 0]);
        } else {
          p5lib.fill([255, 255, 100]);
        }
        
        p5lib.rect(i * cs, j * cs, cs, cs);
      }
    }
    p5lib.pop();
  }
}
