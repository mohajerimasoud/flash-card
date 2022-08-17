import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSpinner,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { EAnswerStatus, IWordType } from "../../Types/app.types";
import classes from "../../styles.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseFireStoreDB } from "../../firebase/config";
import { useHistory } from "react-router";

const WordReviewer: React.FC<{
  word: IWordType;
  deleteWordFromState: (id: string) => void;
}> = ({ word, deleteWordFromState }) => {
  const [ShowTranslate, setShowTranslate] = useState<boolean>(false);
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const updateDocument = async (status: EAnswerStatus) => {
    setLoading(true);
    try {
      const currentDoc = doc(firebaseFireStoreDB, "words", word.id);
      await updateDoc(currentDoc, {
        ...word,
        lastIssuedAt: Date.now(),
        ...(status === EAnswerStatus.IKnow && {
          success: word.success + 1 > 8 ? 8 : word.success + 1,
          history: [...word.history, { status: status, issuedAt: Date.now() }],
          reviewState: word.success + 1 !== 8,
        }),
        ...(status === EAnswerStatus.IDonntKnow && {
          failer: word.failer + 1,
          success: 0,
          history: [...word.history, { status: status, issuedAt: Date.now() }],
        }),
      });
      deleteWordFromState(word.id);
    } catch (error) {
      console.log("error in change status of word", error);
      setLoading(false);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{word.word}</IonCardTitle>

        <IonCardSubtitle>
          {ShowTranslate ? (
            <IonText color="dark" onClick={() => setShowTranslate(false)}>
              <p>{word.translate}</p>
            </IonText>
          ) : (
            <IonButton
              onClick={() => setShowTranslate(true)}
              fill="clear"
              expand="block"
            >
              Show Translation
            </IonButton>
          )}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButtons>
          {Loading ? (
            <IonSpinner />
          ) : (
            <>
              <IonButton
                className={classes["word-button"]}
                onClick={updateDocument.bind(null, EAnswerStatus.IKnow)}
                fill="solid"
                color="success"
              >
                I know ( {word.success} )
              </IonButton>
              <IonButton
                className={classes["word-button"]}
                onClick={updateDocument.bind(null, EAnswerStatus.IDonntKnow)}
                fill="solid"
                color="danger"
              >
                Idk ( {word.failer} )
              </IonButton>
              <IonButton
                className={classes["word-button"]}
                onClick={() => history.push(`/word-info/${word.id}`)}
                fill="solid"
                color="tertiary"
              >
                Info ( {word.history.length} )
              </IonButton>
            </>
          )}
        </IonButtons>
      </IonCardContent>
    </IonCard>
  );
};

export default WordReviewer;
