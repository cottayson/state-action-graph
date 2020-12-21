import * as p5 from "p5";
import { GlobalContext } from "./GlobalContext";

let global: GlobalContext;

export let loadFunc = (p: p5) => {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.noLoop();
    global = new GlobalContext();
  }

  p.draw = () => {
    global.show();
  }
}