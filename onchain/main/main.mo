import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";

actor Counter {
  stable var count : Nat = 0;

  public shared ({ caller }) func increment() : async Nat {
    Debug.print("increment called by: " # Principal.toText(caller));
    count += 1;
    count;
  };

  public query ({ caller }) func get() : async Nat {
    Debug.print("get called by: " # Principal.toText(caller));
    count;
  };

  public shared ({ caller }) func reset() : async () {
    Debug.print("reset called by: " # Principal.toText(caller));
    count := 0;
  };
};
