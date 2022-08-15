import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { signinWithGoogle } from "../../firebase/config";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const googleLoginHandler = async () => {
    try {
      const login = await signinWithGoogle();
      console.log("google login success", login);
    } catch (error) {
      console.log("google login error");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonButton onClick={googleLoginHandler} color="danger" expand="block">
          <IonIcon icon={logoGoogle} />
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
