'use client';

import { User } from "@centrin/types/User/User";
import { createContext, useState } from "react";

export interface IUserContextValue {
    readonly user : User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<IUserContextValue>({
    user: null,
    setUser: () => {},
});

export const UserProvider: React.FC = ({children}: any) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;