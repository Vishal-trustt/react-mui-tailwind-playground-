import React from "react";

function ConversationStats_figma() {
  return (
    <div className="frame">
      <div className="text-wrapper">Conversation Stats</div>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="text-wrapper-2">Total - 06</div>
            {/* <Divider className="divider-instance" /> */}
            <div className="div-4">
              <div className="icons-dark-wrapper">
                {/* <Message className="icons-dark" /> */}
              </div>
              <div className="text-wrapper-2">- 05</div>
            </div>
            {/* <Divider className="divider-instance" /> */}
            <div className="div-4">
              <img
                className="telephone"
                alt="Telephone"
                src="telephone-1.svg"
              />
              <div className="text-wrapper-2">- 01</div>
            </div>
          </div>
          <div className="div-5">
            <div className="frame-wrapper">
              <div className="div-3">
                <img className="img" alt="Whatsapp" src="whatsapp-2-1.svg" />
                <div className="text-wrapper-3">- 02</div>
              </div>
            </div>
            <div className="frame-wrapper">
              <div className="div-3">
                <img className="img" alt="Email" src="email-2-1.svg" />
                <div className="text-wrapper-3">- 02</div>
              </div>
            </div>
            <div className="frame-wrapper">
              <div className="div-3">
                <img className="img" alt="Imessage" src="imessage-1.svg" />
                <div className="text-wrapper-3">- 01</div>
              </div>
            </div>
            <div className="frame-wrapper">
              <div className="div-3">
                <img className="img" alt="Telegram" src="telegram-1.svg" />
                <div className="text-wrapper-3">- 01</div>
              </div>
            </div>
          </div>
        </div>
        {/* <Divider className="design-component-instance-node" /> */}
        <div className="div-6">
          <div className="div-wrapper">
            <div className="div-7">
              <div className="div-8">
                {/* <Clock className="icons-light-time" /> */}
                <div className="text-wrapper-4">
                  Avg time /&nbsp;&nbsp;conv.
                </div>
              </div>
              <div className="text-wrapper-5">2:41 min</div>
            </div>
          </div>
          <div className="div-wrapper">
            <div className="div-9">
              <div className="div-8">
                {/* <Clock className="icons-light-time" /> */}
                <div className="text-wrapper-4">Total time of conv.</div>
              </div>
              <div className="text-wrapper-5">10:18 hrs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationStats_figma;
