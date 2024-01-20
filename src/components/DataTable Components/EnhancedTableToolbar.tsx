import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Button } from 'react-bootstrap';
import AddItemModal from './AddItemModal';
import './Styles.css';
import { EnhancedTableToolbarProps } from '../../types/types';

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const { numSelected } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const addCustomer = () => {
    setShowModal(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
      className='table-heading'
    >
      <div className='table-heading'>
        {/* Filter Button */}
        <div className='filter-btn mt-3 ml-3'>
          <img src="filter.png" alt="filter button" />
        </div>

        {/* Input Field */}
        <form className='input-form mt-3 ml-3' onSubmit={handleSubmit}>
          <img src="Search.png" alt="search" />
          <input
            type='text'
            placeholder='Search...'
            className='search-input-field'
            value={props.searchInput}
            onChange={props.handleInputChange}
            onKeyDown={props.handleEnterKeyPress}
          />
        </form>

        {/* Add/Delete button */}
        {numSelected > 0 ? (
          <div className='delete-btn  mr-3 mt-3'>
            <img src="delete.png" alt="filter button" />
          </div>
        ) : (
          <Button variant="primary mt-3 mr-3" onClick={addCustomer}>
            <span>+</span> Add Customer
          </Button>
        )}

        {/* Show no of checkbox selected */}
        {numSelected > 0 && (
          <span className='selected-checks mt-4 mr-3'>
            {numSelected} selected
          </span>
        )}

        <AddItemModal showModal={showModal} setModal={setShowModal} />
      </div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
