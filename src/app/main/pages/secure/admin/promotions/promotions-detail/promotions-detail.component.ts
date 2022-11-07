import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-promotions-detail',
  templateUrl: './promotions-detail.component.html',
  styleUrls: ['./promotions-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class PromotionsDetailComponent implements OnInit {
  // public
  public contentHeader: object;
  public product :any;
  public products = [
    {
      id: 1,
      name: 'VicTsing Wireless Mouse,',
      slug: 'vic-tsing-wireless-mouse-1',
      description:
        'After thousands of samples of palm data, we designed this ergonomic mouse. The laptop mouse has a streamlined arc and thumb rest to help reduce the stress caused by prolonged use of the laptop mouse.',
      brand: 'VicTsing',
      price: 10.99,
      image: 'assets/images/promotion/promotion-banner.jpg',
      hasFreeShipping: true,
      rating: 3
    }];
  public wishlist;
  public cartList;
  public relatedProducts;

  // Swiper
  public swiperResponsive: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  };

  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor() {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Wishlist
   *
   * @param product
   */
  toggleWishlist(product) {
    // if (product.isInWishlist === true) {
    //   this._ecommerceService.removeFromWishlist(product.id).then(res => {
    //     product.isInWishlist = false;
    //   });
    // } else {
    //   this._ecommerceService.addToWishlist(product.id).then(res => {
    //     product.isInWishlist = true;
    //   });
    // }
  }

  /**
   * Add To Cart
   *
   * @param product
   */
  // addToCart(product) {
  //   this._ecommerceService.addToCart(product.id).then(res => {
  //     product.isInCart = true;
  //   });
  // }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to Selected Product change
    // this._ecommerceService.onSelectedProductChange.subscribe(res => {
      this.product = this.products[0];
    // });

    // Subscribe to Wishlist change
    // this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    // Subscribe to Cartlist change
    // this._ecommerceService.onCartListChange.subscribe(res => (this.cartList = res));

    // Get Related Products
    // this._ecommerceService.getRelatedProducts().then(response => {
    //   this.relatedProducts = response;
    // });

    // this.product.isInWishlist = this.wishlist.findIndex(p => p.productId === this.product.id) > -1;
    // this.product.isInCart = this.cartList.findIndex(p => p.productId === this.product.id) > -1;

    // content header
    this.contentHeader = {
      headerTitle: 'Product Details',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'eCommerce',
            isLink: true,
            link: '/'
          },
          {
            name: 'Shop',
            isLink: true,
            link: '/'
          },
          {
            name: 'Details',
            isLink: false
          }
        ]
      }
    };
  }
}
