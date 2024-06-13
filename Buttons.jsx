import React from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import axios from "axios";

const Buttons = ({ handleRefresh, selectedRows }) => {
    const isEditDisabled = selectedRows.length !== 1;
    const isDeleteDisabled = selectedRows.length === 0;
    const isPredictDisabled = selectedRows.length === 0;
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [editedOrderCurrency, setEditedOrderCurrency] = React.useState("");
    const [editedCompanyCode, setEditedCompanyCode] = React.useState("");
    const [editedDistributionChannel, setEditedDistributionChannel] = React.useState("");

    const handleDelete = async () => {
        console.log("Deleting rows:", selectedRows);
        const slNos = selectedRows; // Assuming the selected row object has the ID field as "id"
        console.log("slNos:", slNos);
        await axios({
            method: "post",
            url: `http://localhost:8080/hrc_milestone11/delete/${slNos}`,
            headers: {
                "content-type": "application/json",
            }, // Add 1 to page for server-side pagination
        })
            .then((response) => {
                // Handle the response
                console.log(response.data.message);
                console.log('Success')
                { handleRefresh() }
                // Perform any additional actions if needed
            })
            .catch((error) => {
                // Handle the error
                console.error("Error deleting rows:", error);
                // Perform any error handling actions if needed
            })
            .finally(() => {
                // Close the confirmation dialog
                setIsDeleteConfirmationOpen(false);
            });
    };

    const handleOpenDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(false);
    };

    const handleOpenEditDialog = () => {
        // Assuming the selectedRows array contains the data of the selected row objects
        const [selectedRow] = selectedRows;
        setSelectedRowData(selectedRow);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleEdit = () => {
        // // // Assuming you have separate state variables for the edited values
        // const editedOrderCurrency = ""; // Assign the edited value of Order Currency
        // const editedCompanyCode = ""; // Assign the edited value of Company Code
        // const editedDistributionChannel = ""; // Assign the edited value of Distribution Channel

        // Assuming you have the ID or unique identifier of the selected row
        const slNos = selectedRows;;

        // Send the edited data to the server using an API request (e.g., Axios)
        axios
            .put(`http://localhost:8080/hrc_milestone11/edit/${slNos}?orderCurrency=${editedOrderCurrency}&companyCode=${editedCompanyCode}&distributionChannel=${editedDistributionChannel}`,
            )
            .then((response) => {
                // Handle the response if needed
                console.log(editedCompanyCode, editedDistributionChannel, editedOrderCurrency)
                console.log("Success");
                console.log(response.data);
                
                // Perform any additional actions if needed
            })
            .catch((error) => {
                // Handle the error if needed
                console.error("Error editing row:", error);
                // Perform any error handling actions if needed
                console.log(error.response.data);
            })
            .finally(() => {
                // Close the edit dialog
                handleCloseEditDialog();
                // Refresh the data
                handleRefresh();
            });
    };

    return (
        <div style={{ display: "flex", alignItems: "center", marginLeft: "16px" }}>
            <Button
                variant="contained"
                color="#fc7500"
                style={{ marginLeft: "16px ", backgroundColor: "#fc7500" }}
                onClick={handleRefresh}
            >
                Refresh
            </Button>
            <Button
                variant="contained"
                color="#fc7500"
                style={{ marginLeft: "16px " }}
                disabled={isEditDisabled}
                onClick={handleOpenEditDialog}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="orange"
                style={{ marginLeft: "16px " }}
                disabled={isDeleteDisabled}
                onClick={handleOpenDeleteConfirmation}
            >
                Delete
            </Button>
            <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "16px" }}
                disabled={isPredictDisabled}
            >
                Predict
            </Button>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Row</DialogTitle>
                {selectedRowData && (
                    <div>
                        <TextField
                            label="Order Currency"
                            value={selectedRows.orderCurrency}
                        // Add onChange handler to update the value if needed
                            onChange={(e) => setEditedOrderCurrency(e.target.value)}
                        />
                        <TextField
                            label="Company Code"
                            value={selectedRows.companyCode}
                        // Add onChange handler to update the value if needed
                            onChange={(e) => setEditedCompanyCode(e.target.value)}
                        />
                        <TextField
                            label="Distribution Channel"
                            value={selectedRows.distributionChannel}
                        // Add onChange handler to update the value if needed
                            onChange={(e) => setEditedDistributionChannel(e.target.value)}
                        />
                    </div>
                )}
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEdit} color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Buttons;