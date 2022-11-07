import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@core/guards/auth.guards';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardService } from '@core/services/admin-services/dashboard.service';
import { UsersListComponent } from './users-list/users-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NouisliderModule } from 'ng2-nouislider';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { EcommerceDetailsComponent } from './products/ecommerce-details/ecommerce-details.component';
import { EcommerceSidebarComponent } from './products/ecommerce-shop/sidebar/sidebar.component';
import { EcommerceItemComponent } from './products/ecommerce-item/ecommerce-item.component';
import { EcommerceShopComponent } from './products/ecommerce-shop/ecommerce-shop.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PendingApprovalComponent } from './pending-approval/pending-approval.component';
import { OrdersComponent } from './orders/orders.component';
import { FeedbackSupportComponent } from './feedback-support/feedback-support.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewUserSidebarComponent } from './user-details/new-user-sidebar/new-user-sidebar.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
import { PromotionsDetailComponent } from './promotions/promotions-detail/promotions-detail.component';
import { PromotionItemComponent } from './promotions/promotion-item/promotion-item.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/product-list/add-product/add-product.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditProductComponent } from './products/product-list/edit-product/edit-product.component';
import { AddNewProductComponent } from './products/product-list/add-new-product/add-new-product.component';
import { SellerListComponent } from './seller-list/seller-list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'buyers',
    canActivate: [AuthGuard],
    component: UsersListComponent
  },
  {
    path: 'sellers',
    canActivate: [AuthGuard],
    component: SellerListComponent
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    component: ProductListComponent,
    data: { animation: 'EcommerceShopComponent' }
  },
  {
    path: 'add-new-product',
    canActivate: [AuthGuard],
    component: AddNewProductComponent,
  },
  {
    path: 'details/:id',
    component: EcommerceDetailsComponent,
    data: { animation: 'EcommerceDetailsComponent' }
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    component: OrdersComponent
  },
  {
    path: 'feedbackSupport',
    canActivate: [AuthGuard],
    component: FeedbackSupportComponent
  },
  {
    path: 'promotions',
    canActivate: [AuthGuard],
    component: PromotionsComponent
  },
  {
    path: 'promotion-detail/:id',
    canActivate: [AuthGuard],
    component: PromotionsDetailComponent
  },
  {
    path: 'pending-approval',
    canActivate: [AuthGuard],
    component: PendingApprovalComponent
  },
  {
    path: 'user-details',
    canActivate: [AuthGuard],
    component: UserDetailsComponent
  },
  {
    path: 'user-details/:id',
    canActivate: [AuthGuard],
    component: UserDetailsComponent
  },
  {
    path: 'edit-user-detail/:id',
    canActivate: [AuthGuard],
    component: UserDetailEditComponent
  },
  {
    path: 'edit-product-detail/:id',
    canActivate: [AuthGuard],
    component: EditProductComponent
  }
]
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

@NgModule({
  declarations: [
    DashboardComponent,
    UsersListComponent,
    EcommerceDetailsComponent,
    EcommerceShopComponent,
    EcommerceSidebarComponent,
    EcommerceItemComponent,
    PromotionsComponent,
    PendingApprovalComponent,
    FeedbackSupportComponent,
    UserDetailsComponent,
    NewUserSidebarComponent,
    OrdersComponent,
    UserDetailEditComponent,
    PromotionsDetailComponent,
    PromotionItemComponent,
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
    AddNewProductComponent,
    SellerListComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardSnippetModule,
    NgApexchartsModule,
    NgxDatatableModule,
    SwiperModule,
    CoreTouchspinModule,
    CoreSidebarModule,
    NouisliderModule,
    FileUploadModule
  ],
  providers: [
    DashboardService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class AdminModule {}
