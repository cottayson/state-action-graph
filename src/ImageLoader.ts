/**
 * Usage:
 * ```ts
 * const t = new Task(
 *  () => loadImage(), // onStart
 *  () => initContext() // onComplete
 * );
 * ```
 */

class Task {
  completed: boolean;
  constructor(public onStart: () => void, public onComplete: () => void, public loader: ImageLoader) {
    this.completed = false;
  }

  start() {
    this.onStart();
    console.log("Task: onStart");
  }

  complete() {
    this.completed = true;
    this.onComplete();
    this.loader.checkCompleted();
  }
}

export class ImageLoader {
  public tasks: Task[];
  public total: number;
  onCompleteAll: () => void;
  constructor() {
    this.tasks = [];
    this.total = 0;
    this.onCompleteAll = () => { console.warn("loader.onCompleteAll not defined.") }
  }

  isAllCompleted() {
    const { unCompleted } = this.getNumberOfTasks();
    return unCompleted === 0;
  }

  getNumberOfTasks() {
    let completed = 0;
    let unCompleted = 0;
    for (let task of this.tasks) {
      if (task.completed) {
        completed++;
      } else {
        unCompleted++;
      }
    }
    return { completed, unCompleted };
  }

  load(onCompleteAll: () => void) {
    for (let task of this.tasks) {
      task.start();
    }
    this.onCompleteAll = onCompleteAll;
    console.log("Load begins..")
  }

  add(task: Task) {
    this.tasks.push(task);
  }

  checkCompleted() {
    if (this.isAllCompleted()) {
      this.onCompleteAll();
    }
  }

  addLoadImageTask(imageSource: string, onComplete: () => void) {
    let image = new Image();
    image.src = imageSource;
    const onStart = () => {
      image.onload = () => task.complete();
    };
    const task = new Task(onStart, onComplete, this);
    this.add(task);
    return image;
  }

  loadImageFromSVG(svgElement: SVGSVGElement, onComplete: () => void) {
    const xml = new XMLSerializer().serializeToString(svgElement); // get svg data
    const svg64 = btoa(xml); // make it base64
    const b64Start = 'data:image/svg+xml;base64,';
    var image64 = b64Start + svg64; // prepend a "header"
    return this.addLoadImageTask(image64, onComplete);
  }
}
