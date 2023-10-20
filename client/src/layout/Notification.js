import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiTrash } from 'react-icons/bi';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import {
    markNotificationAsRead,
    getNotificationsByUsername,
    deleteNotification
} from '../service/ApiService';

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
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem('username');

        if (username) {
            getNotificationsByUsername(username)
                .then(response => {
                    setNotifications(response);
                })
                .catch(error => {
                    console.error('알림 가져오기 오류:', error);
                });
        }
    }, []);

    const removeNotification = (index) => {
        const notificationId = notifications[index].id;
        deleteNotification(notificationId)
            .then(() => {
                const updatedNotifications = [...notifications];
                updatedNotifications.splice(index, 1);
                setNotifications(updatedNotifications);
            })
            .catch(error => {
                console.error('알림 삭제 오류:', error);
            });
    };

    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);

        const notificationId = updatedNotifications[index].id;
        markNotificationAsRead(notificationId)
            .then(response => {
            })
            .catch(error => {
                console.error('알림 읽음 표시 변경 오류:', error);
            });
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
