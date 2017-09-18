var React = require('react');
var ReactDOM = require('react-dom');

import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/bodyindex';

import 'antd/dist/antd.css';


export default class Index extends React.Component {

    render() {
        return (
        <div>
            <ComponentHeader />
            <BodyIndex age={20}/>
            <ComponentFooter />
        </div>
        )
    }
}


// class Index extends React.Component {
//     render() {
//         var username = 'Peter Paker'
//         var inputEnable = true
//         return (
//         <div>
//             <ComponentHeader />
//             <BodyIndex />
//             <p> {username == '' ? '用户未登录': '用户名' + username} </p>
//             <p> <input type='button' value='default button' disabled={inputEnable} /> </p>
//             <ComponentFooter />
//         </div>
//         )
//     }
// }

ReactDOM.render(
    <Index />,
    document.getElementById('app')
)