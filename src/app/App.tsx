import { Component } from 'react';
import type { CardData, ResultResponse } from '../shared/types/types';
import MainLayout from '../widgets/layouts/main-layout/MainLayout';
import PokemonContainer from '@/widgets/components/pokemon-container/ui/pokemon-container';

class App extends Component {
  state = {
    serverUrl: '',
    isLoading: false,
  };
  data: CardData[] = [];
  searchLine = localStorage.getItem('search');

  fetchData = async (search: string) => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + search;
      this.setState({
        isLoading: true,
      });
      if (url !== this.state.serverUrl) {
        const res = await fetch(url);
        const json = await res.json();
        const results = json.results || json.forms;

        if (!results) throw new Error('fetch failed');
        this.data.splice(0, this.data.length);
        results.map((elem: ResultResponse) =>
          this.data.push({ name: elem.name, description: elem.url })
        );
        this.setState({
          serverUrl: url,
        });
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        isLoading: false,
      });
    }
  };

  promise = new Promise(async (resolve) => {
    const data = await this.fetchData(this.searchLine ?? '');
    resolve(data);
  });

  constructor(props: {}) {
    super(props);
  }

  componentDidUpdate(prevState: { serverUrl: string }) {
    if (prevState.serverUrl !== this.state.serverUrl) {
      console.log('Count updated:', this.state.serverUrl);
    }
  }

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
