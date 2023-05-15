'use client'

import { IUser, RoleEnum } from "@centrin/types/User/User";
import { generateToken } from "@centrin/utils/auth";
import { setToken } from "@centrin/utils/cookies";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const handleClick = async () => {
        console.log("Login clicked");
        const user: IUser = {
            id: 1,
            name: "Test",
            surname: "Admin",
            displayName: "Test Admin",
            roles: [RoleEnum.ADMIN]
        };
        const token = await generateToken(user)
        setToken(token);

        router.push("/");
    };

    return (
        <div>
        <h1>Login</h1>
        <button onClick={handleClick}>Login</button>
        </div>
    );
};

export default LoginPage;