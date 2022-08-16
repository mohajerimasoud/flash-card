import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import {
  caretForwardCircle,
  checkmarkCircle,
  closeCircle,
} from "ionicons/icons";
import React, { useState } from "react";
import { EAnswerStatus, IWordType } from "../../Types/app.types";

import { doc, updateDoc } from "firebase/firestore";
import { firebaseFireStoreDB } from "../../firebase/config";
import { async } from "@firebase/util";

const WordReviewer: React.FC<{
  word: IWordType;
  deleteWordFromState: (id: string) => void;
}> = ({ word, deleteWordFromState }) => {
  const [ShowTranslate, setShowTranslate] = useState<boolean>(false);
  const [Loading, setLoading] = useState(false);

  const updateDocument = async (status: EAnswerStatus) => {
    setLoading(true);
    try {
      //
      const currentDoc = doc(firebaseFireStoreDB, "words", word.id);
      await updateDoc(currentDoc, {
        ...word,
        lastIssuedAt: Date.now(),
        ...(status === EAnswerStatus.IKnow && {
          success: word.success + 1,
          history: [...word.history, { status: status, issuedAt: Date.now() }],
        }),
        ...(status === EAnswerStatus.IDonntKnow && {
          failer: word.failer + 1,
          success: word.success > 0 ? word.success - 1 : 0,
          history: [...word.history, { status: status, issuedAt: Date.now() }],
        }),
      });
      //
      console.log("update success");
      deleteWordFromState(word.id);
      // setLoading(false);
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
            word.translate
          ) : (
            <IonButton onClick={() => setShowTranslate(true)} fill="clear">
              Show Translation
            </IonButton>
          )}
        </IonCardSubtitle>
        <IonCardSubtitle>
          <span>
            <IonIcon color="success" icon={checkmarkCircle} />
            {word.success}
          </span>
          <span>
            <IonIcon
              color="danger"
              icon={closeCircle}
              style={{ fontSize: 22 }}
            />
            {word.failer}
          </span>
          <span>
            <IonIcon color="primary" icon={caretForwardCircle} />
            {word.history.length}
          </span>
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButtons>
          <IonButton
            onClick={updateDocument.bind(null, EAnswerStatus.IKnow)}
            fill="solid"
            color={"success"}
          >
            I know it
          </IonButton>
          <IonButton
            onClick={updateDocument.bind(null, EAnswerStatus.IDonntKnow)}
            fill="solid"
            color={"danger"}
          >
            I don't know
          </IonButton>
        </IonButtons>
        {Loading && <IonSpinner />}
      </IonCardContent>
    </IonCard>
  );
};

export default WordReviewer;
