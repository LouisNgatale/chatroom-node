// @flow
import * as React from 'react';
import styled from "styled-components";

type Props = {
    message: string,
    date: string,
    sender: string,
};

export function MessageItem(props: Props) {
    return (
        <div>
            <MessageCard>
                {props.message}
                <MessageDetails>
                    <caption>{props.date}</caption>
                    <caption>{props.sender}:Sent By</caption>
                </MessageDetails>
            </MessageCard>
        </div>
    );
}

const MessageCard = styled.div`
  border: 1px solid #b7b7b7;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
  
  hr{
    margin: 5px 0;
  }
`;


const MessageDetails = styled.div`
  display: flex;
  justify-content: space-between;
  caption{
    padding: 0;
  }
`;