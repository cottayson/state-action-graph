import "./styles.css";
import { GlobalContext } from "./GlobalContext";
import { loadFunc } from "./p5context";
import * as p5 from "p5";

export const p5lib = new p5(loadFunc);


