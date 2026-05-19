import Button from '@shared/ui/Button';
import { Component, type ReactNode } from 'react';

interface Props {
  page: number;
  onNext: () => void;
  onPrev: () => void;
}

class ItemListPagination extends Component<Props> {
  render(): ReactNode {
    const { page, onNext, onPrev } = this.props;

    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          onClick={onPrev}
          className="text-black bg-gray-200 hover:bg-gray-300"
        >
          Prev
        </Button>

        <span className="font-semibold">Page {page}</span>

        <Button
          onClick={onNext}
          className="bg-gray-200 text-black hover:bg-gray-300"
        >
          Next
        </Button>
      </div>
    );
  }
}

export default ItemListPagination;
