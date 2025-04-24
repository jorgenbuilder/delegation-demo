import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import { PublicKey } from "@dfinity/agent";
import { DelegationChain, DelegationIdentity } from "@dfinity/identity";

export function getIdentityAPI() {
  const privateKeyBase64 = process.env.API_PRIVATE_KEY!;
  const privateKeyBytes = Uint8Array.from(
    Buffer.from(privateKeyBase64, "base64")
  );
  return Secp256k1KeyIdentity.fromSecretKey(privateKeyBytes.buffer);
}

export function getIdentityClient() {
  const privateKeyBase64 = process.env.NEXT_PUBLIC_CLIENT_PRIVATE_KEY!;
  const privateKeyBytes = Uint8Array.from(
    Buffer.from(privateKeyBase64, "base64")
  );
  return Secp256k1KeyIdentity.fromSecretKey(privateKeyBytes.buffer);
}

export async function createDelegationChain(toPublicKey: PublicKey) {
  const clientIdentity = getIdentityClient();

  // Create a delegation chain that lasts for 30 days
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const delegationChain = await DelegationChain.create(
    clientIdentity,
    toPublicKey,
    expirationDate
  );

  return {
    delegationChain,
  };
}

export function serializeDelegationChain(
  delegationChain: DelegationChain
): string {
  return JSON.stringify(delegationChain.toJSON());
}

export function deserializeDelegationChain(
  serialized: string
): DelegationChain {
  const json = JSON.parse(serialized);
  return DelegationChain.fromJSON(json);
}

export async function createDelegationIdentityFromChain(
  serializedChain: string
) {
  const apiIdentity = getIdentityAPI();
  const delegationChain = deserializeDelegationChain(serializedChain);

  return DelegationIdentity.fromDelegation(apiIdentity, delegationChain);
}
