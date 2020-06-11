import React from 'react';
import { List } from 'semantic-ui-react'

const UserFamily = props => {
    if(!props.userDetails.families || props.userDetails.families.length < 1){
        return (
            "No family circles added yet."
        )
    }
    let family = props.userDetails.families.map(f => {
        return (
            <List.Item key={f._id}>{f.familyName}</List.Item>
        )
    })

    return (
        <List relaxed='very'>
            <h2>My Family Circles</h2>
            {family}
        </List>
    
    )
}

export default UserFamily