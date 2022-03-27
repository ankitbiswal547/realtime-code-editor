import React, { useState } from 'react';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        const id = uuid();
        setRoomId(id);
        toast.success("Created a new room");
        // console.log(id);
    }

    const ridChangeHandler = (e) => {
        setRoomId(e.target.value);
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let valid = true;

        if (roomId === "" && username === "") {
            toast.error("Invalid ROOM ID and USERNAME");
            valid = false;
        } else if (roomId === "") {
            toast.error("Enter a valid ROOM ID to proceed");
            valid = false;
        } else if (username === "") {
            toast.error("Enter a valid USERNAME to proceed")
            valid = false;
        }

        if (!valid) return;
        setRoomId('');
        setUsername('');

        navigate(`/editor/${roomId}`, {
            state: {
                username
            }
        });
    }

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }

    const checkEnterKey = (e) => {
        if (e.code === "Enter") {
            formSubmitHandler(e);
        }
    }

    return (
        <>
            <form className='form-wrapper' onSubmit={formSubmitHandler}>
                <input className='form-input' onChange={ridChangeHandler} onKeyUp={checkEnterKey} value={roomId} type="text" placeholder="ROOM ID" />
                <input className='form-input' onChange={usernameChangeHandler} onKeyUp={checkEnterKey} value={username} type="text" placeholder="USERNAME" />
                <button className='btn join-btn'>Join</button>
            </form>
            <div className='no-room-info'>
                If you don't have an invite then create &nbsp;
                <button onClick={createNewRoom} className='btn newRoomBtn'>new room</button>
            </div>
        </>
    )
}

export default Form;