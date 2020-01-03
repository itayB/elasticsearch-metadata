import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Header } from './Layouts'
import MetaTable from "./Layouts/MetaTable";
import Snackbar from "@material-ui/core/Snackbar";
import AlertSnackbar from "./Layouts/AlertSnackbar";


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                hidden: true
            }
        };
    }

    updateAlert = alertData => {
        this.setState({
            alert: alertData
        })
    };

    handleAlertClose = () => {
        this.setState({
            alert: {
                // ...self.state.alert,
                hidden: true
            }
        });
    };

    renderAlert() {
        return <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={!this.state.alert.hidden}
            autoHideDuration={5000}
            onClose={this.handleAlertClose}
        >
            <AlertSnackbar
                onClose={this.handleAlertClose}
                variant="error"
                message={this.state.alert.message}
            />
        </Snackbar>;
    }

    render() {
        return <Fragment>
            <CssBaseline />
            <Header/>
            {/*<Configuration/>*/}
            <div>
                <MetaTable
                    onError={this.updateAlert}
                />
                {this.renderAlert()}
            </div>
            {/*<Footer/>*/}
        </Fragment>;
    }
}
