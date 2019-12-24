import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Header } from './Layouts'
import MetaTable from "./Layouts/MetaTable";


export default class extends Component {
    render() {
        return <Fragment>
            <CssBaseline />
            <Header/>
            {/*<Configuration/>*/}
            <MetaTable/>
            {/*<Footer/>*/}
        </Fragment>;
    }
}
