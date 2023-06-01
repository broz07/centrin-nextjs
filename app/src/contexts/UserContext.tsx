'use client';

import { IUser } from "@centrin/types/user";
import { createContext, useState } from "react";

export interface IUserContextValue {
    readonly user : IUser | null;
    setUser: (user: IUser | null) => void;
}

const UserContext = createContext<IUserContextValue>({
    user: null,
    setUser: () => {},
});

export const UserProvider: React.FC = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;