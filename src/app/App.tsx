import { Route, Routes } from 'react-router';
import MainLayout from '../widgets/layouts/main-layout/ui/main-layout';
import { HomePage } from '@pages/home';
import { AboutPage } from '@pages/about';
import { NotFoundPage } from '@pages/not-found';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </MainLayout>
);

export default App;
