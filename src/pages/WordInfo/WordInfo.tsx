import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { firebaseFireStoreDB } from "../../firebase/config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { EAnswerStatus, IWordHistory, IWordType } from "../../Types/app.types";
import {
  arrowUndoCircle,
  checkmarkCircle,
  closeCircle,
  pencil,
  trashBinOutline,
} from "ionicons/icons";
import classes from "../../styles.module.css";

const WordInfo: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [present, dismiss] = useIonToast();

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [Word, setWord] = useState<IWordType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);

  useEffect(() => {
    id && getWordInfo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getWordInfo = async (id: string) => {
    try {
      const theDoc = doc(firebaseFireStoreDB, "words", id);
      const docInfo = await getDoc(theDoc);
      const data = docInfo.data() as IWordType;
      data.history = data?.history.reverse();
      // setWord(docInfo.data() as IWordType);
      setWord({ ...data, id });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error getting doc info", error);
      present("Some error occured while getting the Word !  ", 2000).then(
        () => {
          history.goBack();
        }
      );
    }
  };

  const deleteData = async (id: string) => {
    console.log("deletedata", Word);
    setDeleteLoading(true);
    try {
      await deleteDoc(doc(firebaseFireStoreDB, "words", id));
      setDeleteLoading(false);
      history.goBack();
    } catch (error) {
      present("Some error occured while deleting the Word !  ", 2000);
      console.log("word delete failed", error);
      setDeleteLoading(false);
    }
  };

  const reviewWord = async (id: string) => {
    console.log("review word");
    setReviewLoading(true);
    try {
      const currentDoc = doc(firebaseFireStoreDB, "words", id);
      await updateDoc(currentDoc, {
        ...Word,
        success: 0,
      });
      setReviewLoading(false);
      console.log("word added to review list again");
      present("word added to review list again !  ", 2000);

      history.goBack();
    } catch (error) {
      present(
        "Some error occured while adding the Word to review list !  ",
        2000
      );

      setReviewLoading(false);
      console.log("error in review word", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word info 🔎</IonTitle>
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
            <IonList>
              <IonItemSliding>
                <IonItem>
                  <IonLabel>
                    <IonListHeader>
                      <IonLabel>
                        <h1>{Word?.word}</h1>
                        <h2>{Word?.translate}</h2>
                      </IonLabel>
                    </IonListHeader>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => {
                      Word && deleteData(Word.id);
                    }}
                  >
                    {deleteLoading ? (
                      <IonSpinner />
                    ) : (
                      <IonIcon icon={trashBinOutline}></IonIcon>
                    )}
                  </IonItemOption>
                  <IonItemOption
                    color="tertiary"
                    onClick={() => {
                      Word && history.push(`/edit-word/${Word.id}`);
                    }}
                  >
                    <IonIcon icon={pencil}></IonIcon>
                  </IonItemOption>
                  <IonItemOption
                    color="success"
                    onClick={() => {
                      Word && reviewWord(Word.id);
                    }}
                  >
                    {reviewLoading ? (
                      <IonSpinner />
                    ) : (
                      <IonIcon icon={arrowUndoCircle}></IonIcon>
                    )}
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>

              <IonItemDivider>
                <IonListHeader>
                  <h3>History </h3>
                </IonListHeader>
              </IonItemDivider>

              {Word?.history.map((item: IWordHistory) => {
                return (
                  <IonItem>
                    <IonLabel>
                      <span className={classes["word-status-item"]}>
                        {item.status === EAnswerStatus.IKnow ? (
                          <IonIcon color="success" icon={checkmarkCircle} />
                        ) : (
                          <IonIcon color="danger" icon={closeCircle} />
                        )}
                      </span>
                      {"  "}
                      {new Date(item.issuedAt).toLocaleString()}
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WordInfo;
