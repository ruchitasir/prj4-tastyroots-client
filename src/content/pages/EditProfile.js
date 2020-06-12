import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button,Container, Form, Loader, Input, TextArea } from 'semantic-ui-react';


const EditProfile = props => {
    let [userDetails, setUserDetails] = useState(null)
    let [message, setMessage] = useState('')
    let [firstname, setFirstName] = useState('')
    let [lastname, setLastName] = useState('')
    let [bio, setBio] = useState('')
    let [imageUrl, setImageUrl] = useState('')

    let handleFirstName = (e) => {setFirstName(e.target.value)}
    let handleLastName = (e) => {setLastName(e.target.value)}
    let handleBio = (e) => { setBio(e.target.value)}
    

    //Cloudinary widget + picture upload
    var checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            setImageUrl(resultEvent.info.secure_url)
        }
    }
    let widget = window.cloudinary.createUploadWidget({
        cloudName: "tasty-roots",
        cropping: true,
        croppingAspectRatio: 1.0,
        maxImageWidth: 500,
        maxiImageHeight: 500,
        uploadPreset: "tasty-roots"
    },
        (error, result) => {
            checkUploadResult(result)
        })

    const showWidget = (widget) => {
        widget.open()
    }
    
    console.log("SUCCESS IMAGE", imageUrl)



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
        let picture = userDetails.picture
        if (imageUrl) {
            picture = imageUrl
        }
        if (!firstname) {
            setFirstName(userDetails.firstname)
        }
        if (!lastname) {
            setLastName(userDetails.lastname)
        }
        if (!bio) {
            setBio(userDetails.bio)
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
                })
            })
            .catch(err => {
                console.log('ERROR UPDATING USER PROFILE', err)
            })
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
                    placeholder='First name' defaultValue={userDetails.firstname} onChange={handleFirstName} required/>
                    <Form.Field name="lastname" control={Input} label='Last name' 
                    placeholder='Last name' defaultValue={userDetails.lastname} onChange={handleLastName} required/>
                </Form.Group>
                <Form.Field name="bio" control={TextArea} label='Bio' placeholder="A little about me" defaultValue={userDetails.bio} onChange={handleBio} />
                <Form.Group>
                    <Form.Input
                        label="Profile Pic"
                        action={{ content: "Upload", icon: "cloud upload", onClick:()=> {showWidget(widget)}}}
                        name="picture" value={imageUrl}
                        width={16}
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" color="teal" className="top-spacing" 
                    as={Link} to='/profile'>Save</Button>
                </Form.Group>

            </Form>
        </Container>
    )
}

export default EditProfile