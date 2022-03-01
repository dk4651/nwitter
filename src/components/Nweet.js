import React,{useState} from 'react';
import { deleteDoc, doc,updateDoc} from 'firebase/firestore';
import { dbService } from 'fbase';



const NNweet = ({nweetObj,isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    //console.log(nweetObj)
    

    const onDeleteClick= async()=> {
        const ok = window.confirm('Are you sure to delte?')
        if(ok){
            await deleteDoc(doc(dbService,'nweet',`${nweetObj.id}`))

        }
    }

    const onChange = (event) => { 
        const {target : {value}} = event;
        setNewNweet(value);
    }
    const onEditClick = () => {
        setEditing(true)

    }

    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(doc(dbService,'nweet',`${nweetObj.id}`),{
            text:newNweet
        })
        setEditing(false);

    }
    const toggleEditing = () =>{
        setEditing((prev) => !prev)
    }
    return(
    <div>
        {editing ? 
            <>
            <form onSubmit={onSubmit}>
            <input onChange={onChange} value = {newNweet} type ='text' placeholder='You can edit nweet'/> 
            <input type = 'submit' value = 'Edit'></input>
            </form>
            <button onClick ={toggleEditing}>Cancel</button>
            </>
            : 
            <>
            <h4>{nweetObj.text}</h4>
            {isOwner&&
            <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={onEditClick}>Edit Nweet</button>
            </>}
            </>
        }
    </div>
    )

};

export default NNweet;
