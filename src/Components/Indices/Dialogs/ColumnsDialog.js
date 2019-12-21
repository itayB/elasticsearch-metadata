
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
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
    const checkedColumns = Object.assign({}, ...columns.map(k => {return {[k]: true}}));

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

    const handleSave = () => {
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
                            <FormControlLabel
                                value={option}
                                key={option}
                                control={<Checkbox checked={checkedColumns[option]} />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
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
