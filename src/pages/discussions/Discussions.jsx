import React from 'react'
import './Discussions.css'
import { DiscussCard } from '../../components/discusscard/DiscussCard'

const Discussions = () => {
  return (
    <div className="maincon">
      <div className="discuss-topcon">
        <p className="heading">Discussions</p>
      </div>

      <div className="discuss-con">
        <div className="discusscard-list">
          <DiscussCard />
          <DiscussCard />
          <DiscussCard />
          <DiscussCard />
        </div>

        <div className="discuss-chats">
          <div className="discuss-chatcon card " >
            <div className="discusshead">
              <a href="" className="discussion-name">skdksk</a>
            </div>

            <div className="chat-area card">
              <div className="message left">
                <div className="left-chat">
                  <strong>Aakarsh</strong>
                  <p>Hello</p>
                </div>
              </div>

              <div className="message right">
                <div className="right-chat">
                  <strong>You</strong>
                  <p>Hello</p>
                </div>
              </div>
            </div>

          </div>
          <div className="chat-input">
            <form className="inputform">
              <input type="text" className="form-control messageInput" />
              <button type="submit" className="send-btn mainbtn btn btn-primary"><i className="fa-solid fa-paper-plane tag-icon"></i>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discussions