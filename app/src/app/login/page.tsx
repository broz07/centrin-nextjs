import LoginPage from "@centrin/components/login/LoginPage";
import { isLogged } from "@centrin/utils/auth";
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Přihlášení - Centrin',
    description: 'Přihlášení do informačního systému Centrin.',
  };

const Login = async () => {
    if (await isLogged()){
        redirect("/");
    }
    return <LoginPage />;
};

export default Login;