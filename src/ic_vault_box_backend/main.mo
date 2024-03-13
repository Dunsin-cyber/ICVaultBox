import Hex "utils/Hex";
import Types "type";

actor {

  

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };


};
