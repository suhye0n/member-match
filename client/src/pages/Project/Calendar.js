import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {
    addCalendarEvent,
    getCalendarEventsByProjectKey,
    updateCalendarEvent,
    deleteCalendarEvent,
    createNotification,
    getAllProjects
} from "../../service/ApiService";

const CalendarContainer = styled.div`
    * {
        color: #000;
        padding: 0;
        margin: 0;
        background-color: transparent;
    }
    .rbc-calendar {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0px 2px 4px 0px #eceae5;
        background: rgba(224, 199, 195, 0.2) !important;
        border: none;
        margin-bottom: 30px;
    }
    .rbc-event {
        background-color: transparent;
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 60px 20px 20px 20px;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    width: 90%;
    max-height: 80%;
    max-width: 550px;
    overflow: auto;
    background: #fff !important;
    transition: opacity 0.9s ease;

    h2 {
        text-align: center;
    }
`;

const BlurBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    z-index: 998;
    transition: opacity 0.9s ease;
`;

const Input = styled.input`
  padding: 14px;
  margin: 8px 0 20px 0;
  width: calc(100% - 28px);
  max-width: 330px;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: bold;
  padding: 30px 0;
`;

const Button = styled.button`
  max-width: 358px;
  margin: 14px 15px;
  padding: 15px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  white-space: normal;
  overflow-wrap: break-word;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  transition: 0.4s;
  background: #97C8F0;

  &:hover {
    opacity: 0.7;
  }
`;

const CloseBtn = styled.button`
    text-align: center;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 38px !important;
    height: 38px !important;
    border-radius: 50%;
    padding: 10px;
    font-size: 1rem;
    background: #feaca9 !important;
    border: none;
    transition: 0.4s;
    cursor: pointer;
    white-space: normal;
    overflow-wrap: break-word;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 999;

    &:hover {
        opacity: 0.7;
    }
`;

const CustomCalendar = ({ projectId }) => {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
    });
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchCalendarEvents();
    }, []);

    const fetchCalendarEvents = () => {
        if (projectId) {
            getCalendarEventsByProjectKey(projectId)
                .then((response) => {
                    setEvents(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setNewEvent({ title: '', description: '' });
        setSelectedDate(null);
    };

    const handleSelectSlot = ({ start, end }) => {
        setSelectedDate(start);
        openModal();
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setEditedEvent(event);
    };

    const handleCloseEditor = () => {
        setSelectedEvent(null);
        setEditedEvent(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setEventTitle(value);
        }
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const sendEventNotification = async (eventType, projectId, eventTitle) => {
        try {
            const creator = localStorage.getItem('username');

            const projects = await getAllProjects();

            projects.forEach(async (project) => {
                if (project.key == projectId) {
                    const members = project.member.map((member) => member.name);

                    members.forEach(async (member) => {
                        if (creator != member) {
                            const notification = {
                                username: member,
                                text: `${creator}님이 "${eventTitle}" 일정을 ${eventType}했습니다.`,
                                date: new Date().toISOString(),
                                read: false,
                            };

                            await createNotification(notification);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('알림 전송 실패:', error);
        }
    };

    const handleAddEvent = () => {
        if (newEvent.title && selectedDate) {
            const start = selectedDate;
            const end = selectedDate;
            const creator = localStorage.getItem('username');

            addCalendarEvent({ title: newEvent.title, description: newEvent.description, start, end, creator, projectKey: projectId })
                .then(() => {
                    fetchCalendarEvents();
                    closeModal();
                    sendEventNotification('생성', projectId, eventTitle);
                })
                .catch((error) => {
                    console.error('Error adding calendar event:', error);
                });
        }
    };

    const handleEventChange = () => {
        if (editedEvent) {
            updateCalendarEvent(selectedEvent.id, editedEvent)
                .then(() => {
                    fetchCalendarEvents();
                    handleCloseEditor();
                    sendEventNotification('수정', projectId, editedEvent.creator, eventTitle);
                })
                .catch((error) => {
                    console.error('Error updating calendar event:', error);
                });
        }
    };

    const handleEventDelete = () => {
        deleteCalendarEvent(selectedEvent.id)
            .then(() => {
                fetchCalendarEvents();
                handleCloseEditor();
                sendEventNotification('삭제', projectId, selectedEvent.creator, eventTitle);
                alert('일정이 삭제되었습니다.');
            })
            .catch((error) => {
                console.error('Error deleting calendar event:', error);
            });
    };

    return (
        <CalendarContainer>
            <Calendar
                localizer={localizer}
                events={events}
                defaultView="month"
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                components={{
                    event: Event,
                }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                views={['month']}
            />

            {selectedEvent && (
                <EventEditor
                    event={editedEvent}
                    onChange={(event) => setEditedEvent(event)}
                    onUpdate={handleEventChange}
                    onDelete={handleEventDelete}
                    onClose={handleCloseEditor}
                />
            )}

            {isModalOpen && (
                <>
                    <BlurBackground open={isModalOpen} onClick={() => setModalOpen(false)} />
                    <Modal open={isModalOpen} onClose={closeModal} style={{ textAlign: 'center' }}>
                        <Title>일정 추가</Title>
                        <div>
                            <Input
                                type="text"
                                placeholder="제목"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder="설명"
                                name="description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button onClick={handleAddEvent}>추가</Button>
                        <Button className='cancel' onClick={closeModal}>취소</Button>
                    </Modal>
                </>
            )}
        </CalendarContainer>
    );
};

const Event = ({ event }) => {
    const displayTitle = event.title.length >= 12 ? event.title.substring(0, 11) + '...' : event.title;

    return (
        <div style={{ fontSize: '13px', padding: '0 5px' }}>
            <p title={event.title}>{displayTitle}</p>
        </div>
    );
};

const EventEditor = ({ event, onChange, onUpdate, onDelete, onClose }) => {
    return (
        <>
            <BlurBackground />
            <Modal style={{textAlign: 'center'}}>
                <Title>일정 수정</Title>
                <CloseBtn onClick={onClose}>X</CloseBtn>
                <div>
                    <Input
                        type="text"
                        placeholder="제목"
                        value={event.title}
                        onChange={(e) => onChange({ ...event, title: e.target.value })}
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder="설명"
                        value={event.description}
                        onChange={(e) => onChange({ ...event, description: e.target.value })}
                    />
                </div>
                <Button onClick={onUpdate}>수정</Button>
                <Button className='cancel' onClick={onDelete}>삭제</Button>
            </Modal>
        </>
    );
};

export default CustomCalendar;
