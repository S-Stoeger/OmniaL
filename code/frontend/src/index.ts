import Keycloak from 'keycloak-js';

//grant_type=password&client_id=backend&client_secret=XyydRLFh9iHBOf91dejPV0qMOoELytPL&username=omnial&password=omnial
const keycloak = new Keycloak({
    url: 'http://localhost:8000',
    realm: 'omnial',
    clientId: 'frontend'
});

// @ts-ignore
async function init()  {
    try {
        const authenticated = await keycloak.init({enableLogging:true});
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        if (!authenticated) {
            await keycloak.login();
        }
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
    localStorage.setItem('token', keycloak.token)
}


export const token = init();


import "./app";
