import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Divider, Form, Loader, Input, TextArea } from 'semantic-ui-react';


const EditProfile = props => {
    let [userDetails, setUserDetails] = useState(null)
    let [message, setMessage] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [biography, setBiography] = useState('')
    let [imageUrl, setImageUrl] = useState('')
    let [redirect, setRedirect] = useState(false)
    let toProfile


    //Cloudinary widget + picture upload
    var checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            setImageUrl(resultEvent.info.secure_url)
        }

        console.log("SUCCESS IMAGE", imageUrl)
    }
    let widget = window.cloudinary.createUploadWidget({
        cloudName: "tasty-roots",
        cropping: true,
        croppingAspectRatio: 1.0,
        maxImageWidth: 500,
        maxImageHeight: 500,
        uploadPreset: "tasty-roots",
        croppingCoordinatesMode: 'custom'
    },
        (error, result) => {
            checkUploadResult(result)
        })

    const showWidget = (widget, e) => {
        e.preventDefault()
        widget.open()
    }

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
    if (!props.user) {
        return (
        <Redirect to="/" />
        )
      }
    /**************** Submitting the form ***************************************/

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("IMAEG---------", imageUrl)
        let token = localStorage.getItem('boilerToken')
        let firstname = firstName
        let lastname = lastName
        let bio = biography
        let picture = userDetails.picture
        if (imageUrl) {
            picture = imageUrl
        }
        if (!firstName) {
            firstname = userDetails.firstname
        }
        if (!lastName) {
            lastname = userDetails.lastname
        }
        if (!biography) {
            bio = userDetails.bio
        }

        fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            method: 'PUT',
            body: JSON.stringify({
                firstname,
                lastname,
                bio,
                picture
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
        toProfile = <Redirect to="/profile" />
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
                    <Form.Field name="firstname" control={Input} label='First name'
                        placeholder='First name' defaultValue={userDetails.firstname}
                        onChange={(e) => setFirstName(e.target.value)} required />
                    <Form.Field name="lastname" control={Input} label='Last name'
                        placeholder='Last name' defaultValue={userDetails.lastname}
                        onChange={(e) => setLastName(e.target.value)} required />
                </Form.Group>
                <Form.Field name="bio" control={TextArea} label='Bio' placeholder="A little about me" defaultValue={userDetails.bio} onChange={(e) => setBiography(e.target.value)} />
                <Form.Group>
                    <Button className="btn-outline" onClick={(e) => showWidget(widget, e)} type="text">Upload</Button>
                    <p className="url">{imageUrl}</p>
                </Form.Group>
                <Divider />
                <Form.Group>
                    <Button type="submit" className="mauve-bg white-font top-spacing" textAlign='center'>Save</Button>
                </Form.Group>
            </Form>
            {toProfile}
        </Container>
    )
}

export default EditProfile