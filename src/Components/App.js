import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Layouts'
import Configuration from './Configurations';
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
