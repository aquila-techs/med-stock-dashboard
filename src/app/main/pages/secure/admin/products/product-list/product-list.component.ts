import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ProductService } from '@core/services/admin-services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public products = [];
  public ColumnMode = ColumnMode;
  public temp = [];

  public searchValue = '';
  public rows: any;
  public pageSize=30;
  public pageNo=1;
  public total=0;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private productService: ProductService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          // this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          //   this.rows = response;
          //   this.tempData = this.rows;
          // });
        }, 450);
      } else {
        // this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //   this.rows = response;
        //   this.tempData = this.rows;
        // });
      }
    });
    let queryParams = '?pageSize='+this.pageSize+'&pageNo='+this.pageNo;
    this.productService.getAllProucts(queryParams).subscribe({
      next: (res)=>{
          this.products = res[0].results;
          this.products.map(elem => {
            if(!elem.imageUrl){
              elem['imageUrl'] = '';
            }
          })
          if(res[0].count && res[0].count.length > 0){
            this.total = res[0].count[0].totalCount;
          }else{
            this.total = 0;
          }
      }
    })
  }
  loadPage(event){
    this.pageNo = event;
    let queryParams = '?pageSize='+this.pageSize+'&pageNo='+event;
    if(this.searchValue.length > 3){
      queryParams = queryParams + '&q='+this.searchValue; 
    }
    this.productService.getAllProucts(queryParams).subscribe({
      next: (res)=>{
        this.products = res[0].results;
        this.products.map(elem => {
          if(!elem.imageUrl){
            elem['imageUrl'] = '';
          }
        })
        if(res[0].count && res[0].count.length > 0){
          this.total = res[0].count[0].totalCount;
        }else{
          this.total = 0;
        }
      },
      error: (err)=>{

      }
    })
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public productDetail(product){
    this.productService.setSelectedproduct(product);
    this.router.navigate(['/pages/admin/details/' + product._id])
  }

  public productEdit(product){
    this.productService.setSelectedproduct(product);
    this.router.navigate(['/pages/admin/edit-product-detail/' + product._id])
  }

  public searchProductName(){
    if(this.searchValue.length > 3){
      this.pageNo=1;
      let queryParams = '?pageSize='+this.pageSize+'&pageNo='+this.pageNo+ '&q='+this.searchValue;
      this.productService.getAllProucts(queryParams).subscribe({
        next: (res)=>{
            this.products = res[0].results;
            this.products.map(elem => {
              if(!elem.imageUrl){
                elem['imageUrl'] = '';
              }
            })
            if(res[0].count && res[0].count.length > 0){
              this.total = res[0].count[0].totalCount;
            }else{
              this.total = 0;
            }
        }
      })
    }else if(this.searchValue.length === 0){
      this.pageNo=1;
      let queryParams = '?pageSize='+this.pageSize+'&pageNo='+this.pageNo;
      this.productService.getAllProucts(queryParams).subscribe({
        next: (res)=>{
            this.products = res[0].results;
            this.products.map(elem => {
              if(!elem.imageUrl){
                elem['imageUrl'] = '';
              }
            })
            if(res[0].count && res[0].count.length > 0){
              this.total = res[0].count[0].totalCount;
            }else{
              this.total = 0;
            }
        }
      })
    }
    
  }

  public shortName(name){
    if(name.split(' ').length > 2){
      return name.split(' ')[0]+ " " + name.split(' ')[1];
    }
    return name;
  }
}
