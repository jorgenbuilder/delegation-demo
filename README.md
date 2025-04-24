This is a minimal example of how to delegate a user's identity from your client application to your api, so that your api can make a call using that user's identity.

This pattern is useful for many cases when you want to move compute to the server for caching, process stability and so on, while maintaining caller based access control.

```mermaid
sequenceDiagram
participant React as React App
participant API
participant Canister

title Delegate an identity from your client to your API

React ->> API: Request Public Key
API -->> React: Public Key

note over React: Generate delegation chain

React ->> Canister: Call

note over Canister: Caller = React App

React ->> API: Call with delegation
API ->> Canister: Call as React App

note over Canister: Same caller!
```

## Getting Started

This demo uses a simple canister and a nextjs app that handles both the api and the web application.

```bash
dfx start &
dfx deploy
npm run dev
```
