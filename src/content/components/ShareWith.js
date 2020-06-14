import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Checkbox, Container, Divider, Form, Message } from 'semantic-ui-react';


const ShareWith = props => {
    let [message, setMessage] = useState()
    let shareWithCopy = [...props.sharedWith]
    let [shareArray, setShareArray] = useState(shareWithCopy)
    let { id } = useParams()

    let handleCheck = (e, data) => {
        let newShareArray
        if (data.checked) {
            newShareArray = [...shareArray, data.value]
        } else {
            let idx = shareArray.indexOf(data.value)
            newShareArray = [...shareArray]
            newShareArray.splice(idx, 1)
        }
        setShareArray(newShareArray)
    }

    // submit sharing settings
    let handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit form with this shareArray", shareArray)
        let sharedWith = shareArray
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe/sharedWith/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                sharedWith
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Here is the response!", response)
                if (!response.ok) {
                    setMessage(`${response.status} : ${response.statusText}`)
                    return
                }
                response.json().then(result => {
                    console.log("result!", result)
                    console.log("PROPS? ", props.updateShare)
                    props.updateShare ? props.setUpdateShare(false) : props.setUpdateShare(true)
                })
            })
            .catch(err => {
                console.log('ERROR SHARING RECIPE WITH FAMILY CIRCLES', err)
            })

    }
    //if user has family circles, provide them as options to share recipe with
    if (props.userFamilies) {
        var display = props.userFamilies.map(f => {
            if (props.sharedWith.includes(f._id._id)) {
                return (
                    <Checkbox key={f._id._id} value={f._id._id} label={f._id.familyName} className="top-spacing pr" defaultChecked onChange={handleCheck} />
                )
            } else {
                return (
                    <Checkbox key={f._id._id} value={f._id._id} label={f._id.familyName} className="top-spacing pr" onChange={handleCheck} />
                )
            }
        })
    } else {
        display = (
            <><p>Add or join a family circle to share with.</p>
                <Button type="text" size={'mini'} basic color="teal" as={Link} to="/familycircle">To family circles</Button></>
        )
    }

    /**************************************************************************/
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