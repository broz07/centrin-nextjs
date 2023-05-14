import HomePage from "@centrin/components/home/HomePage";
import { isLogged } from "@centrin/utils/auth";
import { redirect } from 'next/navigation';

const Home = async () => {
  const logged =  await isLogged();
  if (!logged) {
    redirect("/login");
  };

  return <HomePage/>;
};

export default Home;
