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
        if ((i + j) % 2 === 0) {
          p5lib.fill([100, 100, 0]);
        } else {
          p5lib.fill([255, 255, 100]);
        }
        
        p5lib.rect(i * cs, j * cs, cs, cs);
      }
    }
    p5lib.pop();

    // let c = globalContext.context2d;
    let c = p5lib.drawingContext;
    if (c === null) {
      console.warn("globalContext.context2d is null");
      return;
    }
    c.drawImage(globalContext.img, 0, 0, cs, cs);

    

    // let path = new Path2D('M 100,100 h 50 v 50 h 50');
    // let s = "M 732.3355,1289.835 627.8342,993.05919 1014,576.30865 l 420.6826,374.83597 -132.1147,379.61628 49.674,151.806 -658.07476,-8.7101 z";
    // let path = new Path2D(s);
    // c.stroke(path);


    // p5lib.push();
    // p5lib.stroke(0, 255, 255);
    // p5lib.line(0, -15, 0, 5);
    // p5lib.pop();
  }
}
