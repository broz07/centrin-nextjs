'use client'

import { generateToken, login } from "@centrin/utils/auth";
import { setToken } from "@centrin/utils/cookies";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const handleClick = async () => {
        const user =  await login("admin", "admin");
        if (!user) {
            return;
        }
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