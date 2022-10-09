import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';

const routes: Routes = [
  {
    path: 'pages/admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'pages/seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
  }
]


@NgModule({
  declarations: [
  ],
  imports: [
    AdminModule,
    SellerModule,
    RouterModule.forChild(routes),
  ],

  providers: []
})
export class SecureModule {}
