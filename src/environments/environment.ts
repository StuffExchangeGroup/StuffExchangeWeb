// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    firebaseURl: 'https://notification-69f68-default-rtdb.asia-southeast1.firebasedatabase.app/',
    production: false,
    // baseURl: 'http://45.122.223.101:8082/',
    baseURl: 'http://localhost:8082/',
    baseURlFake: 'http://192.168.1.2:8082/',

    firebase: {
        projectId: 'notification-69f68',
        appId: '1:773700716215:web:ba4be7608faefb21016f32',
        databaseURL: 'https://notification-69f68-default-rtdb.asia-southeast1.firebasedatabase.app',
        storageBucket: 'notification-69f68.appspot.com',
        locationId: 'asia-southeast1',
        apiKey: 'AIzaSyD3Bk4hGzJqaa8SQ6REJWiWg8TKMVgHhi0',
        authDomain: 'notification-69f68.firebaseapp.com',
        messagingSenderId: '773700716215',
        measurementId: 'G-TCY37984HH',
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
