import { Component } from 'react';
import './App.css';
import { Footer } from './components/ui/footer';
import { Header } from './components/ui/header';
import { Main } from './components/ui/main';
import type { CardData, ResultResponse } from './types/types';

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
      <>
        <Header fetchData={this.fetchData}></Header>
        <Main cards={this.data} isLoading={this.state.isLoading}></Main>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
