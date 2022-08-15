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

const AddWord = () => {
  const [word, setWord] = useState<string>();
  const [translate, setTraslate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const saveTheWord = () => {
    setLoading(true);
    console.log(word, translate);
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
