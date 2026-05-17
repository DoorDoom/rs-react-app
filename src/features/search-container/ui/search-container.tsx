import { Component } from 'react';
import Input from '@shared/ui/Input';
import Button from '@shared/ui/Button';

interface Props {
  onSearch: (value: string) => void;
  initialValue: string;
}

interface State {
  value: string;
}

class SearchContainer extends Component<Props, State> {
  state: State = {
    value: this.props.initialValue || '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ value: this.props.initialValue });
    }
  }

  render() {
    return (
      <section className="w-full bg-white p-6 rounded-2xl shadow-md border">
        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSearch(this.state.value);
          }}
        >
          <Input
            placeholder="Search pokemon by title"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
          <Button className="text-white" type="submit">
            Search
          </Button>
        </form>
      </section>
    );
  }
}

export { SearchContainer };
