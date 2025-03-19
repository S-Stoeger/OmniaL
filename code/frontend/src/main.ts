import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Keycloak from 'keycloak-js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const keycloak = new Keycloak({
  url: 'https://auth.htl-leonding.ac.at',
  realm: '24-255ahitm',
  clientId: 'frontend',
});

// @ts-ignore
async function init()  {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',  // Ensures redirection to login
      checkLoginIframe: false,   // Prevents iframe-related login issues
      pkceMethod: 'S256',        // Uses PKCE for better security (if supported)
      enableLogging: true
    });
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    if (!authenticated) {
      await keycloak.login();
    }
  } catch (error) {
    console.error('Failed to initialize adapter:', error);
  }

  const token = keycloak.idTokenParsed;
  console.log("Benutzer:", token);

  //const userId  = keycloak.tokenParsed.sub;
  //console.log("User UUID:", userId);



  localStorage.setItem('token', keycloak.token!)
}

export function logout() {
  keycloak.logout();
}


init();

const token1 = localStorage.getItem('token')?.toString();
if (token1)
  console.log("token: "+token1);
