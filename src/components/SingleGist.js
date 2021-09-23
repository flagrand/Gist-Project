import React, {useEffect, useState} from "react";
import Wrapper from '../Wrapper';
import '../styles/SingleGist.css';

const SingleGist = ({id, filename, description, raw, setIsEditing, setSelectedGist, gists, setGists}) => {
    const [content, setContent] = useState("")
    const wrapper = new Wrapper()

    useEffect(() => { 
        const getContent = async () => {
            const response = await fetch(raw)
			const data = await response.text()
            setContent(data)
        }
        getContent()
    },[])

    return (
        <div className="gist">
            <div className="filename">{filename}</div>
            <div className="description">{description}</div>
            <div className="content">{content}</div>
            <button className="btnEdit" onClick={(e) => {
                e.preventDefault()
                setIsEditing(true)
                setSelectedGist(
                    {id,
                    filename,
                    description,
                    content}
                )
            }}>Edit</button>
            <button className="btnDel" onClick={
                (e) => {
                    e.preventDefault()
                    wrapper.deleteGist(id)
                    const updateArray = gists.filter((gist) => gist.id !== id)
                    setGists(updateArray)
                }
            }>Delete</button>
        </div>
    )
}

export default SingleGist