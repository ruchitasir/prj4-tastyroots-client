import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Form, Loader, Input, TextArea } from 'semantic-ui-react';
import UploadWidget from '../components/UploadWidget'

const EditProfile = props => {
    let [userDetails, setUserDetails] = useState(null)
    let [message, setMessage] = useState('')
    let [firstname, setFirstName] = useState('')
    let [lastname, setLastName] = useState('')
    let [bio, setBio] = useState('')
    let [redirect, setRedirect] = useState(false)

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

    /**************** Submitting the form ***************************************/

    const handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            method: 'PUT',
            body: JSON.stringify({
                firstname,
                lastname,
                bio
                // picture
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
                console.log('ERROR UPDATING USER PROFILE', err)
            })
       
        
    }
        if (redirect) {
            return (
                <Redirect to="/profile" />
            )
        }
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
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group widths='equal'>
                        <Form.Field name="firstname" control={Input} label='First name' placeholder='First name' defaultValue={userDetails.firstname} onChange={(e) => setFirstName(e.target.value)} />
                        <Form.Field name="lastname" control={Input} label='Last name' placeholder='Last name' defaultValue={userDetails.lastname} onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Field name="bio"control={TextArea} label='Bio' placeholder="A little about me" defaultValue={userDetails.bio} onChange={(e) => setBio(e.target.value)} />
                    <UploadWidget />
                    <Form.Group>
                        <Form.Button type="submit" color="teal" className="top-spacing">Save</Form.Button>
                    </Form.Group>

                </Form>
            </Container>
        )
    }

    export default EditProfile