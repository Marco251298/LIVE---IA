import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarPorCantidadBusquedas'
})
export class OrdenarPorCantidadBusquedasPipe implements PipeTransform {

  transform(args: any): any {
    args.sort((a: any, b: any) => {
      console.log(a.cantbusquedas)
      if (a.cantbusquedas < b.cantbusquedas) {
        return -1;
      } else if (a.cantbusquedas > b.cantbusquedas) {
        return 1;
      } else {
        return 0;
      }
    });
    return args;
  }

}
