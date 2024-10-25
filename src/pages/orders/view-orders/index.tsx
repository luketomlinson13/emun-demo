import { Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { BaseLayout } from "../../../components/layout/BaseLayout";
import { BasicSelect } from "../../../components/orders/view-orders/Select";
import { CustomizedTables } from "../../../components/orders/view-orders/Table";


const ViewOrdersPage: NextPage = () => {
  const [vendor, setVendor] = React.useState("All");

  const vendorSelected = (value: string) => {
    console.log(value)
    setVendor(value);
  };

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <Stack gap={5} p={5}>
        <Stack>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }} ><Typography variant="h5" gap={2}>View Orders</Typography><BasicSelect vendor={vendor} vendorSelected={vendorSelected}></BasicSelect></Stack>
          <CustomizedTables vendor={vendor}/>
        </Stack>
      </Stack>

   
    </>
  );
}

ViewOrdersPage.getLayout = (page) => (<BaseLayout>{page}</BaseLayout>);

export default ViewOrdersPage;