import Loading from '@shared/ui/Loading';
import { Component } from 'react';
import { SearchContainer } from '@/features/search-container';
import type { State } from '../model/interfaces';
import ItemList from '@/features/item-list/ui/item-list';
import { fetchPokemons } from '../model/pokemon-service';

const SEARCH_KEY = 'searchTerm';
const PAGE_KEY = 'page';

class PokemonContainer extends Component {
  state: State = {
    results: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem(SEARCH_KEY);
    const savedPage = Number(localStorage.getItem(PAGE_KEY));

    if (savedSearch) {
      this.setState(
        {
          search: savedSearch,
          page: savedPage,
        },
        this.loadPokemons
      );
    } else {
      this.loadPokemons('', 1);
    }
  }

  loadPokemons = async (search = this.state.search, page = this.state.page) => {
    this.setState({ loading: true, error: null });

    try {
      const { results } = await fetchPokemons(search, page);

      this.setState({
        results,
      });
    } catch {
      this.setState({ error: 'Failed to load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (value: string) => {
    const trimmed = value.trim();

    if (trimmed === this.state.search) return;

    localStorage.setItem(SEARCH_KEY, trimmed);
    localStorage.setItem(PAGE_KEY, '1');

    this.setState(
      {
        search: trimmed,
        page: 1,
        error: null,
      },
      () => this.loadPokemons(trimmed, 1)
    );
  };

  nextPage = () => {
    const newPage = this.state.page + 1;

    localStorage.setItem(PAGE_KEY, newPage.toString());

    this.setState({ page: newPage }, () =>
      this.loadPokemons(this.state.search, newPage)
    );
  };

  prevPage = () => {
    const newPage = Math.max(this.state.page - 1, 1);

    localStorage.setItem(PAGE_KEY, newPage.toString());

    this.setState({ page: newPage }, () =>
      this.loadPokemons(this.state.search, newPage)
    );
  };

  render() {
    const { results, loading, error, search, page } = this.state;

    return (
      <div className="w-full max-w-4xl min-h-[75vh] py-4 text-center text-sm text-gray-500">
        {this.state.loading ? (
          <Loading />
        ) : (
          <>
            <SearchContainer
              onSearch={this.handleSearch}
              initialValue={search}
            />
            <ItemList
              results={results}
              loading={loading}
              error={error}
              onNext={this.nextPage}
              onPrev={this.prevPage}
              page={this.state.page}
            />
          </>
        )}
      </div>
    );
  }
}

export default PokemonContainer;
