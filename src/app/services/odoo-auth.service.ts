import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

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
}
