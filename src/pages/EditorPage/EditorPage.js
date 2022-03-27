import React, { useEffect, useRef, useState } from 'react';
import Client from '../../components/Client/Client';
import Editor from '../../components/Editor/Editor';
import { initSocket } from '../../socket';
import Actions from '../../Actions';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {

    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();

    const { roomId } = useParams();

    const reactNavigator = useNavigate();

    const [clients, setClients] = useState([
        // { socketId: 1, username: "Ankit Biswal" },
        // { socketId: 2, username: "John Doe" },
        // { socketId: 3, username: "Jane Doe" },
        // { socketId: 4, username: "Sandeep S" },
        // { socketId: 5, username: "Ashirbad Mishra" },
        // { socketId: 6, username: "Sauryaman N" },
        // { socketId: 7, username: "Raj M" }
    ])

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect-error', (err) => handleErrors(err));
            socketRef.current.on('connect-failed', (err) => handleErrors(err));

            function handleErrors(e) {
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(Actions.JOIN, {
                roomId,
                username: location.state?.username
            });


            // joined event
            socketRef.current.on(Actions.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room`);
                    // console.log(`${username} joined the room`);
                }
                setClients(clients);
                socketRef.current.emit(Actions.SYNC_CODE, {
                    code: codeRef.current,
                    socketId
                })
            })

            // listening for disconnected event
            socketRef.current.on(Actions.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room`);
                setClients(prev => {
                    return prev.filter((client) => client.socketId != socketId);
                })
            })
        }

        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(Actions.JOINED);
            socketRef.current.off(Actions.DISCONNECTED);
        }
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success("Room ID copied to the clipboard");
        } catch (e) {
            toast.error("Couldn't copy room ID");
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }


    if (!location.state) {
        return <Navigate to='/' />
    }

    return (
        <div className='editorPage_wrapper'>
            <div className='aside'>
                <div className='aside-upper'>
                    <img className='editor-logo' src='https://res.cloudinary.com/ankitcloudinary/image/upload/v1648222469/real%20time%20code%20editor/code_along_logo-cropped_zj36tq.webp' alt='code along logo' />
                    <hr></hr>
                    <h4 className='connected-title'>Connected</h4>
                    <div className='all-clients'>
                        {clients.map(client => (
                            <Client key={client.socketId} username={client.username} />
                        ))}
                    </div>
                </div>
                <div className='aside-lower'>
                    <button className='btn copyBtn' onClick={copyRoomId}>Copy Room id</button>
                    <button className='btn leaveBtn' onClick={leaveRoom}>Leave Room</button>
                </div>
            </div>
            <div className='editor'>
                <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => codeRef.current = code} />
            </div>
        </div>
    )
}

export default EditorPage;