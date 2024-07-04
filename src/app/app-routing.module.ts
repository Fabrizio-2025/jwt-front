import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ListCertificacionesComponent } from './components/list-certificaciones/list-certificaciones.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { GraficoComponent } from './views/grafico/grafico.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'certifications/user/:userId',
    component: ListCertificacionesComponent,
  },
  { path: 'grafico', component: GraficoComponent, canActivate: [AuthGuard] }, // Añadir esta línea para el nuevo componente
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
