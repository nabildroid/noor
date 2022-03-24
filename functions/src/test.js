const http = require("axios").default;
const { exec } = require("child_process");

const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const api = "http://localhost:5001/noor-a4a7d/us-central1";

const form = `${api}/signForm`;
const submit = `${api}/postSignForm`;

(async () => {
  const { data } = await http.get(form);
  let { cookies } = data;
  cookies = cookies
    .join(";")
    .split(";")
    .filter((e) => e)
    .reduce(
      (acc, v) => ({
        ...acc,
        [v.split("=")[0]]: v.split("=")[1],
      }),
      {}
    );
  cookies = {
    "ASP.NET_SessionId": cookies["ASP.NET_SessionId"],
    SameSite: "None",
    BIGipServerNoor_Production_http: cookies["BIGipServerNoor_Production_http"],
    ADRUM_BTa: cookies["ADRUM_BTa"],
  };

  cookies = Object.entries(cookies).reduce((acc,v)=>[...acc,`${v[0]}=${v[1]}`],[]);

  const img = Buffer.from(data.captcha,"base64");
  fs.writeFileSync("/tmp/test.png",img);
9  
  readline.question("please insert the captcha code\n", async (captcha) => {
    const inputs = {
      ...data.params,
      cookies,
      name: "1045011689",
      password: "12345fsh",
      captcha
    };


    const {data:status} = await http.post(submit,inputs);
    console.log(status);

    readline.close();
  });
})();
