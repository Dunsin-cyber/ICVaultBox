import Principal "mo:base/Principal";
module {

    public type Credentials = {
        email : Text;
        password : Text;

    };

    public type Manager = {
        site_name : Text;
        website : Text;
        username : ?Text;
        email : ?Text;
        password : Text;
        password_updated : Bool;
        last_updated : ?Int;
        owner:Principal;
    };

}