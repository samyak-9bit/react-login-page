import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Button } from 'react-bootstrap';
import AddItemModal from './AddItemModal';
import './Styles.css';
import { EnhancedTableToolbarProps } from '../../types/types';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { carUrl, countryUrl } from './uslStrings';
import Dropdown from 'react-bootstrap/Dropdown';
import { Tooltip } from '@mui/material';

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const { numSelected } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const addCustomer = () => {
    setShowModal(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const setCar=()=>{
    props.setUrlString(carUrl);
  }

  const setCountry=()=>{
    props.setUrlString(countryUrl);
  }


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

        <span className='ml-3 error-expression'>{props.invalidInputMsg}</span>

        {/* Add/Delete button */}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
          <div className='delete-btn  mr-3 mt-3'>
            <img src="delete.png" alt="filter button" />
          </div></Tooltip>
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

    <Dropdown className='switcher mt-3 mr-3'>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      Table Context
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={setCar}>Car</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={setCountry}>Country</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

        <AddItemModal showModal={showModal} setModal={setShowModal} />
      </div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
