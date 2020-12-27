import React, {forwardRef} from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './Message.css';


const  Message = forwardRef(({msg, user}, ref) => {
    const isUser = user === msg.username;
    return (
        <div ref={ref} className={`ext_msg ${isUser && 'usr_msg'}`}>
            <Card className={isUser ? 'user_card' : 'guest_card'}>
                <CardContent>
                    <Typography
                        color="textSecondary"
                        variant="h5"
                        component="h2"
                    >
                    {!isUser && `${msg.username || 'Unknown User'} :`} {msg.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
});

export default Message
