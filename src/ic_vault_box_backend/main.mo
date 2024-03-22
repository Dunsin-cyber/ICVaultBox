import Hex "utils/Hex";
import Types "type";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";

// import Type "type";

shared ({ caller }) actor class Vault() {

  type Manager = Types.Manager;
  type Credentials = Types.Credentials;


  private stable var _credentials : [(Text, Credentials)] = [];
  private stable var _manager : [(Text, Manager)] = [];


  var credentials : Buffer.Buffer<Credentials> = Buffer.Buffer(0);
  var manager : Buffer.Buffer<Manager> = Buffer.Buffer(0);


  var Credentials : HashMap.HashMap<Text, Credentials> = HashMap.fromIter<Text, Credentials>(_credentials.vals(), 1, Text.equal, Text.hash);
  var Manager : HashMap.HashMap<Text, Manager> = HashMap.fromIter<Text, Manager>(_manager.vals(), 1, Text.equal, Text.hash);



  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

// public query ({caller}) func getPrincipal () : async Principal {
//   caller
// };

  public shared query ({ caller }) func CheckPrincipal() : async Principal {
    caller;
  };
  public func initialize(email : Text, password : Text) : async Result.Result<Text, Text> {
    if (password.size() < 10) {
      return #err("must be more than ");
    };
    credentials.add(
      await createCredentials(
        email,
        password,
      )
    );
    #ok("Works i suppose");
  };

  func createCredentials(email : Text, password : Text) : async Credentials {
    {
      email;
      password;
    };
  };

  func createPayload(site_name : Text, website : Text, username : ?Text, email : ?Text, password : Text, password_updated : Bool, last_updated : ?Int, owner:Principal) : async Manager {
    {
      site_name;
      website;
      username;
      email;
      password;
      password_updated;
      last_updated;
      owner;
    };
  };

  public shared ({ caller }) func uploadPayload(site_name : Text, website : Text, username : ?Text, email : ?Text, password : Text) : async () {
    manager.add(await createPayload(site_name, website, username, email, password, false, null, caller));
    if (email != null) {
      switch (email){
        case (null){};
        case(?email){
          Manager.put(email, await createPayload(site_name, website, username, ?email, password, false, null, caller));
          // let encryption_payload = website # email # password;
        }
      }
    };
    switch(username) {
      case(null) {};
      case(?username) { 
        Manager.put(username, await createPayload(site_name, website, ?username, email, password, false, null, caller));
      };
    };
     
    
  };

  public shared query ({caller}) func getPayload (): async [Manager] {
    var val = Buffer.Buffer<Manager>(0);
    for ((i, j) in Manager.entries()) {
      if ((j.owner == caller)) {
            val.add(j);
      };
    };
    val.toArray();
  };

  // public func updatePayload(email : ?Text, username : ?Text, password : Text) : async Result.Result<(), Text> {
  //   for (payload in manager.vals()) {
  //     if ((payload.email == email) and (payload.password == password)) {
  //       return #ok(await uploadPayload(
  //         payload.site_name,
  //         payload.website,
  //         username,
  //         email,
  //         payload.password
  //       ))
  //     };
  //   };
  // };

  type VETKD_SYSTEM_API = actor {
        vetkd_public_key : ({
            canister_id : ?Principal;
            derivation_path : [Blob];
            key_id : { curve : { #bls12_381 }; name : Text };
        }) -> async ({ public_key : Blob });
        vetkd_encrypted_key : ({
            public_key_derivation_path : [Blob];
            derivation_id : Blob;
            key_id : { curve : { #bls12_381 }; name : Text };
            encryption_public_key : Blob;
        }) -> async ({ encrypted_key : Blob });
    };

    // let vetkd_system_api : VETKD_SYSTEM_API = actor ("s55qq-oqaaa-aaaaa-aaakq-cai");
     let vetkd_system_api : VETKD_SYSTEM_API = actor ("be2us-64aaa-aaaaa-qaabq-cai");

    public shared ({ caller }) func app_vetkd_public_key(derivation_path : [Blob]) : async Text {
        let { public_key } = await vetkd_system_api.vetkd_public_key({
            canister_id = null;
            derivation_path;
            key_id = { curve = #bls12_381; name = "test_key_1" };
        });
        Hex.encode(Blob.toArray(public_key));
    };

    public shared ({ caller }) func symmetric_key_verification_key() : async Text {
        let { public_key } = await vetkd_system_api.vetkd_public_key({
            canister_id = null;
            derivation_path = Array.make(Text.encodeUtf8("vault_symmetric_key"));
            key_id = { curve = #bls12_381; name = "test_key_1" };
        });
        Hex.encode(Blob.toArray(public_key));
    };

    public shared ({ caller }) func encrypted_symmetric_key_for_vault(encryption_public_key : Blob) : async Text {
        Debug.print("encrypted_symmetric_key_for_caller: caller: " # debug_show (caller));
        // let _caller = Principal.toText(caller);

        // let (?payload)= Manager.get(email) else Debug.trap("payload not found");
        // let encoded_payload = Text.encodeUtf8(_caller # email # payload.website # payload.password);
        let { encrypted_key } = await vetkd_system_api.vetkd_encrypted_key({
            // derivation_id = encoded_payload;
             derivation_id = Principal.toBlob(caller);
            public_key_derivation_path = Array.make(Text.encodeUtf8("vault_symmetric_key"));
            key_id = { curve = #bls12_381; name = "test_key_1" };
            encryption_public_key;
        });
        Hex.encode(Blob.toArray(encrypted_key));
    };

    // Converts a nat to a fixed-size big-endian byte (Nat8) array
    func natToBigEndianByteArray(len : Nat, n : Nat) : [Nat8] {
        let ith_byte = func(i : Nat) : Nat8 {
            assert (i < len);
            let shift : Nat = 8 * (len - 1 - i);
            Nat8.fromIntWrap(n / 2 ** shift);
        };
        Array.tabulate<Nat8>(len, ith_byte);
    };

    public shared ({ caller }) func ibe_encryption_key() : async Text {
        let { public_key } = await vetkd_system_api.vetkd_public_key({
            canister_id = null;
            derivation_path = Array.make(Text.encodeUtf8("ibe_encryption"));
            key_id = { curve = #bls12_381; name = "test_key_1" };
        });
        Hex.encode(Blob.toArray(public_key));
    };

    public shared ({ caller }) func encrypted_ibe_decryption_key_for_caller(email : Text, encryption_public_key : Blob) : async Text {
        Debug.print("encrypted_ibe_decryption_key_for_caller: caller: " # debug_show (caller));

        let _caller = Principal.toText(caller);

        let (?payload)= Manager.get(email) else Debug.trap("payload not found");

        let encoded_payload = Text.encodeUtf8(_caller # email # payload.website # payload.password);

        let { encrypted_key } = await vetkd_system_api.vetkd_encrypted_key({
            derivation_id = encoded_payload;
            public_key_derivation_path = Array.make(Text.encodeUtf8("ibe_encryption"));
            key_id = { curve = #bls12_381; name = "test_key_1" };
            encryption_public_key;
        });
        Hex.encode(Blob.toArray(encrypted_key));
    };

  public func updateCredentials() : async () {

  };

};
