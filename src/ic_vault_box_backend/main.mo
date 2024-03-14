import Hex "utils/Hex";
import Types "type";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";

// import Type "type";

shared ({ caller }) actor class Vault() {

  type Manager = Types.Manager;
  type Credentials = Types.Credentials;

  var credentials : Buffer.Buffer<Credentials> = Buffer.Buffer(0);
  var manager : Buffer.Buffer<Manager> = Buffer.Buffer(0);

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  public func initialize(email : Text, password : Text) : async Result.Result<Text, Text> {
    if (password.size() < 10) {
      return #err("must be more than ");
    };
    // credentials.put({
    //   email = email;
    //   password = password;
    // })
    #ok("Works i suppose");
  };

  func createPayload(site_name : Text, website : Text, username : ?Text, email :?Text, password : Text) : async (){

  };

  public func uploadPayload(site_name : Text, website : Text, username : ?Text, email :?Text, password : Text) : async () {

  };

  public func updatePayload() : async () {

  };

  public func updateCredentials() : async () {

  };


};
