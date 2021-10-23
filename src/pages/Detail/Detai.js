import React from 'react'

export default function Detai(props) {
    return (
        <div>
            Detail: {props.match.params.id} <br />
            Path: {props.match.path}
        </div>
    )
}
