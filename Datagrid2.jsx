import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/body.css";


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

const Datagrid2 = ({ rows }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRowIds(selection.selectionModel);
  };

  const isEditDisabled = selectedRowIds.length !== 1;

  return (
    <div>
      <div style={{ height: 540, width: "100%" }}>
        <DataGrid
          sx={{
            backgroundColor: "#666666",
            color: "white",
            border: "none",
            checkboxSelection: {
              color: "red",
              border: "10px solid blue",
            },
          }}
          rows={rows}
          columns={columns}
          style={{ color: "white" }}
          pageSize={8}
          pageSizeOptions={[5, 8, 10, 20, 50, 100]}
          // checkboxSelection
          disableRowSelectionOnClick
          onSelectionModelChange={handleSelectionChange}
          selectionModel={selectedRowIds}
        />
       
      </div>
    </div>
  );
};

export default Datagrid2;