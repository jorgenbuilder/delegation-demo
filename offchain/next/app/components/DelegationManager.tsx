"use client";

import { useState } from "react";
import {
  createDelegationChain,
  serializeDelegationChain,
  getIdentityClient,
} from "@/lib/identity";
import { Secp256k1PublicKey } from "@dfinity/identity-secp256k1";
import { createMainActor } from "@/lib/actors";
import { Button } from "@/components/ui/button";

export function DelegationManager() {
  const [status, setStatus] = useState<string>("");
  const clientIdentity = getIdentityClient();
  const mainActor = createMainActor(clientIdentity);

  const handleCreateAndSubmitDelegation = async () => {
    setStatus("Creating delegation chain...");

    const publicKeyResponse = await fetch("/api/identity");
    const publicKeyDer = await publicKeyResponse.text();
    const publicKeyBuffer = Uint8Array.from(
      Buffer.from(publicKeyDer, "base64")
    ).buffer;
    const publicKey = Secp256k1PublicKey.fromDer(publicKeyBuffer);
    // Create the delegation chain
    const { delegationChain } = await createDelegationChain(publicKey);

    // Serialize the delegation chain
    const serializedChain = serializeDelegationChain(delegationChain);

    // Submit to the API
    setStatus("Submitting delegation chain...");
    const response = await fetch("/api/delegation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delegationChain: serializedChain }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to submit delegation chain: ${response.statusText}`
      );
    }

    const data = await response.json();

    setStatus(`Created and submitted delegation chain: ${data.principal}`);
  };

  async function handleIncrement() {
    await mainActor.increment();
  }

  return (
    <div className="p-4">
      <button
        onClick={handleCreateAndSubmitDelegation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create and Submit Delegation Chain
      </button>

      <p className="mt-2">{clientIdentity.getPrincipal().toText()}</p>
      {status && <p className="mt-2 text-green-600">{status}</p>}

      <Button onClick={handleIncrement}>Increment</Button>
    </div>
  );
}
