import { CF_HOST } from "@/configs";
import Cookie from "@/utils/cookie";
import { Database } from "bun:sqlite";

const db = new Database("cookies.sqlite");

db.exec(
  "CREATE TABLE IF NOT EXISTS cookies (domain TEXT UNIQUE, cookie TEXT, agent TEXT)"
);

export async function cfCookie(url: string) {
  const { hostname } = new URL(url);

  const query = db.query("select * from cookies where domain = $domain");
  const cookie = query.get({ $domain: hostname });

  if (cookie) {
    return {
      proxy: CF_HOST + ":8080",
      headers: {
        "User-Agent": cookie.agent,
        Cookie: new Cookie(JSON.parse(cookie.cookie)).toString(),
      },
    };
  }

  const response = await fetch(CF_HOST + ":3000", {
    method: "POST",
    body: JSON.stringify({ url: url, mode: "waf" }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok || response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  // const cfClearance = (data?.cookies || []).find(
  //   ({ name }: any) => name === "cf_clearance"
  // );

  if (!data?.cookies?.length) {
    throw new Error(data?.message || "Bypass không thành công.");
  }

  db.query(
    "insert into cookies (domain, cookie, agent) values ($domain, $cookie, $agent)"
  ).run({
    $domain: hostname,
    $agent: data.agent,
    $cookie: JSON.stringify(data.cookies),
  });

  return {
    proxy: CF_HOST + ":8080",
    headers: {
      "User-Agent": data.agent,
      Cookie: new Cookie(data.cookies).toString(),
    },
  };
}
