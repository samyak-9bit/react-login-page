import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { MyObject } from '../../types/types';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { searchInStatement } from './smartSearch';
import './Styles.css';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import {  Order } from '../../types/types';
import { countryUrl } from './uslStrings';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ImageIcon from '@mui/icons-material/Image';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: " rgba(244, 247, 252, 0.75);",
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


type GetData={
  attributeTypes?:Object,
  data?:MyObject[]
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof MyObject>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [urlString, setUrlString] = React.useState<string>(countryUrl);
  const [data, setData] = React.useState<MyObject[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [keysArray, setKeysArray] = React.useState<string[]>([]);
  const [invalidInputMsg, setInValidInputMsg] = React.useState<string>("");
  const [originalRows,setOriginalRows]=React.useState<MyObject[]>([]);

  //dynamic interface generator
  // const metaData = dummyDynamicData.type;
  // type MetaDataKeys = keyof typeof metaData;
  // type Data = {
  //   [key in MetaDataKeys]: string; 
  // };
  // const dynamicInterface: Data = {} as Data;
  // for (const key in metaData) {
  //   dynamicInterface[key as MetaDataKeys] = (metaData[key as MetaDataKeys]).toLowerCase();
  // }
  // console.log(dynamicInterface);



  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(urlString); 
  //       setData(response.data.data);
  //       const keysArray = Object.keys(response.data.attributeTypes);
  //       setKeysArray(keysArray);
  //       setRows(response.data);
  //       console.log(data);
  //       console.log(keysArray);
  //     } catch (error) {
  //       setError(error as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [urlString]);



  // Query CLient
  // const retriveData = async () => {
  //   const retrivedData = await axios.get(urlString);
  //   return retrivedData;

  // }

  // try {
  //   const fetchedData = useQuery<GetData>({
  //     queryKey: [`data-${urlString}`],
  //     queryFn: retriveData,
  //     staleTime: 60000,
  //   })
  //   console.log("QueryClient Data");
  //   console.log(fetchedData);
  //   setData(fetchedData.data?.data);
  // const newKeysArray = Object.keys(fetchedData.data?.attributeTypes);
  // setKeysArray(newKeysArray);
  // } catch (error) {
  //   console.log(error)
  // }

  


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if cached data is available
        const cachedData = localStorage.getItem(`cachedData-${urlString}`);
        const cachedTimestamp = localStorage.getItem('cachedTimestamp');

        if (cachedData && cachedTimestamp) {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - parseInt(cachedTimestamp);

          // If the cached data is less than 10 minutes old, use it
          if (elapsedTime < 10 * 60 * 1000) {
            setData((JSON.parse(cachedData)).data);
            setKeysArray(Object.keys(JSON.parse(cachedData).attributeTypes));
            setLoading(false);
            return;
          } else {
            // If the cached data is older than 10 minutes, delete it
            localStorage.removeItem(`cachedData-${urlString}`);
            localStorage.removeItem('cachedTimestamp');
          }
        }

        // If no cached data or the cached data is older than 10 minutes, fetch new data
        const response = await axios.get(urlString);
        setData(response.data.data);
        const newKeysArray = Object.keys(response.data.attributeTypes);
        setKeysArray(newKeysArray);

        // Cache the new data
        localStorage.setItem(`cachedData-${urlString}`, JSON.stringify(response.data));
        localStorage.setItem('cachedTimestamp', new Date().getTime().toString());

        console.log(data);
        console.log(newKeysArray);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlString]);



  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof MyObject,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchInput.length !== 0) {
        const newRows = searchInStatement(searchInput, data, keysArray);
        if (newRows.length === 0) {
          setInValidInputMsg("Cannot find a matching field or statement Invalid!");
        }
        console.log(`NewRows:::::${JSON.stringify(newRows)}`);
        // Use a callback function to update the rows state
        setData((prevRows) => {
          setOriginalRows(prevRows);
          return newRows.length > 0 ? newRows : prevRows;
        });
        // Use the useEffect hook to log the updated rows state
        // React.useEffect(() => {
        console.log(`Rows:::::${data}`);
        // }, [rows]);
      }
    }
  };

  const changeDataContext = (contextUrl : string)=>{
    setUrlString(contextUrl);
    setInValidInputMsg(""); 
    setSearchInput("");
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  
    if (inputValue.trim() === "") {
      setInValidInputMsg(""); 
      if(originalRows.length>0){
        setData(originalRows);
      }
    } 
  };
  
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  const isImageUrl = (value: string) => {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  };
  return (
    <Box sx={{ width: '100%' }}>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} changeDataContext={changeDataContext} invalidInputMsg={invalidInputMsg} handleInputChange={handleInputChange} searchInput={searchInput} handleEnterKeyPress={handleEnterKeyPress} />
        {loading &&
          <div className='mt-3 ml-3'>

            <Spinner animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner> <br></br>
            <h5>Loading...</h5>
          </div>
        }
        {error && <p className='mt-3 ml-3'>Error: {error.message}</p>}
        {data && (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                dynamicColumns={keysArray}

              />
              <TableBody>
                {data.map((item, index) => {
                  const isItemSelected = isSelected(item.id);
                  const labelId = `enhanced-table-checkbox-${item.id}`;
                  if (item !== null) {
                    const valuesArray = Object.values(item);
                    return (
                      <StyledTableRow
                        hover
                        onClick={(event) => handleClick(event, item.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={item.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>





                        {valuesArray.map((value, columnIndex) => (
                          <TableCell key={columnIndex} align="center" sx={{
                            color: "var(--Gray-700, #464F60)",
                            fontFamily: "Inter",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "1.25rem",

                          }}>
                            {typeof value === 'object' ? `${value.rate}, ${value.count}` : isImageUrl(value) ? <ImageIcon color='action' fontSize='large' /> : value}
                          </TableCell>
                        ))}



                        <TableCell align="center"><EditIcon color='action' /></TableCell>

                      </StyledTableRow>
                    );
                  }
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {/* <TableBody >
              {
                data.map((item, index) => {
                  if (item !== null) {
                    const valuesArray = Object.values(item);
                    return (
                      <StyledTableRow
                        hover
                        onClick={(event) => handleClick(event, index)}
                        role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        // selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        {valuesArray.map((value, columnIndex) => (
                          <TableCell key={columnIndex} align="center" sx={{
                            color: "var(--Gray-700, #464F60)",
                            fontFamily: "Inter",
                            fontSize: "0.875rem",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "1.25rem",

                          }}>
                            {typeof value === 'object' ? `${value.rate}, ${value.count}` : value}
                          </TableCell>
                        ))}
                      </StyledTableRow>
                    );
                  }
                  return null;
                })
              }
            </TableBody> */}
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>



      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box >
  );
}




// {data.map((item, index) => {
//   const isItemSelected = isSelected(item.id);
//   const labelId = `enhanced-table-checkbox-${item.id}`;
//   if (item !== null) {
//     const valuesArray = Object.values(item);
//     return (
//       <StyledTableRow
//         hover
//         onClick={(event) => handleClick(event, item.id)}
//         role="checkbox"
//         aria-checked={isItemSelected}
//         tabIndex={-1}
//         key={item.id}
//         selected={isItemSelected}
//         sx={{ cursor: 'pointer' }}
//       >
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             checked={isItemSelected}
//             inputProps={{
//               'aria-labelledby': labelId,
//             }}
//           />
//         </TableCell>

//         {valuesArray.map((value, columnIndex) => (
//           <TableCell key={columnIndex} align="center" sx={{
//             color: "var(--Gray-700, #464F60)",
//             fontFamily: "Inter",
//             fontSize: "0.875rem",
//             fontStyle: "normal",
//             fontWeight: 400,
//             lineHeight: "1.25rem",
//           }}>
//             {typeof value === 'object' ? `${value.rate}, ${value.count}` : isImageUrl(value) ? 'Img' : value}
//           </TableCell>
//         ))}
//       </StyledTableRow>
//     );
//   }
//   return null;
// });

// // Function to check if a value is an image URL
// const isImageUrl = (value) => {
//   return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
// };
