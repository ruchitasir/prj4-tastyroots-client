import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Form, Header, Message, Modal } from 'semantic-ui-react'

const FamilyCircleJoin= props=> {

    let [familyToken, setFamilyToken] = useState()
    let [redirect, setRedirect] = useState(false)
    let [message, setMessage] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'family', {
            method: 'PUT',
            body: JSON.stringify({
                familyToken
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
                    setRedirect(true)
                })
            })
            .catch(err => {
                console.log('ERROR SUBMITTING JOINING FAMILY FORM', err)
            })
            .finally(() => {
                document.getElementById("joinFamilyForm").reset();
            })
    }

    if (redirect) {
        return <Redirect to="/profile"/>
    }

   return(
            
            <Modal id='joinFamilyForm' trigger={<Button name='add' size="small" className="btn-outline">Join a Family Circle</Button>} size={"small"} as={Form} onSubmit={(e) => handleSubmit(e)} closeIcon>
                <Header icon='user circle' as="h1" content='Join a family circle' />
                {/*    <span className="red">{message}</span> */}
                <Modal.Content>
                    <Message info><p>Make sure your family token is at least 8 characters long.</p></Message>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Form.Input label="Family Token" name="familyToken" onChange={(e) => setFamilyToken(e.target.value)} required />
                        </Form.Field>
                    </Form.Group>
                </Modal.Content>
                <Modal.Actions>
                    <Button className="mauve-bg white-font" type="submit">Join Family Circle</Button>
                </Modal.Actions>
            {message ? <Message warning error header='Oops!' content={message}/> : ''}
            </Modal>
            
        )
    }

export default FamilyCircleJoin