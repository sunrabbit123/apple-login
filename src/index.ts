import { JwtPayload, verify } from "jsonwebtoken";
import got from "got";
import NodeRSA from "node-rsa";

import { AppleAuthKeyType, AppleIdTokenType } from "./types";
const APPLE_ENDPOINT_URL = "https://appleid.apple.com";

const getApplePublicKey = async (): Promise<{ [kid: string]: string }> => {
  const parsingURL = APPLE_ENDPOINT_URL + "/auth/keys";

  const { keys } = await got
    .get(parsingURL)
    .json<{ keys: AppleAuthKeyType[] }>();

  let APPLE_KEY: { [kid: string]: string } = {};
  keys.map((key) => {
    const publicKey = new NodeRSA();
    publicKey.importKey(
      {
        n: Buffer.from(key.n, "base64"),
        e: Buffer.from(key.e, "base64"),
      },
      "components-public",
    );

    APPLE_KEY[key.kid] = publicKey.exportKey("public");
  });
  return APPLE_KEY;
};
const getAppleIdTokenPublicKey = async (kid: string): Promise<string> => {
  const APPLE_KEY = await getApplePublicKey();

  return APPLE_KEY[kid];
};

export const verifyIdToken = async (
  idToken: string,
  options: Object = {},
): Promise<AppleIdTokenType> => {
  const header = JSON.parse(
    Buffer.from(idToken.split(".")[0], "base64").toString(),
  );
  const data = verify(idToken, await getAppleIdTokenPublicKey(header.kid), {
    algorithms: ["RS256"],
    issuer: APPLE_ENDPOINT_URL,
    ...options,
  }) as JwtPayload;

  return data as AppleIdTokenType;
};

verifyIdToken("").then((v) => console.log(v));
