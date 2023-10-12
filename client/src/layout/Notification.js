import React, { useState } from 'react';
import styled from 'styled-components';
import { BiTrash } from 'react-icons/bi';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

const Btns = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
`;

const Date = styled.div`
    color: #666;
    font-size: 13px;
    margin-bottom: 5px;
`;

const Container = styled.div`
    width: 80%;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    z-index: 10;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    background: ${(props) => (props.read ? '#DDDDDD' : 'rgba(196, 216, 243, .2)')};

    button {
        display: inline;
        margin-top: 14px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background: transparent;
        border: none;
        border-radius: 50px;
        transition: 0.4s;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: break-word;

        &:hover {
            opacity: 0.7;
        }
      } 
`;

const Notification = () => {
    const [notifications, setNotifications] = useState([
        {
            text: '알림 1 내용',
            date: '2023-10-09',
            read: false,
        },
        {
            text: '알림 2 내용',
            date: '2023-10-08',
            read: true,
        },
        {
            text: '알림 3 내용',
            date: '2023-10-07',
            read: false,
        },
        {
            text: '알림 4 내용',
            date: '2023-10-06',
            read: false,
        },
        {
            text: '알림 5 내용',
            date: '2023-10-05',
            read: false,
        },
    ]);

    const removeNotification = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(index, 1);
        setNotifications(updatedNotifications);
    };

    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    };

    return (
        <div>
            {notifications.map((notification, index) => (
                <Container key={index} read={notification.read}>
                    <Btns>
                        <button onClick={() => markAsRead(index)}>
                            {notification.read ? <PiEyeBold /> : <PiEyeClosedBold />}
                        </button>
                        <button onClick={() => removeNotification(index)}><BiTrash /></button>
                    </Btns>
                    <Date>{notification.date}</Date>
                    <div>{notification.text}</div>
                </Container>
            ))}
        </div>
    );
};

export default Notification;
