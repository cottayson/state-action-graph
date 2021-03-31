import * as p5 from "p5";
import { MyNode } from "./MyNode";
import * as States from "./State";
import {
  IBaseState, Vector2D, DigitOptions
} from "./State";
import { ChessBoardState, ChessBoardOptions } from './ChessBoardState';
import { p5lib } from './index'; // import p5lib singleton
import { ImageLoader } from './ImageLoader';

const PIECES_PATH = 'assets/pieces.svg';
const BISHOP_PATH = 'assets/bB.svg';

function drawImages(g: GlobalContext) {
  g.context2d!.drawImage(g.bishopImage, 100, 0, 64, 64);
  g.context2d!.drawImage(g.bishopImageFromSVGElement, 200, 0, 64, 64);
  const figureSize = 45;
  const targetSize = 100;
  g.context2d!.drawImage(g.svgSpriteImage, 0, 0, figureSize, figureSize, 0, 0, targetSize, targetSize);
}

export class GlobalContext {
  public objects: any[];
  public canvas: HTMLCanvasElement | null;
  public context2d: CanvasRenderingContext2D | null;
  public bishopImageFromSVGElement?: any;
  public bishopImage?: any;
  public svgSpriteImage?: any;
  imageLoader: ImageLoader;
  constructor() {
    this.objects = [];
    this.imageLoader = new ImageLoader();
    this.canvas = document.getElementById("defaultCanvas0") as HTMLCanvasElement;
    this.context2d = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    if (this.canvas === null) {
      console.warn(this.canvas, 'is null');
    }
    if (this.context2d === null) {
      console.warn(this.context2d, 'is null');
    }
    const svg = document.querySelector('svg');
    if (svg === null) {
      console.warn("svg not found");
      return;
    }

    this.svgSpriteImage = this.imageLoader.addLoadImageTask(PIECES_PATH, () => {
      console.log("Sprite image loaded");
    });
    this.bishopImageFromSVGElement = this.imageLoader.loadImageFromSVG(svg, () => {
      console.log("Bishop image loaded from svg on page");
    });
    this.bishopImage = this.imageLoader.addLoadImageTask(BISHOP_PATH, () => {
      console.log("Bishop image loaded from file");
    });
    this.imageLoader.load(() => {
      console.log("GlobalContext: All images loaded");
      this.init();
      this.show();
    })
  }

  init() {
    this.objects = [];
    const state1 = new States.DigitState();
    const state2 = new States.DigitState({ value: -10 }); // not valid state
    this.addDigitStateNode({ x: 200, y: 400 }, { value: 3 });
    this.objects.push(new MyNode(state1, { x: 100, y: 200 }));
    this.objects.push(new MyNode(state2, { x: 100, y: 300 }));
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
    if (this.canvas === null) {
      console.warn('canvas not initialized!');
    }
    console.assert(p5lib.drawingContext === this.context2d);
    p5lib.background(200);
    drawImages(this);
    this.objects.forEach(o => o.show());
  }
}