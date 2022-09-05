import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';

import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';


@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IngresoEgresoRoutingModule
  ],
  exports: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
  ]
})
export class IngresoEgresoModule { }
