import React from 'react';


// 外部使用
export default class BodyChild extends React.Component {

    render() {
        return (
            <div>
                <p>页面输入: <input type='text' onChange={this.props.handleChange}/> </p>
            </div>
        )
    }
}