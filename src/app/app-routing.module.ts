import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { TemperaturaPage } from './pages/temperatura/temperatura.page';
import { DistanciaPage } from './pages/distancia/distancia.page';
import { PesoPage } from './pages/peso/peso.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage, // Página principal con botones
  },
  { path: 'home', component: HomePage },
  { path: 'distancia', component: DistanciaPage },
  { path: 'peso', component: PesoPage },
  { path: 'temperatura', component: TemperaturaPage }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
