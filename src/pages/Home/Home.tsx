import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircleSharp } from "ionicons/icons";
import { useHistory } from "react-router";
import { EContentType } from "../../Types/app.types";
import classes from "../../styles.module.css";

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
          </IonCardHeader>

          <IonCardContent>
            <IonButtons>
              <IonButton
                className={classes["half-button"]}
                fill="solid"
                onClick={() => {
                  history.push(`/review?content=${EContentType.ALL}`);
                }}
              >
                All words
              </IonButton>
              <IonButton
                className={classes["half-button"]}
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

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Performence analytics</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="solid" color={"danger"} expand="block">
              Comming soon ....
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Profile sync</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="solid" color={"tertiary"} expand="block">
              Comming soon ....
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Batch import and categories</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="solid" color={"secondary"} expand="block">
              Comming soon ....
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Profile sync</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton fill="solid" color={"success"} expand="block">
              Comming soon ....
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
