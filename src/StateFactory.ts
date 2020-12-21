export abstract class StateFactory {
  constructor() { }

  create(stateClassName: any, options = {}) {
    return new stateClassName(options);
  }
}



// export class StateFactory {
//   constructor() { }

//   create(stateClassName: any, options = {}) {
//     return new stateClassName(options);
//   }
// }
