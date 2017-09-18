import React from 'react';

var footerCss = require("../../css/footer.css");

// 外部使用
export default class ComponentFooter extends React.Component {

    render() {
        return (
            <footer className={footerCss.miniFooter}>
                <h1> This is foot </h1>
            </footer>
        )
    }
}