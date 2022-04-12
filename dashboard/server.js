const Express = require("express");
const admin = require("firebase-admin");

const firebaseApp = admin.initializeApp({
  projectId: "noor-a4a7d",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

var cors = require("cors");

const PORT = process.env.PORT || 5050;

const app = Express();

app.use(cors());

app.use(Express.static("public"));

function checkIsPro(trying) {
  return trying - Date.now() > 100000000000;
}
app.get("/api/users", async (req, res) => {
  const userDocs = await db.collection("/users").get();

  const teachers = userDocs.docs.map((doc) => {
    const data = doc.data();

    return {
      created: doc.createTime.toDate(),
      id: doc.id,
      isPro: checkIsPro(data.try),
      name: data.name,
      uid: data.username,
      password: "password",
    };
  });

  res.json(teachers);
});

app.delete("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  await auth.deleteUser(id);
  await db.collection("users").doc(id).delete();
  res.send("ok");

});

app.post("/api/free/:id", async (req, res) => {
  const free = 10000000;
  const { id } = req.params;
  await db.collection("users").doc(id).update({
    try: free,
  });

  await auth.setCustomUserClaims(uid, {
    try: free,
  });

  res.send("ok");
});

app.post("/api/pro/:id", async (req, res) => {
  const pro = 100000000000000;
  const { id } = req.params;
  await db.collection("users").doc(id).update({
    try: pro,
  });

  await auth.setCustomUserClaims(uid, {
    try: pro,
  });
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
