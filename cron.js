const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { setDoc, doc } = require("firebase/firestore");
admin.initializeApp();

exports.deleteOldData = functions.pubsub
  .schedule("every 24 hours")
  .onRun((context) => {
    const db = admin.firestore();
    const currentDate = new Date();
    // const cutoffDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    const cutoffDate = new Date(currentDate.getTime() - 60 * 1000);
    const collectionRef = db.collection("events");
    const queryRef = collectionRef.where("createdAt", "<", cutoffDate);
    setDoc(doc(db, "users", "new"), { capital: true }, { merge: true });

    return queryRef.get().then((querySnapshot) => {
      const batch = db.batch();
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    });
  });
