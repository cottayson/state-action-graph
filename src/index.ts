import "./styles.css";
import { loadFunc, globalContext } from "./p5context";
import * as p5 from "p5";

interface p5Extended extends p5 {
  drawingContext: CanvasRenderingContext2D;
};
// p5lib.drawingContext === globalContext.context2d
export const p5lib = new p5(loadFunc) as p5Extended;
