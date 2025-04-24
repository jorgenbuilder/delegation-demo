import { IDL } from "@dfinity/candid";

export const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  return IDL.Service({
    get: IDL.Func([], [IDL.Nat], []),
    increment: IDL.Func([], [IDL.Nat], []),
    reset: IDL.Func([], [], []),
  });
};
