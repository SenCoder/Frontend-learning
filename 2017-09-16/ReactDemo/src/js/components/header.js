import React from 'react';

// 外部使用
export default class ComponentHeader extends React.Component {

    constructor() {
        super()
        this.state = {
            miniHeader: false
        }
    }

    switchHeader() {
        this.setState({
            miniHeader: !this.state.miniHeader
        })
    }

    render() {
        const styleComponentHeader = {
            header: {
                backgroundColor: "#333333",
                color: "#FFFFFF",
                 //     "padding-top": (this.state.miniHeader) ? "3px" : "15px",
                paddingTop: (this.state.miniHeader) ? "3px" : "15px",
                paddingBottom: (this.state.miniHeader) ? "3px" : "15px"
            }
        }
        return (
            <header style={styleComponentHeader.header} className="smallFontSize" 
            onClick={this.switchHeader.bind(this)}>
                <h1> This is head </h1>

            </header>
        )
    }
}