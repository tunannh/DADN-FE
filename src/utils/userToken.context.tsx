import { createContext, useContext, useState } from "react";

interface IUserTokenType {
    access_token: string;
    set_access_token: (val: string) => void;
    token_type: string;
    set_token_type: (val: string) => void;
}
const UserTokenContext = createContext<IUserTokenType | null>(null);

export const useUserTokenContext = () => {
    const currentUserTokenContext = useContext(UserTokenContext);
    if (!currentUserTokenContext) {
        throw new Error("useUserTokenContext must be used within a UserTokenProvider");
    }

    return currentUserTokenContext;
}

interface Iprops {
    children: React.ReactNode;
}
const UserTokenProvider = (props: Iprops) => {
    const [access_token, set_access_token] = useState<string>("");
    const [token_type, set_token_type] = useState<string>("");
    return (
        <UserTokenContext.Provider value={{ access_token, set_access_token, token_type, set_token_type }}>
            {props.children}
        </UserTokenContext.Provider>
    )
}

export default UserTokenProvider;