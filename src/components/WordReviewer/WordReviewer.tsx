import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import {
  caretForwardCircle,
  checkmarkCircle,
  closeCircle,
} from "ionicons/icons";
import React, { useState } from "react";
import { IWordType } from "../../Types/app.types";

const WordReviewer: React.FC<{ word: IWordType }> = ({ word }) => {
  const [ShowTranslate, setShowTranslate] = useState<boolean>(false);

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
          <IonIcon color="success" icon={checkmarkCircle} />
          {word.success}
          <IonIcon color="danger" icon={closeCircle} style={{ fontSize: 22 }} />
          {word.failer}
          <IonIcon color="primary" icon={caretForwardCircle} />
          {word.history.length}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButtons>
          <IonButton fill="solid" color={"success"}>
            I know it
          </IonButton>
          <IonButton fill="solid" color={"danger"}>
            I don't know
          </IonButton>
        </IonButtons>
      </IonCardContent>
    </IonCard>
  );
};

export default WordReviewer;
