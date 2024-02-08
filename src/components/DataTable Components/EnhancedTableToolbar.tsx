import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
// import { Button } from 'react-bootstrap';
import Button from '@mui/material/Button';
import AddItemModal from './AddItemModal';
import './Styles.css';
import { EnhancedTableToolbarProps } from '../../types/types';
import { carUrl, countryUrl } from './uslStrings';
import { IconButton, Tooltip } from '@mui/material';
import {searchPlaceholder, tableContext } from '../../constants';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const { numSelected } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const addCustomer = () => {
    setShowModal(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const setCar = () => {
    props.setUrlString(carUrl);
  }

  const setCountry = () => {
    props.setUrlString(countryUrl);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {numSelected > 0 ? (
          <>
          <Tooltip title="Delete">
            <div className='delete-btn  mr-3 mt-1'>
              <img src="delete.png" alt="filter button" />
            </div></Tooltip>
             <span className='selected-checks mt-1 mr-3'>
             {numSelected} selected
           </span>
           </>
        ) : (
          <Button variant="contained" className='mt-2 mr-3' size="small" startIcon={<AddIcon/>} onClick={addCustomer}>
             ADD
            </Button>
        )}

      </MenuItem>
      <MenuItem >

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small"  className='switcher mt-2 mr-3'>
      <InputLabel id="demo-select-small-label">{tableContext}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
       
        label= {tableContext}
        
      >
        <MenuItem value="country" onClick={setCountry}>
          <em>Country</em>
        </MenuItem>
        <MenuItem value={10}  onClick={setCar}>Car</MenuItem>
      </Select>
    </FormControl>
      </MenuItem>
    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background:"rgba(244, 247, 252, 0.75)", boxShadow:"none" }} >

        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          className='table-heading'
        >

          {/* Filter Button */}
          <div className='filter-btn mt-2 ml-3'>
            <img src="filter.png" alt="filter button" />
          </div>

          {/* Input Field */}
          <form className='input-form mt-2 ml-3' onSubmit={handleSubmit}>
            <img src="Search.png" alt="search" />
            <input
              type='text'
              placeholder={searchPlaceholder}
              className='search-input-field'
              value={props.searchInput}
              onChange={props.handleInputChange}
              onKeyDown={props.handleEnterKeyPress}
            />
          </form>

          <span className='ml-3 error-expression'>{props.invalidInputMsg}</span>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small"  className='switcher mt-2 mr-3'>
      <InputLabel id="demo-select-small-label">{tableContext}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
       
        label= {tableContext}
        
      >
        <MenuItem value="country" onClick={setCountry}>
          <em>Country</em>
        </MenuItem>
        <MenuItem value={10}  onClick={setCar}>Car</MenuItem>
      </Select>
    </FormControl>


            {/* Add/Delete button */}
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <div className='delete-btn  mr-3 mt-2'>
                  <img src="delete.png" alt="filter button" />
                </div></Tooltip>
            ) : (
              // <Button variant="primary mt-2 mr-3" size="sm" onClick={addCustomer}>
              //  <AddIcon/> {addButton}
              // </Button>
              <Button variant="contained" sx={{height:'38px'}} className='mt-2 mr-3' size="small" startIcon={<AddIcon/>} onClick={addCustomer}>
             ADD
            </Button>
//               <Button variant="contained">
//  <AddIcon/>Add
// </Button>
            )}

            {/* Show no of checkbox selected */}
            {numSelected > 0 && (
              <span className='selected-checks mt-3 mr-3'>
                {numSelected} selected
              </span>
            )}


            {/* <Dropdown className='switcher mt-2 mr-3'>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {tableContext}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={setCar}>Car</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={setCountry}>Country</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}





          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="default"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          <AddItemModal showModal={showModal} setModal={setShowModal} />
    
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      
    </Box>
  );
};

export default EnhancedTableToolbar;