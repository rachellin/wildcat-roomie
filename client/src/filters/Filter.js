import React from 'react';

export function Filter(props) {
    return (
        <div 
            className="filter"
            onClick={props.onClick}
            style={{background: props.color}}
            >
            {props.name}
        </div>
    )
}

