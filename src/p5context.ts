import * as p5 from "p5";
import { GlobalContext } from "./GlobalContext";

export let globalContext: GlobalContext;

export let loadFunc = (p: p5) => {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.noLoop();
    globalContext = new GlobalContext();
    globalContext.loadImage();
  }

  p.draw = () => {
    
  }
}