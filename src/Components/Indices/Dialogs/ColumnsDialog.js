import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from '@material-ui/icons/FilterList';
import {Checkbox} from "@material-ui/core";


export default function ColumnsDialog(props) {
    const { columns, onColumnsChange, ...other } = props;
    const [options, setOptions] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        setOptions(props.columns);
    }, [props.columns]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setOptions(columns);
    };

    const handleSave = () => {
        // onClose(value);
        setOpen(false);
        onColumnsChange(options);
    };

    const toggleHiddenFlag = option => { return {...option, hidden: !option.hidden}};

    const handleChange = event => {
        const column = event.target.value;
        setOptions(options.map(option => {
            return option.id !== column ? option : toggleHiddenFlag(option)
        }));
    };

    // const handleChange = event => {
    //     setValue(event.target.value);
    // };

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
                    <FormGroup
                        onChange={handleChange}
                    >
                        {options.map(option => (
                            <FormControlLabel
                                value={option.id}
                                key={option.id}
                                control={
                                    <Checkbox
                                        checked={!option['hidden']}
                                        onChange={handleChange}
                                        color='primary'
                                    />}
                                label={option.label}
                            />
                        ))}
                    </FormGroup>
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
