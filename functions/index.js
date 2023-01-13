const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

exports.validateNewUser = functions
  .region("europe-west1")
  .auth.user()
  .beforeCreate((user, context) => {
    const usersCollection = db.collection("users");
    let notAuthorized = true;
    usersCollection
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          const documentUser = document.data;
          notAuthorized &= documentUser.email !== user.email;
        });
        if (notAuthorized) {
          throw new functions.auth.HttpsError("permission-denied");
        }
      })
      .catch((error) => {
        throw new functions.auth.HttpsError("Error Getting Documents", error);
      });
  });
