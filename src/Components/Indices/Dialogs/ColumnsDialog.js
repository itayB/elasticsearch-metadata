
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from '@material-ui/icons/FilterList';
import {Checkbox} from "@material-ui/core";


export default function ColumnsDialog(props) {
    const { columns, ...other } = props;
    const [open, setOpen] = React.useState(false);
    const radioGroupRef = React.useRef(null);
    const options = columns;

    React.useEffect(() => {
        if (!open) {
            // setValue(valueProp);
        }
    }, [open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        // onClose(value);
        setOpen(false);
    };

    const handleChange = event => {
        // setValue(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Fragment>
            <Tooltip title="Filter columns">
                <IconButton
                    aria-label="filter columns"
                    onClick={handleOpen}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                disableBackdropClick
                maxWidth="xs"
                onEntering={handleEntering}
                aria-labelledby="confirmation-dialog-title"
                open={open}
                onClose={handleCancel}
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Filter Columns</DialogTitle>
                <DialogContent dividers>
                    <RadioGroup
                        ref={radioGroupRef}
                        aria-label="ringtone"
                        name="ringtone"
                        // value={value}
                        onChange={handleChange}
                    >
                        {options.map(option => (
                            <FormControlLabel value={option} key={option} control={<Checkbox />} label={option} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

ColumnsDialog.propTypes = {
    // onClose: PropTypes.func.isRequired,
    // open: PropTypes.bool.isRequired,
    // value: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

// export default function ConfirmationDialog() {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const [value, setValue] = React.useState('Dione');
//
//     const handleClickListItem = () => {
//         setOpen(true);
//     };
//
//     const handleClose = newValue => {
//         setOpen(false);
//
//         if (newValue) {
//             setValue(newValue);
//         }
//     };
//
//     return (
//         <div className={classes.root}>
//             <List component="div" role="list">
//                 <ListItem button divider disabled role="listitem">
//                     <ListItemText primary="Interruptions" />
//                 </ListItem>
//                 <ListItem
//                     button
//                     divider
//                     aria-haspopup="true"
//                     aria-controls="ringtone-menu"
//                     aria-label="phone ringtone"
//                     onClick={handleClickListItem}
//                     role="listitem"
//                 >
//                     <ListItemText primary="Phone ringtone" secondary={value} />
//                 </ListItem>
//                 <ListItem button divider disabled role="listitem">
//                     <ListItemText primary="Default notification ringtone" secondary="Tethys" />
//                 </ListItem>
//                 <ColumnsDialog
//                     classes={{
//                         paper: classes.paper,
//                     }}
//                     id="ringtone-menu"
//                     keepMounted
//                     open={open}
//                     onClose={handleClose}
//                     value={value}
//                 />
//             </List>
//         </div>
//     );
// }
