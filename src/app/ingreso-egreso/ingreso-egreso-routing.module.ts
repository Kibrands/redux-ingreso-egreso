import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ingreso-egreso',
        component: IngresoEgresoComponent
      },
      {
        path: 'detalle',
        component: DetalleComponent
      },
      {
        path: 'estadistica',
        component: EstadisticaComponent
      },
      {
        path: '**',
        redirectTo: 'estadistica'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoEgresoRoutingModule { }
