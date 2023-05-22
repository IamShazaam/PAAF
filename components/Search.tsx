import { FC, useEffect, useState } from 'react';
import styles from './Search.module.css';

type Props = {
  onSearch: (searchTerm: string) => void;
};

export const Search: FC<Props> = ({ onSearch }) => {

  // Jorge's fix 
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  //PAAF Standard.
  // const [searchTerm, setSearchTerm] = useState<string>();

  // Jorge's fix - Changing letter "&" to "and" to the endpoint
  const handleSearch = (value: string) => {
    const modifiedSearchTerm = value.replace(/&/g, 'and');
    setSearchTerm(modifiedSearchTerm);
    onSearch(modifiedSearchTerm);
  };

  useEffect(() => {
    onSearch(searchTerm ?? '');
  }, [searchTerm]);

  return (
    <input className={styles.search}
           placeholder="Type to search..."
           type="search"
           value={searchTerm}
           onChange={(e) => handleSearch(e.target.value)}/>
  );
}



