import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OdooAuthService } from './odoo-auth.service'; // Import the OdooAuthService
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { EcommerceService } from './ecommerce.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  apiUrl = environment.apiUrl;
  isLoading = false;
  sessionId: string | null = null;

  cateList: any[] = [];

  banners: any[] = [
    "assets/images/banners/1.png",
    "assets/images/banners/2.png",
    "assets/images/banners/3.png",
    "assets/images/banners/4.png",
    "assets/images/banners/5.png",
    "assets/images/banners/6.png",
    "assets/images/banners/7.png",
    "assets/images/banners/8.png",
  ];

  products: any[] = [];

  brands: any[] = [
    {
      "Brand": "Nike",
      "image": "assets/images/brands/nike.png"
    },
    {
      "Brand": "Louis Vuitton",
      "image": "assets/images/brands/lv.png"
    },
    {
      "Brand": "GUCCI",
      "image": "assets/images/brands/gucci.png"
    },
    {
      "Brand": "Chanel",
      "image": "assets/images/brands/chanel.png"
    },
    {
      "Brand": "Adidas",
      "image": "assets/images/brands/adidas.png"
    },
    {
      "Brand": "Hermès",
      "image": "assets/images/brands/hermes.png"
    },
    {
      "Brand": "ZARA",
      "image": "assets/images/brands/zara.png"
    },
    {
      "Brand": "H&M",
      "image": "assets/images/brands/hm.png"
    },
    {
      "Brand": "Cartier",
      "image": "assets/images/brands/cartier.png"
    },
    {
      "Brand": "UNIQLO",
      "image": "assets/images/brands/uni.png"
    },
  ];

  userList: any[] = [
    {
      "image": "assets/images/avatar/1.jpg",
      "name": "Richard G. Oneal"
    },
    {
      "image": "assets/images/avatar/2.jpg",
      "name": "Floyd M. Helton"
    },
  ];

  chatList: any[] = [
    {
      "from": "a",
      "message": "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!😄😄"
    },
    {
      "from": "b",
      "message": "	😃	😃	😃Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
    },
  ];

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private zone: NgZone,
    private http: HttpClient,
    private odooAuthService: OdooAuthService,
    public ecommerceService: EcommerceService
  ) {
    this.loadCategories();
    this.getLocalAssets('product.json').then((data: any) => {
      this.products = data;
    });
    console.log(this.cateList.length);
  }

  public async loadCategories() {
    try {
      const categories = await this.ecommerceService.getPublicCategories();
      this.cateList = categories.map(category => ({
        ...category,
        normal: `${environment.apiUrl}${category.image_url}`,
        active: `${environment.apiUrl}${category.image_url}`,
      }));
    } catch (error) {
      console.error('Error loading categories', error);
    }
  }

  async getPublicCategories(): Promise<any> {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {

      },
      id: null
    };

    const options = {
      url: `${environment.apiUrl}/api/categories`,
      headers: { 'Content-Type': 'application/json'},
      data: { foo: 'bar' },
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.data.result
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  changeMenuItems(action: boolean) {
    this.menuCtrl.enable(action);
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

  navigateToPage(routes: any, param?: NavigationExtras | undefined) {
    this.zone.run(() => {
      console.log(routes, param);
      this.router.navigate([routes], param);
    });
  }

  navigateRoot(routes: any | string) {
    this.zone.run(() => {
      this.navCtrl.navigateRoot([routes]);
    });
  }

  getKeys(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.getItem(key))
    });
  }

  clearKeys(key: string) {
    // this.storage.remove(key);
    localStorage.removeItem(key);
  }

  setKeys(key: string, value: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.setItem(key, value));
    });
  }

  async show(msg?: string | null) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg && msg != '' && msg != null ? msg : '',
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  /*
    Show Warning Alert Message
    param : msg = message to display
    Call this method to show Warning Alert,
    */
  async showWarningAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSimpleAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
  async showErrorAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
     param : email = email to verify
     Call this method to get verify email
     */
  async getEmailFilter(email: string) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      const alert = await this.alertCtrl.create({
        header: 'Warning',
        message: 'Please enter valid email',
        buttons: ['OK']
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }


  /*
    Show Toast Message on Screen
     param : msg = message to display, color= background
     color of toast example dark,danger,light. position  = position of message example top,bottom
     Call this method to show toast message
     */

  async showToast(msg: any, colors: any, positon: any) {


    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
  async shoNotification(msg: any, colors: any, positon: any) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  async errorToast(msg: any, color?: string | (string & Record<never, never>) | undefined) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? color : 'dark'
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  onBack() {
    this.navCtrl.back();
  }

  makeid(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public getLocalAssets(name: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.get('assets/json/' + name, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


}
