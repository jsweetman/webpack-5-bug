import { BClass } from "data-domain";
const Annotate = (schema) => {
  return function (constructor) {};
};

@Annotate(undefined)
export class AClass {
  b: BClass;

  constructor(b: BClass) {
    this.b = b;
  }
}
