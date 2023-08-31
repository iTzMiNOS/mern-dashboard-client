import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserQuery } from 'state/api'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSide,setIsSide] = React.useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar user={data || {}} isNonMobile={isNonMobile} drawerWidth="250px" isSide={isSide} setIsSide={setIsSide} />
      <Box flexGrow={1}>
        <Navbar user={data || {}} isSide={isSide} setIsSide={setIsSide} />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout