import { Search } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid'
import React from 'react'
import FlexBetween from './FlexBetween'

const CustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
  return (
    <GridToolbarContainer>
        <FlexBetween width="99%">
            <FlexBetween>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </FlexBetween>
            <TextField label="Search..." variant="standard" sx={{mb: "0.5rem", width: "15rem"}} onChange={(e) => setSearchInput(e.target.value)} value={searchInput} InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={() => {setSearch(searchInput); setSearchInput("");}}><Search /></IconButton></InputAdornment>)}}/>
        </FlexBetween>
    </GridToolbarContainer>
  )
}

export default CustomToolbar