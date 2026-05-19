import Input from '@shared/ui/Input';
import Button from '@shared/ui/Button';
import { useRef, type FormEvent } from 'react';

interface Props {
  onSearch: (value: string) => void;
  initialValue: string;
}

const SearchContainer = ({ onSearch, initialValue }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() || '';
    inputRef.current!.value = value;
    onSearch(value);
  };

  return (
    <section className="w-full bg-white p-6 rounded-2xl shadow-md border">
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="Search pokemon by title"
          defaultValue={initialValue}
        />
        <Button className="text-white" type="submit">
          Search
        </Button>
      </form>
    </section>
  );
};

export { SearchContainer };
