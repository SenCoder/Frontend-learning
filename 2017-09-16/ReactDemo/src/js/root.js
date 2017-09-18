import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
import ComponentList from './components/list'
import ComponentReport from './components/report'
// import {Router, Route, hashHistory} from 'react-router';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';


class Root extends React.Component {

    componentWillUpdate() {
        console.log('Root componentWillUpdate')
    }

    componentDidMount() {
        console.log('Root componentDidMount')
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/"> 首页 </Link></li>
                        <li><Link to="/list"> 列表 </Link></li>
                        <li><Link to="/report/666"> 报告 </Link></li>
                    </ul>

                    <Route exact path="/" component={Index} />
                    <Route path="/list" component={ComponentList} /> 
                    <Route path="/report/:id" component={ComponentReport} /> 
                </div>
            </Router>
        // <Router >
        //     <Route component={Index} path="/"> </Route>
        //     <Route component={ComponentList} path="list"> </Route> 
        // </Router>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
)