'use client'
import Sidebar from "@centrin/components/ui/Sidebar";
import { IUser } from "@centrin/types/User/User";
import PageContentWrapper from "@centrin/components/ui/PageContentWrapper";
import PageWrapper from "@centrin/components/ui/PageWrapper"

interface Props{
    readonly user : IUser;
}

const HomePage: React.FC<Props> = ({user}) => {
    return (
        <PageWrapper>
            <Sidebar user={user}/>
            <PageContentWrapper>
                <h1>Home</h1>
            </PageContentWrapper>
        </PageWrapper>
    );
};

export default HomePage;