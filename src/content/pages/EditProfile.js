import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Loader, Input, TextArea } from 'semantic-ui-react';
import UploadWidget from '../components/UploadWidget'

const EditProfile = props => {
    let [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        // Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        // Make a call to a protected route
        fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response', response)
                // if not a good response
                if (!response.ok) {
                    return
                }
                // If we get a good response, set the user details
                response.json()
                    .then(result => {
                        setUserDetails(result)
                    })
            })
            .catch(err => {
                console.log("Error in profile", err)
            })
    }, [])



    if (!userDetails) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    return (
        <Container>
            <h1>Edit Profile</h1>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} label='First name' placeholder='First name' value={userDetails.firstname} />
                    <Form.Field control={Input} label='Last name' placeholder='Last name' value={userDetails.lastname} />
                </Form.Group>
                <Form.Field control={TextArea} label='Bio' placeholder="A little about me" value={userDetails.bio} />
                <UploadWidget />
                <Form.Group>
                    <Form.Button type="submit" color="teal" className="top-spacing">Save</Form.Button>
                </Form.Group>

            </Form>
        </Container>
    )
}

export default EditProfile