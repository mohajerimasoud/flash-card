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
} from "@ionic/react";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firebaseAuth, firebaseFireStoreDB } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router";
import { EContentType, IWordType } from "../../Types/app.types";
import WordReviewer from "../../components/WordReviewer/WordReviewer";

import classes from "../../styles.module.css";

const Review: React.FC = () => {
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
        history.push("/login");
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
          orderBy("createdDate", "asc")
        );
      } else {
        q = query(
          collection(firebaseFireStoreDB, "words"),
          where("user", "==", Id),
          where("success", "<", 8),
          orderBy("success"),
          orderBy("createdDate", "asc")
          //       startAfter(lastVisible),
          // limit(25)
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
