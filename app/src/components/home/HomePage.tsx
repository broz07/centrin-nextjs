'use client';

import { IUser } from '@centrin/types/user';
import PageLayout from '@centrin/components/ui/PageLayout';

interface Props {
  readonly user: IUser;
}

const HomePage: React.FC<Props> = ({ user }) => {
  return (
    <PageLayout user={user}>
      <h1>Home Page</h1>
    </PageLayout>
  );
};

export default HomePage;
