import React, { useState, useEffect } from 'react';
import Wrapper from '../Wrapper';
import SingleGist from './SingleGist';
import Edit from './Edit';
import '../styles/Home.css';

const wrapper = new Wrapper();

export default function Home() {
    
    const [gists, setGists] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGist, setSelectedGist] = useState([])
    
    useEffect( async () => {
        const data = [];
        await wrapper.getRequest("/gists").then((res) => {
            
			res.data.forEach(({ id, files, description, raw }) => {
                const fileName = Object.keys(files)[0]
				const json = {
					id,
                    filename: fileName,
					files,
					description,
					raw: files[fileName].raw_url,
				};
				data.push(json);
			});
            setGists(data)
		});
    }, [])

    return (
        !isEditing ? (
            <div>
                <p className="title">Gists on your account:</p>
                <div className="container">
                    <ul>
                        {gists.map(gist => (
                        <SingleGist
                            gists={gists}
                            setGists={setGists}
                            key={gist.id}
                            id={gist.id} 
                            filename={gist.filename} 
                            description={gist.description} 
                            raw={gist.raw}
                            setIsEditing={setIsEditing}
                            setSelectedGist={setSelectedGist}       
                        />
                    ))}
                    </ul>
                </div>
            </div>
        ) : (
            <div>
                <p>You editing gist</p>
                <Edit selectedGist={selectedGist}/>
            </div>
        )
    )
}