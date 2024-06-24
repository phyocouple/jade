import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { CapacitorCookies } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class OdooAuthService {
  private readonly SESSION_ID_KEY = 'odoo_session_id';

  async authenticate(username: string, password: string): Promise<void> {
    const url = 'http://localhost:3000/odoo/login';

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await CapacitorHttp.post({
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const sessionId = response.data.sessionId;
      if (sessionId) {
        await Preferences.set({ key: this.SESSION_ID_KEY, value: sessionId });
        await CapacitorCookies.setCookie({
          url: 'http://localhost:8081', // Use your actual backend URL here
          key: 'session_id',
          value: sessionId,
          path: '/',
        });
      } else {
        throw new Error('Session ID not found in response');
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
