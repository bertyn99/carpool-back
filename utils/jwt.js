import { createSigner, createVerifier } from "fast-jwt";
//signer
const signerToken = createSigner({ expiresIn: 1000 * 60 * 1, key: "secret" }); //10 minutes
const signerRefreshToken = createSigner({
  expiresIn: 1000 * 60 * 60 * 24 * 7, //7 days
  key: "secret",
});
// Standard decoder
const decode = createVerifier({ key: "secret" });

export { signerToken, signerRefreshToken, decode };
