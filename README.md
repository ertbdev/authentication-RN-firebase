# React Native Authentication system (multiple language support)

This application allows users to sign in / sign up through the strategies: Email-Password and Google. This project was developed using React Native and Firebase.

## Packages Used

- [React Navigation v6](https://reactnavigation.org/)
- [React Native Firebase v6](https://rnfirebase.io/)
- [Styled Components](https://styled-components.com/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [i18n-js](https://www.npmjs.com/package/i18n-js)
- [react native localize](https://github.com/zoontek/react-native-localize)
- [yup](https://github.com/jquense/yup)
- [yup Password](https://www.npmjs.com/package/yup-password)
- [react native svg](https://github.com/software-mansion/react-native-svg)
- [react native google sign in](https://github.com/react-native-google-signin/google-signin)

### DESCRIPTION

#### Actions:

- User can create an account using email/password
- User can sign in using existing email/password
- User can sign in using Google (OAuth)

#### Creation of an account (email/password): 

- The user fills the signup form and presses Sign in button
- The form is validated using a yup schema 
- If data meet the requirements, the sign in firebase function is called using the provided data 
- If the data is valid, the account is created and the user is signed in

### Sign in the application by third parties (Google):

- User presses Google button to sign in
- The client requests a token from third parties (Google).
- Third parties redirect the user to a secure page in the service provider to sign in.
- The user authenticates on Google.
- The client uses the token to generate credentials.
- The client calls the signInWithCredential firebase function using the generated credentials
- If the credentials are valid, the account is created and the user is signed in

### Sign In UI

![singin-1](https://firebasestorage.googleapis.com/v0/b/portfolio-4de53.appspot.com/o/readme%2Fauth-UI.png?alt=media&token=a442e06b-0bf4-4e65-bb11-d4e5b4bcc34e)

<img src="https://firebasestorage.googleapis.com/v0/b/portfolio-4de53.appspot.com/o/readme%2Fsigin.gif?alt=media&token=e4c849a1-8ba3-4b40-b2dd-51e92e384264" width="200">

### INSTALATION

- Clone the git project 
- Install the required modules: - npm install
- Create the [firebase project ](https://console.firebase.google.com/?consoleUI=FIREBASE)
- Configure the Sign-in providers email/password and google (firebase)
- Add Android App and configure the SHA certificate fingerprints (firebase)
- Download the google-services.json file from the App configuration and place it inside of your project at the following location: /android/app/google-services.json. (firebase)
#### Notes: 

- For obtaining the SHA certificate fingerprints you can use the following commands: 

```
cd android && ./gradlew signingReport
```
or
```
keytool -list -v -keystore ./App/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

- For aditional information please visit [React Native Firebase](https://rnfirebase.io/)

### RUN PROJECT
```
npx react-native start
```

### TO-DO

:black_square_button: Add testing  
:black_square_button: Add user data to firestore and created the user profile screen