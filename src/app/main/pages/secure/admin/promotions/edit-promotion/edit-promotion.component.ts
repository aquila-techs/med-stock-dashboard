import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ProductService } from '@core/services/admin-services/product.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PromotionService } from '@core/services/admin-services/promotion.service';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditPromotionComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public categories: any;
  public promotion: any = {
    'title': '',
    'imageUrl': '',
    'description': ''
  };
  public currentRow: any = null;
  public tempRow;
  public avatarImage: string = '';
  public selectedImage = null;
  @ViewChild('promotionForm') promotionForm: NgForm;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   */
  constructor(private router: Router, private promotionService: PromotionService, private route: ActivatedRoute,
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
    this.promotionForm.resetForm();
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
    if (this.promotion.title) {
      let formData = new FormData();
      if(this.selectedImage){
        formData.append('promotionImages',this.selectedImage)
      }
      formData.append('title',this.promotion.title);
      formData.append('description',this.promotion.description);
      this.promotionService.updatePromotion(this.promotion._id, formData).subscribe({
        next: (res)=>{
          console.log(res);
          this.toastrService.success('Promotion Successfully Updated.');
          this.router.navigate(['/pages/admin/promotions'])
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
    this.route.params.subscribe((params: Params) => {
      const promotionId = params['id'];

      this.promotionService.getPromotion(promotionId).subscribe({
        next: (res)=>{
          this.promotion = res;
        }
      })
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
}
