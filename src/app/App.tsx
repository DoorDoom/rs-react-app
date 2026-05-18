import { Component } from 'react';
import MainLayout from '../widgets/layouts/main-layout/MainLayout';
import PokemonContainer from '@/widgets/components/pokemon-container/ui/pokemon-container';

class App extends Component {
  render() {
    return (
      <div>
        <MainLayout>
          <PokemonContainer />
        </MainLayout>
      </div>
    );
  }
}

export default App;
