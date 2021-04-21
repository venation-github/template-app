import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import ImageUploader from 'react-images-upload';

export default function Addform(props) {
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [media, setmedia] = useState(null)

    function onDrop(picture) {
        console.log(picture[0], "<<<<<ada gak???")
        setmedia(picture[0])
    }

    function add() {
        const input = new FormData();
        input.append('title', title)
        input.append('media', media)
        input.append('content', content)

        Axios({
            url: '/post',
            method: 'post',
            data : input,
            headers: {
                "Content-Type": "multipart/form-data",
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                props.history.push('/')

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <>
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Add Reimbursment</h1>
            <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                encType="multipart/form-data"
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                }
                }>

                <div className="field">
                    <label className="label is-family-code">Title</label>
                    <input className="input" type="text" name="Title"
                        style={{ marginBottom: "30px" }}
                        placeholder="Title" onChange={e => settitle(e.target.value)} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Content</label>
                    <input className="input" type="text" name="Content"
                        style={{ marginBottom: "30px" }}
                        placeholder="Content" onChange={e => setcontent(e.target.value)} />
                </div>

                <ImageUploader
                    style={{ marginBottom: "30px" }}
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                />

                <button className="button is-black" type="submit">Submit</button>
            </form>
        </>
    )
}