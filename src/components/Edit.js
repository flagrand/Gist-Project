import React, { useState } from 'react';
import Wrapper from '../Wrapper'

const Edit = ({selectedGist}) => {
const [content, setContent] = useState(selectedGist.content);
const wrapper = new Wrapper();

const makeJson = () => {
    const json = {
        files: {
            [selectedGist.filename]: {content},
        },
    };
    return JSON.stringify(json);
};


    
return (
    <form>
        <input type="text" value={selectedGist.filename} onChange={(e)=> {
            console.log(e.target.value)
        }}/>
        <textarea value={content} onChange={(e)=> {
            setContent(e.target.value)
        }}/>
        <button onClick={(e)=> {
            e.preventDefault()
            wrapper.updateGist(selectedGist.id,makeJson()).then(res=>{
                if(res.status===200){
                    window.location.reload();
                }
            })
        }}>Edit</button>
    </form>
)}
    


export default Edit