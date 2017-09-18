import React from 'react';
import ReactMixin from 'react-mixin';

import BodyChild from './bodychild'
import MixinLog from './mixins'

import { Input } from 'antd';

const defaultProps = {
    age: 25
}

// 外部使用
export default class BodyIndex extends React.Component {

     constructor() {
        super()
        this.state = {username: "Peter"}
    }

    changeUser() {
        this.setState({
            username:"Wale Smith"
        })
        MixinLog.log()
    }

    handleChange(event) {
        this.setState({
            username:event.target.value
        })
    }

    render() {
        // setTimeout(()=>{
        //     this.setState({
        //         username: "Paker"
        //     })
        // }, 3000)

        return (
            <header>
                <h2> This is body </h2>
                <h3> Username: {this.state.username} Age: {this.props.age}</h3>
                <Input type='button' value='Submit' onClick={this.changeUser.bind(this)}/>
                <Input placeholder="Basic usage" />
                <BodyChild {...this.props} handleChange={this.handleChange.bind(this)}/>
            </header>
        )
    }
}

BodyIndex.propTypes = {
    age: React.PropTypes.number.isRequired
}

BodyIndex.defaultProps = defaultProps

ReactMixin(BodyIndex.prototype, MixinLog)