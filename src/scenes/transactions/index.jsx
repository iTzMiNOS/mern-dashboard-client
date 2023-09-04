import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import React from 'react'
import { useGetTransactionsQuery } from 'state/api'
import CustomToolbar from "components/CustomToolbar"

const Transactions = () => {
  const theme = useTheme();


  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);
  const [sort, setSort] = React.useState({});
  const [search, setSearch] = React.useState("");

  const [searchInput, setSearchInput] = React.useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  
  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
    },
    /*{
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => {
            if(params.value){
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3")
            }
        },
    },*/
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions