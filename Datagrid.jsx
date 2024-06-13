import React, { useState, useEffect } from "react";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/styles";
import Buttons from "./Buttons";

const useStyles = makeStyles({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#666666",
  },

  dataGrid: {
    border: "8px solid #fc7500",
    color: "#FFFFFF",
  },
});

const Datagrid = () => {
  // State variables
  const [data, setData] = useState([]); // Holds the fetched data
  const [entries, setEntries] = useState(8); // Number of entries per page
  const [page, setPage] = useState(0); // Current page number (0-based index)
  const [showGrid, setShowGrid] = useState(true); // Controls the visibility of the data grid
  const [selectedRows, setSelectedRows] = useState([]); // Holds the selected rows

  // Fetch data from the server when 'entries' or 'page' changes
  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Fetching the JSON data from the server
      const response = await fetch(
        `http://localhost:8080/hrc_milestone11/data` // Add 1 to page for server-side pagination
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entries, page]);

  const classes = useStyles();

  // Event handler for refresh button click
  const handleRefresh = () => {
    // Hide the data grid
    setShowGrid(false);

    // Fetch the new data after a short delay
    setTimeout(() => {
      fetchData();

      // Show the data grid again
      setShowGrid(true);
    }, 200);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };


  // Columns configuration for the DataGrid
  // Columns configuration for the DataGrid
  const columns = [
    { field: "slNo", headerName: "Sl.no", width: 150, sortable: true, },
    { field: "customerOrderID", headerName: "CustomerOrderID", width: 200 },
    { field: "salesOrg", headerName: "SalesOrg", width: 150 },
    { field: "distributionChannel", headerName: "DistributionChannel", width: 250 },
    { field: "companyCode", headerName: "CompanyCode", width: 200 },
    { field: "orderCreationDate", headerName: "OrderCreationDate", width: 200 },
    { field: "orderAmount", headerName: "OrderAmount", width: 200 },
    { field: "orderCurrency", headerName: "OrderCurrency", width: 180 },
    { field: "customerNumber", headerName: "CustomerNumber", width: 200 },
  ];

  // Rows configuration for the DataGrid
  const rows = data.map((item) => ({
    id: item.slNo, // Use the correct field name here (slNO instead of slNo)
    slNo: item.slNo, // Use the correct field name here (slNO instead of slNo)
    customerOrderID: item.customerOrderID,
    salesOrg: item.salesOrg,
    distributionChannel: item.distributionChannel,
    companyCode: item.companyCode,
    orderCreationDate: item.orderCreationDate,
    orderAmount: item.orderAmount,
    orderCurrency: item.orderCurrency,
    customerNumber: item.customerNumber,
  }));



  // const classes = useStyles();


  // Event handler for refresh button click
  // const handleRefresh = () => {
  //   fetchData();
  // };

  return (

    <div>
      {/* Data Grid */}
      <div className={`${classes.root} ${classes.dataGrid}`} style={{ opacity: showGrid ? 1 : 0, transition: "opacity 0.5s" }}>
        {showGrid && (
          <DataGrid
            sx={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: '', }}
            columns={columns}
            rows={rows}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            pageSize={entries}
            onPageSizeChange={(newPageSize) => setEntries(newPageSize)}
            rowsPerPageOptions={[5, 8, 10, 20, 50]} // Array of available options
            pagination
            autoHeight
            checkboxSelection
            components={{
              Pagination: GridPagination,
            }}
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedRows}
          />
        )}
        <Buttons handleRefresh={handleRefresh} selectedRows={selectedRows} />


      </div>


    </div>
  );
};

export default Datagrid;
