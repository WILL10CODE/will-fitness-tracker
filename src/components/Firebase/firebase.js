import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
    apiKey: "AIzaSyAFCoVZ1Rg5e1GrZX8adsbjdHVuNFPCWF0",
    authDomain: "fitness-tracker-25aeb.firebaseapp.com",
    databaseURL:"https://fitness-tracker-25aeb-default-rtdb.firebaseio.com/",
    projectId: "fitness-tracker-25aeb",
    storageBucket: "fitness-tracker-25aeb.appspot.com",
    messagingSenderId: "759767945459",
    appId: "1:759767945459:web:345c9fe45ca96f51a1e786",
    
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }
    
    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = (email) => 
        this.auth.sendPasswordResetEmail(email);
    
    /*** Database ***/
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`users/${uid}/activities`);
        ref.push(activity);
    };

    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }


}

export default Firebase;







