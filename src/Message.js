import React from 'react'

function Message(props) {
    return (
        <div>
            <h2>{props.text.username} : {props.text.txt}</h2>
        </div>
    )
}

export default Message
