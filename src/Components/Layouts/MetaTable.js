import React, { useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ColumnsDialog from '../Indices/Dialogs/ColumnsDialog'
import CircularProgress from '@material-ui/core/CircularProgress';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const {
        headCells,
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    headCell.hidden ? null :
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{fontWeight: 'bold', textTransform: 'capitalize'}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, columns, onColumnsChange } = props;
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        setOptions(columns);
    }, [columns]);

    const handleColumnsChange = newOptions => {
        setOptions(newOptions);  // redundant? only delegate..
        onColumnsChange(newOptions);
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <ColumnsDialog
                    columns={options}
                    onColumnsChange={handleColumnsChange}
                />
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    noIndex: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        textAlign: 'center',
    },
}));

export default function MetaTable(props) {
    const { onError } = props;
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [lines, setLines] = React.useState([]);
    const [headers, setHeaders] = React.useState([]);
    const [showSpinner, setShowSpinner] = React.useState(true);

    useEffect(() => {
        axios
            .get(
                window.location.origin + '/api/v1/indices'
            )
            .then(({ data }) => {
                setLines(data.data);
                // setNextTodoId(data.length);
                const keysArray = data.data.map(indexInfo => Object.keys(indexInfo));
                const keys = keysArray.reduce((combined, list) => {
                    return new Set([...combined, ...list]);
                }, new Set());

                const columns = [...keys].map(key => {
                    return {
                        id: key,
                        numeric: false,  // TODO: sample some values above
                        disablePadding: false,
                        label: key,
                        hidden: false
                    }
                });
                setHeaders(columns);
            }).catch(function (error) {
                // handle error
                onError({
                   hidden: false,
                   message: error.response.data.message
                });
        }).finally(() => {
                setShowSpinner(false);
        })
    }, [onError]);


    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = lines.map(n => n.index);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, index) => {
        const selectedIndex = selected.indexOf(index);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = index => selected.indexOf(index) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, lines.length - page * rowsPerPage);

    const handleColumnsChange = newColumns => {
        setHeaders(newColumns);
        axios
            .post(window.location.origin + '/api/v1/columns', { columns: newColumns }
            )
            .then(({ data }) => {
                console.debug(data);
            });
    };

    function renderSpinner() {
        return <div style={{textAlign: 'center', marginTop: '30px'}}>
            <CircularProgress/>
        </div>;
    }

    function renderNoIndices() {
        return <div className={classes.noIndex}>{"No Indices Found."}</div>;
    }

    function renderTable() {
        return <Paper className={classes.paper}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                columns={headers}
                onColumnsChange={handleColumnsChange}
            />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        headCells={headers}
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={lines.length}
                    />
                    <TableBody>
                        {stableSort(lines, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.index);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row.index)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </TableCell>
                                        {/*<TableCell><a href={row.url} target='_blank'><img src={`${row.url}/favicon.ico`}*/}
                                        {/*                                                       style={{width: 20}}/></a></TableCell>*/}
                                        {/*<TableCell component="th" id={labelId} scope="row" padding="none">*/}
                                        {/*    {row.eCommerceName}*/}
                                        {/*</TableCell>*/}
                                        {
                                            headers.map((header, index) => {
                                                const column = header.id;
                                                return header.hidden ? null :
                                                    <TableCell key={index}>{row[column]}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={headers.length + 1}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={lines.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>;
    }

    return (
        showSpinner ?
            renderSpinner()
        : (lines.length === 0 ? renderNoIndices() : renderTable())
    );
}
