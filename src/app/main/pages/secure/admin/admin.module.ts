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

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersListComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    UsersListComponent
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
  ],

  providers: [DashboardService]
})
export class AdminModule {}
