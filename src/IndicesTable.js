import * as React from "react";
import IndicesTableRow from "./IndicesTableRow";

class IndicesTable extends React.Component {

    state = { theme: null }

    resetTheme = evt => {
        evt.preventDefault();
        this.setState({ theme: null });
    }

    chooseTheme = (theme, evt) => {
        evt.preventDefault();
        this.setState({ theme });
    }

    render() {

        const { theme } = this.state;
        const themeClass = theme ? theme.toLowerCase() : 'secondary';

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Heap usage</th>
                    <th>CPU load</th>
                    <th>Disk usage</th>
                    <th>Shards</th>
                </tr>
                </thead>
                <tbody>
                {/*{Object.keys(json.data.available).map((k, i) => {*/}
                    {/*let data = json.data.available[k];*/}
                    {/*return (*/}
                        {/*<tr key={i}>*/}
                            {/*<td>{k}</td>*/}
                            {/*<td>{data.a}</td>*/}
                            {/*<td>{data.b}</td>*/}
                            {/*<td>{data.c}</td>*/}
                            {/*<td>{data.d}</td>*/}
                            {/*<td>{data.e}</td>*/}
                        {/*</tr>*/}
                    {/*);*/}
                {/*})}*/}
                {/*<IndicesTableRow value={['data-server-08575ea', 'Pie chart', 'Percentage', 'Pie chart', 1703]} />*/}

                </tbody>
            </table>
        );

    }

}

export default IndicesTable;
