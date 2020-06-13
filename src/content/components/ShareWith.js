import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Checkbox, Container, Divider, Form, Message } from 'semantic-ui-react';


const ShareWith = props => {
    let handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit form")
    }

    let handleCheck = (e) => {
        console.log('this is the family being added', e.target.value)
    }

    //if user has family circles, provide them as options to share recipe with
    if (props.userFamilies) {
        var display = props.userFamilies.map(f => {
            console.log("shared with who?", f)
            console.log("WHERE THEM RECIPE shared at", props.recipeData)
            if (props.sharedWith.includes(f._id._id)) {
                return (
                    <Checkbox key={f._id._id}  value={f._id._id} label={f._id.familyName} className="top-spacing pr" defaultChecked onClick={(e)=> handleCheck}/>
            )} else {
                return (
                    <Checkbox key={f._id._id}  value={f._id._id} label={f._id.familyName} className="top-spacing pr" onClick={(e)=> handleCheck}/>
            )}
        })
    } else {
        display = (
            <><p>Add or join a family circle to share with.</p>
                <Button type="text" size={'mini'} basic color="teal" as={Link} to="/familycircle">To family circles</Button></>
        )
    }


    return (
        <Container textAlign="center">
            <Divider horizontal />
            <Message info>
                <Message.Header>Who do you want to share this recipe with?</Message.Header>
                <Form onSubmit={handleSubmit}>
                    {display}
                    <Divider horizontal />
                    {(props.userFamilies) ? <Button type="submit" size={'mini'} basic color="teal">Save</Button> : null}
                </Form>
            </Message>
        </Container>
    )
}

export default ShareWith