module {

    public type Credentials = {
        email : Text;
        password : Text;

    };

    public type Manager = {
        site_name : Text;
        caller : Principal;
        website : Text;
        username : ?Text;
        email : ?Text;
        password : Text;
        password_updated : Bool;
        last_updated : ?Int;
    }
}