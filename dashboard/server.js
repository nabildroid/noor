const fs = require("fs");
const os = require("os");
const path = require("path");
const {PubSub} = require('@google-cloud/pubsub');

const Express = require("express");

const admin = require("firebase-admin");
const isDev = process.env.NODE_ENV == "development";
const firebaseConfig = isDev
  ? {
      credential: admin.credential.cert(require("./serviceAccount.json")),
    }
  : null;
const firebaseApp = admin.initializeApp(firebaseConfig);




const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp
  .storage()
  .bucket("gs://formal-ember-345513.appspot.com");


var cors = require("cors");

const PORT = process.env.PORT || 5050;

const app = Express();
app.use(Express.json());

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
      password: data.password ?? "------",
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

  await auth.setCustomUserClaims(id, {
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

  await auth.setCustomUserClaims(id, {
    try: pro,
  });
  res.send("ok");
});



const prefix = "builder/";



app.get("/api/html", async (_, res) => {
  const [files] = await storage.getFiles({ prefix });
  const recent = files.pop();

  let [data] = await recent.download();
  data = data.toString();
  data = JSON.parse(data);

  return res.send(data);
});



const pubsub = new PubSub({
  projectId:firebaseApp.options.projectId,
});




app.post("/api/html", async (req, res) => {
  const topic = await pubsub.createTopic("build_landing_page");
  
  console.log(req.body);
  const tempDir = os.tmpdir();
  const name = Date.now() + ".ikm";

  const p = path.join(tempDir, name);
  fs.writeFileSync(p, JSON.stringify(req.body));

  await storage.upload(p, {
    destination: path.join(prefix, name),
  });

  topic[0].publishMessage("build");
  
  res.send("done");
});





app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});



