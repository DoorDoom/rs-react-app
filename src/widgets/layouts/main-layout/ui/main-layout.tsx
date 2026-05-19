import type { ReactNode } from 'react';
import { Header } from '@widgets/components/header';
import { Footer } from '@widgets/components/footer';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center">
      <Header />

      <main className="flex flex-col items-center w-full flex-1 pt-5">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
