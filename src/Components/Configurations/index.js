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
            {title: 'Section', field: 'eCommerceId', type: 'numeric'},
            {title: 'eCommerce Name', field: 'eCommerceName'},
            {title: 'Name', field: 'name'},
            {title: 'Tier', field: 'tier', type: 'numeric'},
            {title: 'Count', type: 'numeric', render: rowData => rowData.docs.count.toLocaleString()},
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
