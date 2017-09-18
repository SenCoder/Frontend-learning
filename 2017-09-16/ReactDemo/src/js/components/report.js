import React from 'react';


export default class ComponetReport extends React.Component {

    render() {
        return (
            <div>
                {/* <h2> This is a report page </h2> */}
                 <h2> This is a report page: {this.props.match.params.id} </h2> 
            </div>
        )
    }
}