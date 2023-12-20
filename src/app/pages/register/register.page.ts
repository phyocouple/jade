/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { SocialAccountPage } from '../social-account/social-account.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordView: boolean = false;
  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  toggePassword() {
    this.passwordView = !this.passwordView;
  }

  async socialAccount() {
    const modal = await this.modalController.create({
      component: SocialAccountPage,
      cssClass: 'custom_modal'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.role && data.role == 'ok') {
        this.onHome();
      }
    });
    await modal.present();
  }

  onHome() {
    this.util.navigateRoot('tabs/home');
  }

  onBack() {
    this.util.onBack();
  }

}
