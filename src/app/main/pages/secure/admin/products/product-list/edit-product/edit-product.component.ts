import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ProductService } from '@core/services/admin-services/product.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProductComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public tempRow;
  public avatarImage: string = '';
  public product: any;
  public selectedImage = null;
  public categories = [];
  @ViewChild('productForm') productForm: NgForm;

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   */
  constructor(private router: Router, private productService: ProductService,
    private toastrService: ToastrService) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset Form With Default Values
   */
  resetFormWithDefaultValues() {
    this.productForm.resetForm(this.tempRow);
  }

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.selectedImage = event.target.files[0]
      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Submit
   *
   * @param form
   */
   submit(form) {
    if (this.product.price && this.product.categoryId && this.product.name && this.product.sku) {
      let formData = new FormData();
      if(this.selectedImage){
        formData.append('productImages',this.selectedImage)
      }
      formData.append('name',this.product.name);
      formData.append('price',this.product.price);
      formData.append('description',this.product.description);
      formData.append('sku',this.product.sku);
      if(this.product.expiryDate){
        formData.append('expiryDate', moment((this.product.expiryDate.month - 1)+'/'+this.product.expiryDate.day+'/'+this.product.expiryDate.year).format('MM/DD/YYYY'));
      }
      formData.append('categoryId',this.product.categoryId);
      this.productService.updateProduct(this.product._id, formData).subscribe({
        next: (res)=>{
          console.log(res);
          this.toastrService.success('Product Successfully Created.');
          this.router.navigate(['/pages/admin/products'])
        }
      })
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.productService.selectProduct.subscribe(res => {
      this.product = res;
      this.avatarImage = this.product.imageUrl;
      if(this.product.expiryDate){
        let expiryDate = this.product.expiryDate;
        this.product.expiryDate = {
          "year": parseInt(moment(expiryDate).format('YYYY')),
          "month": parseInt(moment(expiryDate).format('MM')),
          "day": parseInt(moment(expiryDate).format('DD'))
        }
      }
    });

    this.productService.getAllCategories().subscribe({
      next: (res)=>{
        this.categories = res;
      }
    })
    // this._userEditService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.rows = response;
    //   this.rows.map(row => {
    //     if (row.id == this.urlLastValue) {
    //     }
    //   });
    // });
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