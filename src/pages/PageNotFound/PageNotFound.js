import React from 'react'

export default function PageNotFound(props) {
    return (
        <div>
            404 Not Found <br />
            Not Found path: {props.match.url}
        </div>
    )
}
