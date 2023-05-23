'use client'
import Sidebar from "@centrin/components/ui/Sidebar";
import { IUser } from "@centrin/types/User/User";
import PageContentWrapper from "@centrin/components/ui/PageContentWrapper";
import PageLayout from "@centrin/components/ui/PageLayout"

interface Props{
    readonly user : IUser;
}

const HomePage: React.FC<Props> = ({user}) => {
    return (
        <PageLayout user={user}>
            <h1>Home Page</h1>
        </PageLayout>
    );
};

export default HomePage;