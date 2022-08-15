import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { firebaseFireStoreDB } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router";

const AddWord = () => {
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
      throw error;
    }
  };

  const saveTheWord = async () => {
    setLoading(true);
    console.log(word, translate);
    if (!translate || !translate) return;

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
				createdDate : Date.now()
      });
      console.log("Document written with ID: ", docRef.id);
      setLoading(false);
      addWordSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new world 🎉</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="ion-margin">
          <IonItemDivider>The word you want to learn </IonItemDivider>
          <IonItem>
            <IonInput
              value={word}
              placeholder="The Word"
              onIonChange={(e) => setWord(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItemDivider>It's translate or description</IonItemDivider>
          <IonItem>
            <IonInput
              value={translate}
              placeholder="Translate / Description"
              onIonChange={(e) => setTraslate(e.detail.value!)}
              clearInput
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
