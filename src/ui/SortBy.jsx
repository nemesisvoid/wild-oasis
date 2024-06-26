import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  const sortBy = searchParams.get('sortBy') || '';
  return (
    <Select
      onChange={handleChange}
      value={sortBy}
      options={options}
      type='white'
    />
  );
}

export default SortBy;
