import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firebaseAuth, firebaseFireStoreDB } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router";
import {
  EContentType,
  IWordType,
  miliSecondsOfOneDay,
} from "../../Types/app.types";
import WordReviewer from "../../components/WordReviewer/WordReviewer";

import classes from "../../styles.module.css";

const Review: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [present, dismiss] = useIonToast();
  const [userId, setUserId] = useState<string>();
  const [contentType, setContentType] = useState<EContentType>();
  const [words, setWords] = useState<IWordType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const getContentType = () => {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const contentType = (params.get("content") || "") as string;
    if (contentType in EContentType) {
      setContentType(contentType as EContentType);
    } else {
      setContentType(EContentType.ALL);
    }
  };

  useIonViewWillEnter(() => {
    if (userId) {
      getUserDocs(userId);
    }
  }, [userId]);

  useIonViewWillEnter(() => {
    getContentType();
    getUserID();
  }, []);

  useEffect(() => {
    getContentType();
    getUserID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userId && getUserDocs(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getUserID = async () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        present("You need to login ", 2000).then(() => {
          history.push("/login");
        });
        throw new Error("uid not found");
      }
    });
  };

  const getUserDocs = async (Id: string) => {
    try {
      let q: any;
      if (contentType === EContentType.ALL) {
        q = query(
          collection(firebaseFireStoreDB, "words"),
          where("user", "==", Id),
          orderBy("createdDate", "desc")
        );
      } else {
        q = query(
          collection(firebaseFireStoreDB, "words"),
          where("user", "==", Id),
          where("reviewState", "==", true),
          where("lastIssuedAt", "<", Date.now() - miliSecondsOfOneDay),
          orderBy("lastIssuedAt", "asc"),
          limit(20)
        );
      }
      const docs = await getDocs(q);

      const data = docs.docs.map((item: any) => {
        return {
          ...item.data(),
          id: item.id,
        };
      }) as IWordType[];
      setWords(data);
      setLoading(false);
      console.log("docs", data);
    } catch (error) {
      present("Error getting docs ", 2000);
      setLoading(false);
      console.log("error getting docs", error);
    }
  };
  const deleteWordFromState = (id: string) => {
    setWords((prev: IWordType[]) => {
      return prev.filter((word: IWordType) => {
        return word.id !== id;
      });
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>review</IonTitle>
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
          words.map((word: IWordType) => (
            <WordReviewer
              word={word}
              key={word.id}
              deleteWordFromState={deleteWordFromState}
            />
          ))
        )}{" "}
      </IonContent>
    </IonPage>
  );
};

export default Review;
