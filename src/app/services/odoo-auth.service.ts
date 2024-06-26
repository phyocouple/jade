import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { CapacitorCookies } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class OdooAuthService {
  private readonly SESSION_ID_KEY = 'odoo_session_id';
  private readonly ODOO_URL = 'https://devstg.mymedicine.com.mm';
  private readonly ODOO_DB = 'odoo-ps-pshk-myanmar-online-pharmancy-staging-jun-13632668';

  async authenticate(username: string, password: string): Promise<void> {
    const url = `${this.ODOO_URL}/web/session/authenticate`;

    const data = {
      jsonrpc: "2.0",
      params: {
        db: this.ODOO_DB,
        login: username,
        password: password,
      },
    };

    try {
      const response = await CapacitorHttp.post({
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract cookies from the response headers
      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        const cookies = setCookieHeader.split(';');
        const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='));
        if (sessionCookie) {
          const sessionId = sessionCookie.split('=')[1];
          await Preferences.set({ key: this.SESSION_ID_KEY, value: sessionId });
          await CapacitorCookies.setCookie({
            url: this.ODOO_URL,
            key: 'session_id',
            value: sessionId,
            path: '/',
          });
        } else {
          throw new Error('Session ID not found in cookies');
        }
      } else {
        throw new Error('Set-Cookie header not found in response');
      }
    } catch (error) {
      console.error('Odoo authentication failed', error);
      throw new Error('Odoo authentication failed');
    }
  }

  async getSessionId(): Promise<string | null> {
    const sessionId = await Preferences.get({ key: this.SESSION_ID_KEY });
    return sessionId.value;
  }

  getCookies(): string {
    return document.cookie;
  }
}
