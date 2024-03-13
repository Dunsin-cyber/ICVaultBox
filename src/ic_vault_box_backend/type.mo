module {

    public type Credentials = {
        email : Text;
        password : Text;
        
    };

    public type Manager = {
        site_name : Text;
        website : Text;
        password : Text;
        password_updated : Bool;
        last_updated : Text;
    }
}