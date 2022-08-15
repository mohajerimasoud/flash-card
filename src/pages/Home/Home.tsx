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
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addCircleSharp,
  caretDown,
  caretForward,
  caretForwardCircle,
  checkmarkCircle,
  checkmarkCircleOutline,
  closeCircle,
  closeCircleOutline,
  ticketOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
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
              <IonButton fill="solid">All words</IonButton>
              <IonButton fill="solid">Review session</IonButton>
            </IonButtons>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
