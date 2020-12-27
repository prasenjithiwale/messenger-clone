import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './Message.css';


function Message(props) {
    const isUser = props.usr === props.text.username;
    return (
        <div className={`ext_msg ${isUser && 'usr_msg'}`}>
            <Card className={isUser ? 'user_card' : 'guest_card'}>
                <CardContent>
                    <Typography
                        color="textSecondary"
                        variant="h5"
                        component="h2"
                    >
                    {props.text.username} : {props.text.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message
