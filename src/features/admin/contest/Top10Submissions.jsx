import { DialogActions, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

Top10Submissions.propTypes = {

};

function Top10Submissions({ itemSelected }) {

    const state = useSelector((state) => state.contest);
    // const statePrize = useSelector((state) => state.prize);

    // STATE  SELECTED OBJECT IN DATAGRID
    const [prizeSelected, setPrizeSelected] = useState({});

    // STATE LIST SELECTION OF PRIZE IN DATAGRID
    const [selectionPrize, setSelectionPrize] = useState([]);
    const columnsPrize = [
        { field: "name", headerName: "Name", width: 160 },
        { field: "description", headerName: "Description", width: 180 },
        { field: "value", headerName: "Value", width: 250 },
    ];
    const rowsPrize = state.prizesContest;
    const [columnPrize, setColumnPrize] = useState(columnsPrize);
    const [rowPrize, setRowPrize] = useState(rowsPrize);


    // STATE  SELECTED OBJECT IN DATAGRID
    const [winnerSelected, setWinnerSelected] = useState({});
    const [selectionWinner, setSelectionWinner] = useState([]);
    const columnsWinner = [
        { field: "ownerName", headerName: "Name", width: 160 },
        // { field: "images", headerName: "Post", width: 250 },
        { field: "content", headerName: "Content", width: 250 },
        { field: "averageStar", headerName: "Point", width: 180 },
    ];
    const rowsWinner = state.top10Submissions;
    const [columnWinner, setColumnWinner] = useState(columnsWinner);
    const [rowWinner, setRowWinner] = useState(rowsWinner);

    useEffect(() => {
        setRowPrize(state.prizesContest);
        setRowWinner(state.top10Submissions);
    }, [itemSelected]);

    const handleAddWinner = () => {
        // dispatch(addPrize(itemSelected.id, selectionModel));
        setSelectionPrize([]);
        setSelectionWinner([]);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <DialogContent sx={{ marginTop: "10px" }}>
                <FormControl sx={{ mt: 1, height: "500px" }} fullWidth>
                    <DataGrid
                        // checkboxSelection
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionPrize(newSelectionModel);
                        }}
                        selectionModel={selectionPrize}
                        rows={rowPrize}
                        columns={columnPrize}
                        pageSize={5}
                    />
                </FormControl>
            </DialogContent>
            <DialogContent sx={{ marginTop: "10px" }}>
                <FormControl sx={{ mt: 1, height: "500px" }} fullWidth>
                    <DataGrid
                        checkboxSelection
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionWinner(newSelectionModel);
                        }}
                        selectionModel={selectionWinner}
                        rows={rowWinner}
                        columns={columnWinner}
                        pageSize={5}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                {/* <Button color="inherit" onClick={handleClose}>
                    Cancel
                </Button> */}
                <Button onClick={handleAddWinner}>
                    Add
                </Button>
            </DialogActions>
        </Box >
    );
}

export default Top10Submissions;