import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Form, Header, Message, Modal } from 'semantic-ui-react'

const FamilyAddModal = props => {
    let [familyName, setFamilyName] = useState()
    let [countryOrigin, setCountryOrigin] = useState()
    let [familyStory, setFamilyStory] = useState()
    let [familyToken, setFamilyToken] = useState()
    let [message, setMessage] = useState()
    let [redirect, setRedirect] = useState(false)


    // *************************Submitting the form *************************
    const handleSubmit = (e) => {

        e.preventDefault()
        let creatorId = props.userDetails._id
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'family', {
            method: 'POST',
            body: JSON.stringify({
                familyName,
                countryOrigin,
                familyStory,
                familyToken,
                creatorId
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
                    console.log("MESSAGE", message)
                    return
                }
                response.json().then(result => {
                    setRedirect(true)
                    console.log("result!", result)

                })
            })
            .catch(err => {
                console.log('ERROR SUBMITTING FAMILY ADD FORM', err)
            })
            .finally(() => {
                document.getElementById('famForm').reset()
            })

    }
    console.log('redirect', redirect)
    if (redirect) {
        return <Redirect to="/profile" />
    }

    return (
        <Modal id="famForm" trigger={<Button name='add' size="small" basic color="purple" floated="right">Create a Family Circle</Button>} size={"large"} as={Form} onSubmit={handleSubmit} closeIcon>
            <Header icon="users" content="Create a Family Circle"></Header>
            <Modal.Content>
            <Message info><p>Make sure your family token is at least 8 characters long.</p></Message>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="Family Name" name="familyName" onChange={(e) => setFamilyName(e.target.value)} required />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="Country of Origin" name="countryOrigin" onChange={(e) => setCountryOrigin(e.target.value)} required />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.TextArea label="Family Bio" name="familyStory" onChange={(e) => setFamilyStory(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="Family Token" required placeholder="Enter a unique key for your loved ones to join you." name="countryOrigin" onChange={(e) => setFamilyToken(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Modal.Actions>
                    <Button type="submit">Submit</Button>
                </Modal.Actions>
            </Modal.Content>
            {message ? <Message warning error header='Oops!' content={message}/> : ''}
            {/* {toFamily} */}
        </Modal>
    )
}

export default FamilyAddModal