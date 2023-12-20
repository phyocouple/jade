// src/app/services/odoo-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OdooAuthService {
  private odooBaseUrl = 'https://odoo-ps-pshk-myanmar-online-pharmancy-staging-10550560.dev.odoo.com/'; // Replace with your Odoo instance URL
  private odooDb = 'odoo-ps-pshk-myanmar-online-pharmancy-staging-10550560'; // Replace with your Odoo database name

  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string): Promise<string> {
    const url = `${this.odooBaseUrl}/web/session/authenticate`;

    const data = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        db: this.odooDb,
        login: username,
        password: password,
      },
    };

    // Set the withCredentials option to true to include cookies in the request
    const options = { withCredentials: true };

    return this.httpClient.post(url , data, options)
      .toPromise()
      .then((response: any) => {
        // Assuming the session_id is returned in the response
        const session_id: string = response.result.session_id;

        if (session_id) {
          // Authentication successful, return the session_id
          return session_id;
        } else {
          // Authentication failed, handle the error
          return Promise.reject('Authentication failed');
        }
      })
      .catch(error => {
        // Handle any errors during the request
        return Promise.reject(error);
      });
  }
}
