import { weird } from "./types";

export function extractRoleId(str: string) {
  const right = str.split("','").pop() as string;
  const [left] = right.split("'");

  return left;
}

export function extractRoleIds(str: string) {
  const right = str.split("(").pop() as string;
  const [left] = right.split(")");

  return left.split(",").map((e) => e.replace(/'/g, ""));
}

export function hiddenInputs($: cheerio.Root) {
  const hiddens = $("input[type='hidden']");
  let params = {} as any;
  hiddens.map((_, e) => {
    const elm = e as any;
    params[elm.attribs.name] = elm.attribs.value;
  });

  return params as weird;
}

export function defaultHeader(cookies: string[]) {
  return {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    Cookie: cookies.join("; "),
  };
}



export function pageNameBase64(url:string){
  return Buffer.from(url.split("/").pop()!.split(".")[0]!).toString("base64");
}