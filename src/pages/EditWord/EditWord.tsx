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
  useIonToast,
} from "@ionic/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { firebaseFireStoreDB } from "../../firebase/config";
import { IWordType } from "../../Types/app.types";
import classes from "../../styles.module.css";

const EditWord = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [present, dismiss] = useIonToast();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [word, setWord] = useState<string>();
  const [translate, setTraslate] = useState<string>();
  const [document, setDocument] = useState<IWordType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  useEffect(() => {
    id && getWordInfo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getWordInfo = async (id: string) => {
    setLoading(true);
    try {
      const theDoc = doc(firebaseFireStoreDB, "words", id);
      const docInfo = await getDoc(theDoc);
      const data = docInfo.data() as IWordType;
      data.history = data?.history.reverse();
      // setWord(docInfo.data() as IWordType);
      setDocument({ ...data, id });
      setTraslate(data.translate);
      setWord(data.word);
      setLoading(false);
    } catch (error) {
      console.log("error getting doc info", error);
      present("Some error occured, plz try again !  ", 2000);
      setLoading(false);
      history.goBack();
    }
  };

  const updateTheWord = async (id: string) => {
    setUpdateLoading(true);
    console.log("saveTheWord", document);
    if (!word || !translate) {
      present("Both fields are mandatory . ", 2000);
      setLoading(false);

      return;
    }

    try {
      const currentDoc = doc(firebaseFireStoreDB, "words", id);
      await updateDoc(currentDoc, {
        ...document,
        word,
        translate,
      });
      setUpdateLoading(false);
      present("Word updated successfully", 2000).then(() => {
        history.push("/review");
      });

      console.log("word updated successfully");
    } catch (error) {
      setUpdateLoading(false);
      present("Some error occured, plz try again !  ", 2000);
      console.log("word update failed", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit word</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div className={classes["spinner-page-center"]}>
            <IonSpinner />
          </div>
        ) : (
          <>
            <IonList className="ion-margin">
              <IonItemDivider>The word </IonItemDivider>
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
            <IonButton
              onClick={() => {
                id && updateTheWord(id);
              }}
              expand="block"
              className="ion-margin"
            >
              {updateLoading ? <IonSpinner /> : "Update"}
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditWord;
