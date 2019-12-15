import React from 'react';
import MaterialTable from 'material-table';


export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
        columns: [
            {title: '',
                render: rowData => <a href={rowData.url} target='_blank'><img src={`${rowData.url}/favicon.ico`}
                                                                              style={{width: 20}}/></a>
            },
            {title: 'Alias', field: 'alias'},
            {title: 'Index', field: 'index'},
            {title: 'Section', field: 'section', type: 'numeric'},
            {title: 'Publisher', field: 'publisher'},
            {title: 'Name', field: 'name'},
            {title: 'Tier', field: 'tier', type: 'numeric'},
            {title: 'Count', type: 'numeric', render: rowData => rowData.count.toLocaleString()},
        ],
        data: query => new Promise((resolve, reject) => {
            let url = window.location.origin + '/api/v1/indices';
            fetch(url)
                .then(response =>
                    response.json()
                )
                .then(result => {
                    resolve({
                        data: result.data,
                        page: 1,
                        totalCount: result.data.length
                    })
                })
        })
        // data: [
        //     {
        //         index: 's_8767101_1575985370772',
        //         alias: 'products_8767101_sync',
        //         section: 8767101,
        //         publisher: 'URBN',
        //         name: 'Urban Outfitters',
        //         count: 151618,
        //         tier: 1,
        //         url: 'https://www.urbanoutfitters.com/',
        //     },
        //     {
        //         index: 's_8769380_1575980464585',
        //         alias: 'products_8769380_sync',
        //         section: 8769380,
        //         publisher: 'Lands End',
        //         name: 'USCD Production',
        //         count: 129130,
        //         tier: 1,
        //         url: 'https://www.landsend.com/',
        //     },
        // ],
    });

    return (
        <MaterialTable
            title="Indices Metadata Overview"
            columns={state.columns}
            data={state.data}
            // editable={{
            //     onRowUpdate: (newData, oldData) =>
            //         new Promise(resolve => {
            //             setTimeout(() => {
            //                 resolve();
            //                 if (oldData) {
            //                     setState(prevState => {
            //                         const data = [...prevState.data];
            //                         data[data.indexOf(oldData)] = newData;
            //                         return { ...prevState, data };
            //                     });
            //                 }
            //             }, 600);
            //         }),
            //     onRowDelete: oldData =>
            //         new Promise(resolve => {
            //             setTimeout(() => {
            //                 resolve();
            //                 setState(prevState => {
            //                     const data = [...prevState.data];
            //                     data.splice(data.indexOf(oldData), 1);
            //                     return { ...prevState, data };
            //                 });
            //             }, 600);
            //         }),
            // }}
        />
    );
}
