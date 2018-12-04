import React from 'react';
import ReactDOM from 'react-dom'


export default  class MySearchField extends React.Component {
    // It's necessary to implement getValue
    getValue() {
        return ReactDOM.findDOMNode(this).value;
    }

    // It's necessary to implement setValue
    setValue(value) {
        ReactDOM.findDOMNode(this).value = value;
    }

    render() {
        return (
            <input
                className={`form-control`}
                type='text'
                defaultValue={this.props.defaultValue}
                placeholder={this.props.placeholder}
                onKeyUp={this.props.search}/>
        );
    }
}