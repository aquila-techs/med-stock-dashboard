import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '@core/services/admin-services/admin.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;
  public rows = [
    {
      id: 1,
      name: 'Disperen 1',
      quantity: '55 Pack',
      price: "$12",
      discount: "30%",
      status: 'inactive',
      avatar: ''
    },{
      id: 1,
      name: 'Disperen 2',
      quantity: '11 Pack',
      price: "$41",
      discount: "40%",
      status: 'inactive',
      avatar: ''
    },{
      id: 1,
      name: 'Disperen 3',
      quantity: '12 Pack',
      price: "$41",
      discount: "40%",
      status: 'inactive',
      avatar: ''
    }];
    public products = [
      {
        id: 1,
        name: 'Disprin 1',
        price: 155,
        image: 'assets/images/medicine/disprin.png',
        expiryDate: "2022-10-09T19:00:00.000Z",
        status: 'active'
      },
      {
        id: 2,
        name: 'Disprin 2',
        price: 1119,
        image: 'assets/images/medicine/disprin.png',
        expiryDate: "2022-10-09T19:00:00.000Z",
        status: 'active'
      },
      {
        id: 3,
        name: 'Disprin 3',
        price: 441,
        image: 'assets/images/medicine/disprin.png',
        expiryDate: "2022-10-09T19:00:00.000Z",
        status: 'active'
      }
      
  ];
    public ColumnMode = ColumnMode;
  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserViewService} _userViewService
   */
  constructor(private router: Router, private adminService: AdminService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._userViewService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });
    this.products = [
      {
        id: 1,
        name: 'Disprin 1',
        price: 155,
        image: 'assets/images/medicine/disprin.png',
        expiryDate: "2022-10-09T19:00:00.000Z",
        status: 'active'
      },
      {
        id: 2,
        name: 'Disprin 2',
        price: 1119,
        image: 'assets/images/medicine/disprin.png',
        expiryDate: "2022-10-09T19:00:00.000Z",
        status: 'active'
      },
      {
        id: 3,
        name: 'Disprin 3',
        price: 441,
        image: 'assets/images/medicine/disprin.png',
        expiryDate: "2022-10-09T19:00:00.000Z",
        status: 'active'
      }
      
  ];
  this.adminService.selectedUser.subscribe({
    next: (res)=>{
      this.data = res;
    }

  })
    // this.data =  {
    //   id: 1,
    //   fullName: 'Galen Slixby',
    //   company: 'Yotz PVT LTD',
    //   role: 'Editor',
    //   username: 'gslixby0',
    //   country: 'El Salvador',
    //   contact: '(479) 232-9151',
    //   email: 'gslixby0@abc.net.au',
    //   currentPlan: 'Enterprise',
    //   status: 'inactive',
    //   avatar: ''
    // };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
