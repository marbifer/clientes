import { PipeTransform, Pipe } from "@angular/core";
import { IClientes } from "./product";

@Pipe({
  name: "productFilter"
})
export class ProductFilterPipe implements PipeTransform {
  transform(value: IClientes[], filterBy: string) {}
}
