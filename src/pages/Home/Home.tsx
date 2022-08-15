import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addCircleSharp,
  caretForwardCircle,
  checkmarkCircle,
  closeCircle,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { EContentType } from "../../Types/app.types";
import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push("/add-word")}>
              <IonIcon icon={addCircleSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Flash cards</IonCardTitle>

            <IonCardSubtitle>
              All words : 22 - learend words : 33
            </IonCardSubtitle>
            <IonCardSubtitle>
              <IonIcon color="success" icon={checkmarkCircle}></IonIcon>
              <IonIcon color="danger" icon={closeCircle}></IonIcon>
              <IonIcon color="primary" icon={caretForwardCircle}></IonIcon>
              learend words : 33
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonButtons>
              <IonButton
                fill="solid"
                onClick={() => {
                  history.push(`/review?content=${EContentType.ALL}`);
                }}
              >
                All words
              </IonButton>
              <IonButton
                fill="solid"
                onClick={() => {
                  history.push(`/review?content=${EContentType.TO_REVIEW}`);
                }}
              >
                Review session
              </IonButton>
            </IonButtons>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
