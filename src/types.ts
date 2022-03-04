import { JwtPayload } from "jsonwebtoken";

export interface AppleIdTokenType extends JwtPayload {
  /** issuer */
  iss: string;
  /** The unique identifier for the user. */
  sub: string;
  /** Your client_id in your Apple Developer account. */
  aud: string;
  /** The expiry time for the token. This value is typically set to five minutes. */
  exp: number;
  /** The time the token was issued. */
  iat: number;
  /** A String value used to associate a client session and an ID token. This value is used to mitigate replay attacks and is present only if passed during the authorization request. */
  nonce: string;
  /** A Boolean value that indicates whether the transaction is on a nonce-supported platform. If you sent a nonce in the authorization request but do not see the nonce claim in the ID token, check this claim to determine how to proceed. If this claim returns true you should treat nonce as mandatory and fail the transaction; otherwise, you can proceed treating the nonce as optional. */
  nonce_supported: boolean;
  /** user email */
  email: string;
  /** A String or Boolean value that indicates whether the service has verified the email. The value of this claim is always true because the servers only return verified email addresses. */
  email_verified: "true" | "false" | boolean;
  /** A String or Boolean value that indicates whether the email shared by the user is the proxy address. */
  is_private_email: "true" | "false" | boolean;
  c_hash?: string;
  auth_time?: number;
  real_user_status?: number;
}

export interface AppleTokenResponseType {
  /** THe token used to access allowed data */
  access_token: string;
  expires_in: number;
  /** A JSON Web Token that contains user's information(AppleIdTokenType) */
  id_token: string;
  /** used to regenerate new access token */
  refresh_token: string;

  /** It will always be Bearer */
  token_type: "Bearer";
}

export type VerifyIdTokenOption = Partial<AppleIdTokenType>;

export interface AppleAuthKeyType {
  kty: string;
  kid: string;
  use: string;
  alg: "RS256";
  n: string;
  e: string;
}
