import * as React from "react";

class IndicesTableRow extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: [],
    //     };
    // }

    render() {

        return (
            <tr>
                <td >{this.props.value[0]}</td>
                <td>{this.props.value[1]}</td>
                <td>{this.props.value[2]}</td>
                <td>{this.props.value[3]}</td>
                <td>{this.props.value[4]}</td>
            </tr>
        );

    }

}

export default IndicesTableRow;
