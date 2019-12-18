import React, { Component, Fragment } from 'react';
import { Header } from './Layouts'
import MetaTable from "./Layouts/MetaTable";


export default class extends Component {
    render() {
        return <Fragment>
            <Header/>
            {/*<Configuration/>*/}
            <MetaTable/>
            {/*<Footer/>*/}
        </Fragment>;
    }
}
