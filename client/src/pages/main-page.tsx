import MainLayout from '@/components/Layout/MainLayout';

import { withAuth } from '../components/Auth/withAuth';
import { MainPageContainer } from '../components/MainPage/MainPageContainer';

function MainPage() {
  return (
    <MainLayout>
      <MainPageContainer />
    </MainLayout>
  );
}

export default withAuth(MainPage);
