import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { IWordType } from "../../Types/app.types";

const WordReviewer: React.FC<{ word: IWordType }> = ({ word }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Flash cards</IonCardTitle>

        <IonCardSubtitle>All words : 22 - learend words : 33</IonCardSubtitle>
        {/* <IonCardSubtitle>
              <IonIcon color="success" icon={checkmarkCircle}></IonIcon>
              <IonIcon color="danger" icon={closeCircle}></IonIcon>
              <IonIcon color="primary" icon={caretForwardCircle}></IonIcon>
              learend words : 33
            </IonCardSubtitle> */}
      </IonCardHeader>

      <IonCardContent>{word.word}</IonCardContent>
    </IonCard>
  );
};

export default WordReviewer;
