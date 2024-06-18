// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { SocialAccountPage } from '../social-account/social-account.page';
import { OdooAuthService } from 'src/app/services/odoo-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  passwordView: boolean = false;
  userEmailOrPhone: string = '';
  userPassword: string = '';
  keepMeSignedIn: boolean = false;

  constructor(
    public util: UtilService,
    private modalController: ModalController,
    private odooAuthService: OdooAuthService
  ) { }

  togglePasswordVisibility() {
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

  onRegister() {
    this.util.navigateToPage('register');
  }

  onResetPassword() {
    this.util.navigateToPage('reset-password');
  }

  async loginUser() {
    try {
      await this.odooAuthService.authenticate(this.userEmailOrPhone, this.userPassword);

      // Authentication successful, check if session_id has been stored
      const sessionId = await this.odooAuthService.getSessionId();

      if (sessionId) {
        console.log('Session ID successfully retrieved and stored:', sessionId);
        // Handle successful authentication, e.g., navigate to another page
        this.onHome();
      } else {
        console.warn('Session ID not found');
        // Handle case where session ID is not found
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      // Handle authentication error, show error message, etc.
    }
  }
}
