import React from 'react';
import { Link } from 'react-router-dom';
import { List, Icon } from 'semantic-ui-react'

const UserFamily = props => {
    if (props.userDetails.families === undefined || props.userDetails.families.length == 0) {
        var family = (
            <List.Item>
                No family circles yet.
            </List.Item>
        )
    }


    family = props.userDetails.families.map(fam => {
        if (!fam._id) {
            return (
                <List.Item>
                    -
                </List.Item>
            )
        }
        return (
            <List.Item key={fam._id._id}>
                <Icon name='users' />
                <List.Content>
                    <List.Header as={Link} to={`/family/${fam._id._id}`}>{fam._id.familyName}</List.Header>
                    {fam.userRole === 'creator' ? <List.Description>Family Token: {fam._id.familyToken}</List.Description> : <List.Description>Member</List.Description>}
                </List.Content>
            </List.Item>
        )
    })


    return (
        <List relaxed='very'>
            <h2>My Family Circles</h2>
            {family} 
            <List.Item>
                {/* <Icon name='add' /> Join a family circle */}
            </List.Item>
        </List>

    )
}

export default UserFamily
