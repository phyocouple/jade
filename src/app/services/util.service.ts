/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLoading = false;

  cateList: any[] = [
    {
      "name": "Popular",
      "normal": "assets/images/categories/1.png",
      "active": "assets/images/categories/1_a.png"
    },
    {
      "name": "smartphones",
      "normal": "assets/images/categories/2.png",
      "active": "assets/images/categories/2_a.png"
    },
    {
      "name": "laptops",
      "normal": "assets/images/categories/3.png",
      "active": "assets/images/categories/3_a.png"
    },
    {
      "name": "fragrances",
      "normal": "assets/images/categories/4.png",
      "active": "assets/images/categories/4_a.png"
    },
    {
      "name": "skincare",
      "normal": "assets/images/categories/5.png",
      "active": "assets/images/categories/5_a.png"
    },
    {
      "name": "groceries",
      "normal": "assets/images/categories/6.png",
      "active": "assets/images/categories/6_a.png"
    },
    {
      "name": "home-decoration",
      "normal": "assets/images/categories/7.png",
      "active": "assets/images/categories/7_a.png"
    },
    {
      "name": "furniture",
      "normal": "assets/images/categories/8.png",
      "active": "assets/images/categories/8_a.png"
    },
    {
      "name": "tops",
      "normal": "assets/images/categories/9.png",
      "active": "assets/images/categories/9_a.png"
    },
    {
      "name": "womens-dresses",
      "normal": "assets/images/categories/10.png",
      "active": "assets/images/categories/10_a.png"
    },
    {
      "name": "womens-shoes",
      "normal": "assets/images/categories/11.png",
      "active": "assets/images/categories/11_a.png"
    },
    {
      "name": "mens-shirts",
      "normal": "assets/images/categories/12.png",
      "active": "assets/images/categories/12_a.png"
    },
    {
      "name": "mens-shoes",
      "normal": "assets/images/categories/13.png",
      "active": "assets/images/categories/13_a.png"
    },
    {
      "name": "mens-watches",
      "normal": "assets/images/categories/14.png",
      "active": "assets/images/categories/14_a.png"
    },
    {
      "name": "womens-watches",
      "normal": "assets/images/categories/15.png",
      "active": "assets/images/categories/15_a.png"
    },
    {
      "name": "womens-bags",
      "normal": "assets/images/categories/16.png",
      "active": "assets/images/categories/16_a.png"
    },
    {
      "name": "womens-jewellery",
      "normal": "assets/images/categories/17.png",
      "active": "assets/images/categories/17_a.png"
    },
    {
      "name": "sunglasses",
      "normal": "assets/images/categories/18.png",
      "active": "assets/images/categories/18_a.png"
    },
    {
      "name": "automotive",
      "normal": "assets/images/categories/19.png",
      "active": "assets/images/categories/19_a.png"
    },
    {
      "name": "motorcycle",
      "normal": "assets/images/categories/20.png",
      "active": "assets/images/categories/20_a.png"
    },
    {
      "name": "lighting",
      "normal": "assets/images/categories/21.png",
      "active": "assets/images/categories/21_a.png"
    },
  ];

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
    {
      "image": "assets/images/avatar/3.jpg",
      "name": "Matthew M. Hernandez"
    },
    {
      "image": "assets/images/avatar/4.jpg",
      "name": "Candice M. Coffey"
    },
    {
      "image": "assets/images/avatar/5.jpg",
      "name": "Terrie R. Cobb"
    },
    {
      "image": "assets/images/avatar/6.jpg",
      "name": "Clarissa C. Wentz"
    },
    {
      "image": "assets/images/avatar/7.jpg",
      "name": "Shirley J. Arnold"
    },
    {
      "image": "assets/images/avatar/8.jpg",
      "name": "Jack R. Applegate"
    },
    {
      "image": "assets/images/avatar/9.jpg",
      "name": "Anita T. Ross"
    },
    {
      "image": "assets/images/avatar/10.jpg",
      "name": "Dianna K. Wadley"
    },
    {
      "image": "assets/images/avatar/11.jpg",
      "name": "Rodney R. Ruddy"
    },
    {
      "image": "assets/images/avatar/12.jpg",
      "name": "Deanna B. Mull"
    },
    {
      "image": "assets/images/avatar/13.jpg",
      "name": "Michael C. Phelan"
    },
    {
      "image": "assets/images/avatar/14.jpg",
      "name": "Lorraine S. Jones"
    },
    {
      "image": "assets/images/avatar/15.jpg",
      "name": "Philip J. Watson"
    },
    {
      "image": "assets/images/avatar/16.jpg",
      "name": "Patricia R. James"
    },
    {
      "image": "assets/images/avatar/17.jpg",
      "name": "Dena C. Fernandez"
    },
    {
      "image": "assets/images/avatar/18.jpg",
      "name": "Troy S. Gaines"
    },
    {
      "image": "assets/images/avatar/19.jpg",
      "name": "Robin K. Miller"
    },
    {
      "image": "assets/images/avatar/20.jpg",
      "name": "Willie K. Rothermel"
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
    {
      "from": "a",
      "message": "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)"
    },
    {
      "from": "b",
      "message": "You can then edit a message by clicking on it. This way you can change the text, status (check marks) and time. You can also determine whether the message was sent by the sender (right) or receiver (left)."
    },
    {
      "from": "a",
      "message": "😀😀You can change the order of messages by dragging and dropping them."
    },
    {
      "from": "b",
      "message": "Finally, click  (top right) to download your fake chat as an image."
    },
    {
      "from": "a",
      "message": "😀😀Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)"
    },
    {
      "from": "b",
      "message": "You also have the facility to hide the header and footer if needed."
    },
    {
      "from": "a",
      "message": "😀😀😀Customize the clock time and battery percentage as per your satisfaction."
    },
    {
      "from": "b",
      "message": "Now, make all the required changes for Person 2 also."
    },
    {
      "from": "a",
      "message": "If satisfied, download the chat and share with all your close friends and relatives, and note their reactions."
    },
    {
      "from": "b",
      "message": "😀😀Privacy comes first. Our tool does not store any data or chats by keeping in mind the privacy of our users"
    },
    {
      "from": "a",
      "message": "😀😀😀😀Our android text generator tool has an easy-to-use interface for the ease of the users. Also, the results generated by our tool are fast and realistic"
    },
    {
      "from": "b",
      "message": "Message privately. End-to-end encryption and privacy controls. Stay connected. Message and call for free* around the world. Build community. Group conversations made simple. Express yourself. Say it with stickers, voice, GIFs and more. WhatsApp business. Reach your customers from anywhere."
    },
    {
      "from": "a",
      "message": "Send a single message to multiple people at once"
    },
    {
      "from": "b",
      "message": "You can now send messages in bold, italics or strikethrough too. Simply use the special characters before and after the words to get the formatting of your choice"
    },
    {
      "from": "a",
      "message": "If you want to know who you are chatting too much with on WhatsApp, you can find out by simply scrolling through the chat screen"
    }
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
  ) {
    this.getLocalAssets('product.json').then((data: any) => {
      this.products = data;
    });
    console.log(this.cateList.length);
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
