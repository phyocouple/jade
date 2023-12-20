/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'add-new-card',
    loadChildren: () => import('./pages/add-new-card/add-new-card.module').then(m => m.AddNewCardPageModule)
  },
  {
    path: 'address-list',
    loadChildren: () => import('./pages/address-list/address-list.module').then(m => m.AddressListPageModule)
  },
  {
    path: 'brands',
    loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsPageModule)
  },
  {
    path: 'by-category',
    loadChildren: () => import('./pages/by-category/by-category.module').then(m => m.ByCategoryPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'coupon-list',
    loadChildren: () => import('./pages/coupon-list/coupon-list.module').then(m => m.CouponListPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./pages/favourite/favourite.module').then(m => m.FavouritePageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterPageModule)
  },
  {
    path: 'gift-cards',
    loadChildren: () => import('./pages/gift-cards/gift-cards.module').then(m => m.GiftCardsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./pages/order-details/order-details.module').then(m => m.OrderDetailsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'payment-cards',
    loadChildren: () => import('./pages/payment-cards/payment-cards.module').then(m => m.PaymentCardsPageModule)
  },
  {
    path: 'product-info',
    loadChildren: () => import('./pages/product-info/product-info.module').then(m => m.ProductInfoPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'review-list',
    loadChildren: () => import('./pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'shipping-list',
    loadChildren: () => import('./pages/shipping-list/shipping-list.module').then(m => m.ShippingListPageModule)
  },
  {
    path: 'social-account',
    loadChildren: () => import('./pages/social-account/social-account.module').then(m => m.SocialAccountPageModule)
  },
  {
    path: 'success-payments',
    loadChildren: () => import('./pages/success-payments/success-payments.module').then(m => m.SuccessPaymentsPageModule)
  },
  {
    path: 'variations-modal',
    loadChildren: () => import('./pages/variations-modal/variations-modal.module').then(m => m.VariationsModalPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'write-review',
    loadChildren: () => import('./pages/write-review/write-review.module').then(m => m.WriteReviewPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
