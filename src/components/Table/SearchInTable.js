import {useEffect, useState} from 'react'
import {
  InputAdornment,
  OutlinedInput,
  Toolbar,
  FormControl,
  Select, 
  MenuItem,
  Typography,
  Box
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import palette from 'src/theme/palette';

export default function SearchInTable(props) {

  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("latest");
  const [status, setStatus] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let query = `order-by=${orderBy}`;
    if(search.length >= 0){
      query += `&search=${search}&`;
    }
    if(status !== ""){
      query += `&status=${status}`;
    }

    props.searchByParam(query)

  }, [orderBy, status])

  useEffect(() => {
    if(search.length >= 0){
      let query = `order-by=${orderBy}`;

      query += `&search=${search}&`;

      if(status !== ""){
        query += `&status=${status}`;
      }

      props.searchByParam(query)
    }

  }, [search])

  useEffect(() => {
    if(searchParams.get('search')){
      setSearch(searchParams.get('search'))
    }
    if(searchParams.get('order-by')){
      setOrderBy(searchParams.get('order-by'))
    }
    if(searchParams.get('status')){
      setStatus(searchParams.get('status'))
    }
    
  }, [])

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        // background: `${palette.primary.main}`
        // padding: 0, 1, 0, 3,
      }}
    >
      <OutlinedInput
        sx={{
          width: 250,
        }}
        size="small"
        color="form"
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
        placeholder="Search user..."
        startAdornment={
        <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </InputAdornment>
        }
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" color="form">
        <Select
          value={status}
          onChange={(e) => { setStatus(e.target.value) }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" >All Status</MenuItem>
          <MenuItem value="1" >Active</MenuItem>
          <MenuItem value="0">Inactive</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />
      
      <Typography component="h6">
        Sort By : 
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" color="form">
        <Select
          value={orderBy}
          onChange={(e) => { setOrderBy(e.target.value) }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem value="">
            Sort By
          </MenuItem> */}
          <MenuItem value="latest" >Latest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="asc">A to Z</MenuItem>
          <MenuItem value="desc">Z to A</MenuItem>
        </Select>
      </FormControl>
    </Toolbar>
  )
}