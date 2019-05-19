import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import RoomList from '../components/RoomList';
import NewRoomForm from '../components/NewRoomForm';
import '../style.scss'

import { userActions } from '../_actions';
import { tokenUrl, instanceLocator } from '../config';

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: getRandomUser(1,9),
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        });

        chatManager.connect().then(currentUser => {
            console.log('currentUserrrrr', currentUser)
            this.currentUser = currentUser
            this.getRooms()
        }).catch(err => console.log('error on connecting: ', err))
    }

    getRooms() {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log('error on joinableRooms: ', err))
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    console.log('messsagggge')
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
            .then(room => {
                this.setState({
                    roomId: room.id
                })
                this.getRooms()
            })
            .catch(err => console.log('error on subscribing to room: ', err))
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }

    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log('error with createRoom: ', err))
    }

    render() {
        // const { user, users } = this.props;
        return (
            <div className="app col-md-10 col-md-offset-1">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />
                <MessageList
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage} />
                <NewRoomForm createRoom={this.createRoom} />
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

// test function no longer used
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

function getRandomUser(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return ('Hacker10' + (Math.floor(Math.random() * (max - min)) + min)).toString();
  }

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };