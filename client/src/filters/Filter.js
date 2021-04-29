import React from 'react';

export class Filter extends React.Component {
    render () {
        return (
            <div 
                className="filter"
                onClick={this.props.onClick}
                style={{background: this.props.color}}
                >
                {this.props.name}
            </div>
        )
    }
}

