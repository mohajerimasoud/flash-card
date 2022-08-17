import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { firebaseFireStoreDB } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router";

const AddWord = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [present, dismiss] = useIonToast();

  const [word, setWord] = useState<string>();
  const [translate, setTraslate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const addWordSuccess = () => {
    setWord("");
    setTraslate("");
    history.push("home");
  };

  const getCurrentUserId = async () => {
    try {
      const auth = await getAuth();
      const user = auth.currentUser;
      console.log("user info", user);
      return user?.uid;
    } catch (error: any) {
      console.log("cannot get user info");
      history.push("/login");
    }
  };

  const saveTheWord = async () => {
    setLoading(true);
    console.log(word, translate);
    if (!word || !translate) {
      present("Both fields are mandatory . ", 2000);
      setLoading(false);

      return;
    }

    //
    try {
      const uid = await getCurrentUserId();
      const docRef = await addDoc(collection(firebaseFireStoreDB, "words"), {
        word,
        translate,
        user: uid,
        history: [],
        success: 0,
        failer: 0,
        createdDate: Date.now(),
        lastIssuedAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      setLoading(false);
      addWordSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
      present("Some error occured, plz try again !  ", 2000);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new word 🎉</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="ion-margin">
          <IonItem>
            <IonLabel position="floating">The word you want to learn </IonLabel>
            <IonInput
              value={word}
              onIonChange={(e) => setWord(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              It's translate or description{" "}
            </IonLabel>
            <IonInput
              value={translate}
              onIonChange={(e) => setTraslate(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton onClick={saveTheWord} expand="block" className="ion-margin">
          {loading ? <IonSpinner /> : "Save"}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddWord;
