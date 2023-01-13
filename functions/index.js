const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.validateNewUser = functions
  .region("europe-west1")
  .auth.user()
  .beforeCreate((user, context) => {
    // const usersCollection = db.collection("users");
    // let notAuthorized = true;
    // usersCollection
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((document) => {
    //       const userDocument = document.data;
    //       notAuthorized &= userDocument.email !== user.email;
    //       if (!notAuthorized) admin.auth().createUser(user);
    //     });
    //     if (notAuthorized) {
    //       admin.auth().deleteUser(user.uid);
    //       throw new functions.auth.HttpsError("permission-denied");
    //     }
    //   })
    //   .catch((error) => {
    //     throw new functions.auth.HttpsError("permission-denied");
    //   });
  });

exports.addAccount = functions
  .region("europe-west1")
  .firestore.document("accounts/{docId}")
  .onCreate((snap, context) => {
    const collectionName = "helper_data";
    const documentData = snap.data();
    const { englishName, arabicName, type, taxNumber, number } = documentData;
    const documentRef = db.collection(collectionName).doc(`${type}s`);
    documentRef.get().then((document) => {
      const newAccounts = document.data().data;
      newAccounts.push({
        englishName,
        arabicName,
        taxNumber,
        number,
        doc_id: snap.id,
      });
      return documentRef.set({ data: newAccounts, count: newAccounts.length });
    });
  });

exports.removeAccount = functions
  .region("europe-west1")
  .firestore.document("accounts/{docId}")
  .onDelete((snap, context) => {
    const collectionName = "helper_data";
    const documentData = snap.data();
    const { type } = documentData;
    const documentRef = db.collection(collectionName).doc(`${type}s`);
    documentRef.get().then((document) => {
      let newAccounts = document.data().data;
      newAccounts = newAccounts.filter((account) => account.doc_id !== snap.id);
      newAccounts = newAccounts.map((account, index) => ({
        ...account,
        number: index + 1,
      }));
      return documentRef.set({
        data: newAccounts,
        count: newAccounts.length,
      });
    });
  });
