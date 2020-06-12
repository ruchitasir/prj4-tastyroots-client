import React, { useState } from 'react';
import { Button, Form, Header, Icon, Input, Label, Modal } from 'semantic-ui-react'

const FamilyAddModal = props => {

    let [familyName, setFamilyName] = useState()
    let [countryOrigin, setCountryOrigin] = useState()
    let [familyStory, setFamilyStory] = useState()
    let [familyToken, setFamilyToken] = useState()
    let [message, setMessage] = useState()

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
                    return
                }
                response.json().then(result => {
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
   

    return (
        <Modal id="famForm" trigger={<Icon name='add' size="large">Create a Family Circle</Icon>} size={"large"} as={Form}  onSubmit={handleSubmit}closeIcon>
            <Header icon="users" content="Create a Family Circle"></Header>
            <Modal.Content>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="Family Name" name="familyName" onChange={(e) => setFamilyName(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="Country of Origin" name="countryOrigin" onChange={(e) => setCountryOrigin(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.TextArea label="Family Bio" name="familyStory" onChange={(e) => setFamilyStory(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="Family Token" placeholder="Enter a special key your loved ones will use to join your family" name="countryOrigin" onChange={(e) => setFamilyToken(e.target.value)} />
                    </Form.Field>
                </Form.Group>
                <Modal.Actions>
                    <Button type="submit">Submit</Button>
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    )
}

export default FamilyAddModal