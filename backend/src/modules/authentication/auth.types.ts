
export interface ClientFilterType { 
    client_code :string;
    secret :string;
}

export interface JWTResponse { 
    access_token :string;
    refresh_token :string;
    token_type :string;
    expiresIn :number;
}
