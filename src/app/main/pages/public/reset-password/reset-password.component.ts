import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '@core/services/admin-services/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-v2',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthResetPasswordComponent implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: UntypedFormGroup;
  public submitted = false;

  // Private
  private _unsubscribeAll: Subject<any>;
  private token = null;
  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: UntypedFormBuilder,
    private adminService: AdminService, private toatrService: ToastrService,private _router: Router, private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Toggle confirm password
   */
  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    if(!this.resetPasswordForm.invalid &&  this.resetPasswordForm['controls'].newPassword.value !== this.resetPasswordForm['controls'].confirmPassword.value){
      this.toatrService.error('Your passwrod or confirm password did not match.');
      return;
    }

    // Not stop here if form is valid
    if (!this.resetPasswordForm.invalid) {
      let body = {};
      body['token'] = this.token;
      body['password'] = this.resetPasswordForm['controls'].newPassword.value;
      this.adminService.resetPassword(body).pipe(takeUntil(this._unsubscribeAll)).subscribe({
        next: (res)=>{
          if(res && res.message){
            this.toatrService.error('Please check your email again. Token is expired.', 'Something Wrong!')
            return;
          }

          this.toatrService.success('You have successfully reset your password.','Sucessfully Reset!');
          this._router.navigate(['/login']);
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
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.route.params.subscribe((params: Params) => {
      if(!params['token']){
        this._router.navigate(['/login']);
      }
      this.token = params['token'];
    });
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
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
