import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

const UploadWidget = props => {
    let [imageUrl, setImageUrl] = useState('')
    //Cloudinary widget + picture upload
    let checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            setImageUrl(resultEvent.info.secure_url)
        }
    }
    console.log("SUCCESS IMAGE", imageUrl)
    let widget = window.cloudinary.createUploadWidget({
        cloudName: "tasty-roots",
        cropping: true,
        croppingAspectRatio: 1.0,
        maxImageWidth: 400,
        maxiImageHeight: 400,
        uploadPreset: "tasty-roots"
    },
        (error, result) => {
            checkUploadResult(result)
        })
    const showWidget = (widget) => {
        widget.open()

    }

    return (
        <Form.Group>
            <Form.Input
                label="Profile Pic"
                action="Upload"
                name="picture" value={imageUrl}
                onClick={() => showWidget(widget)}
                width={16}
            />
        </Form.Group>
    )
}

export default UploadWidget