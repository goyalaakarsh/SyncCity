import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Sendbird from 'sendbird';
import axios from 'axios';
import './Discussions.css'
import { DiscussCard } from '../../components/discusscard/DiscussCard'

const sb = new Sendbird({ appId: '8FB5D264-B981-4E57-8B58-61FFC8937342' });

const Discussions = () => {

  const [channels, setChannels] = useState([]); 
  const [selectedChannel, setSelectedChannel] = useState(null); // Store the selected channel
  const [messages, setMessages] = useState([]); // Store the messages in the chat area
  const [newMessage, setNewMessage] = useState(''); // Store the message to be sent
  const [user, setUser] = useState(null); // State to store the user object
  const chatEndRef = useRef(null);


  useEffect(() => {
    // Function to fetch user data from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          withCredentials: true,
        }); // Adjust endpoint to your backend
        const fetchedUser = response.data; // Assuming the user object is in the response data
        setUser(fetchedUser);
      
        console.log(fetchedUser);
        
        
        // Now connect the user to SendBird using userId from the fetched user object
        sb.connect(fetchedUser.id, (sendbirdUser, error) => {
          if (error) {
            console.error('Failed to connect:', error);
            return;
          }
          console.log('User connected to Sendbird:', sendbirdUser);
        });
      } catch (error) {
        console.error('Error fetching user data from backend:', error);
      }
    };
  
    // fetchUserData(); // Fetch user data and connect to Sendbird
  
    // Fetch channels from your backend
    const fetchChannels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/chat/get-channels', {
          withCredentials: true,
        }); // Replace with your backend API
        // setChannels(response.data['Group Channels']['channels']); // Assuming the API returns channels in data
        const fetchedChannels = response.data['Group Channels']['channels'];
        // console.log("Relevant Channels have been set");

        setChannels(fetchedChannels);
        console.log('Channels fetched:', fetchedChannels);

        console.log(channels);

        
      } catch (error) {
        console.error('Error fetching channels from backend:', error);
      } 
    };  
    // fetchChannels(); // Fetch the channels when the component loads

    // Call both fetch functions
    const initializeData = async () => {
      await fetchUserData();  // Ensure user data is fetched and connected
      await fetchChannels();  // Ensure channels are fetched after the user connects
    };

    initializeData(); // Run initialization function


  }, []);
  

  // Function to load messages for a selected group channel
  const loadMessages = (channel) => {
    const messageListQuery = channel.createPreviousMessageListQuery();
    messageListQuery.limit = 20; // Fetch last 20 messages
    messageListQuery.load((fetchedMessages, error) => {
      if (error) {
        console.error('Error loading messages:', error);
        return;
      }
      setMessages(fetchedMessages);
    });
  };

  // Function to connect to a group channel
  const connectToGroupChannel = (channelUrl) => {
    sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        console.error('Error fetching group channel:', error);
        return;
      }
      console.log('Connected to group channel:', channel);
      setSelectedChannel(channel); // Set the selected channel
      loadMessages(channel); // Load messages for the selected channel
      setUpMessageListener(channel); // Set up real-time listener
    });
  };

  // Function to send a message to the selected channel
  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedChannel || !newMessage.trim()) return;

    const params = new sb.UserMessageParams();
    params.message = newMessage;

    selectedChannel.sendUserMessage(params, (message, error) => {
      if (error) {
        console.error('Error sending message:', error);
        return;
      }
      setMessages((prevMessages) => [...prevMessages, message]); // Add the sent message to the chat
      setNewMessage(''); // Clear the input field
    });
  };

  // Function to set up a listener for new messages
  const setUpMessageListener = (channel) => {
    const handler = new sb.ChannelHandler();
    handler.onMessageReceived = (receivedChannel, message) => {
      if (receivedChannel.url === channel.url) {
        setMessages((prevMessages) => [...prevMessages, message]); // Add the new message to the chat
      }
    };
    sb.addChannelHandler('unique_handler_id', handler);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="maincon">
      <div className="discuss-topcon">
        <p className="heading">Discussions</p>
      </div>

      <div className="discuss-con">
        {/* Left side: List of discussion cards */}
        <div className="discusscard-list">
          {/* Replace with your actual DiscussCard logic */}
          {channels.map((channel) => (
            <DiscussCard 
              key={channel.channel_url} 
              channel={channel} 
              onClick={connectToGroupChannel}
            />
          ))}
        </div>

        {/* Right side: Chat window */}
        <div className="discuss-chats">
          <div className="discuss-chatcon card">
            <div className="discusshead">
              <a href="#" className="discussion-name">
                {selectedChannel ? selectedChannel.name : 'Select a channel'}
              </a>
            </div>

            {/* Chat Area */}
            <div className="chat-area card">
              {messages.map((message) => (
                <div
                  key={message.messageId}
                  className={`message ${message.sender.userId === sb.currentUser.userId ? 'right' : 'left'}`}
                >
                  <div className={`${message.sender.userId === sb.currentUser.userId ? 'right-chat' : 'left-chat'}`}>
                    <strong>{message.sender.nickname || 'You'}</strong>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
               <div ref={chatEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="chat-input">
            <form className="inputform" onSubmit={sendMessage}>
              <input
                type="text"
                className="form-control messageInput"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit" className="send-btn mainbtn btn btn-primary">
                <i className="fa-solid fa-paper-plane tag-icon"></i> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions