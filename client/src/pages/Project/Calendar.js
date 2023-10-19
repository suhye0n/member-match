import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { addCalendarEvent, getCalendarEventsByProjectKey, getCalendarEventById, updateCalendarEvent, deleteCalendarEvent } from "../../service/ApiService";
import { FaArrowLeft, FaArrowRight, FaRegCalendar, FaTrash } from 'react-icons/fa';

const CalendarContainer = styled.div`
    * {
        color: #000;
        padding: 0;
        margin: 0;
        background-color: transparent !important;
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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
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

const CustomCalendar = ({ projectId }) => {
    const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
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

    const handleEventChange = () => {
        if (editedEvent) {
            updateCalendarEvent(selectedEvent.id, editedEvent)
                .then(() => {
                    fetchCalendarEvents();
                    handleCloseEditor();
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
            })
            .catch((error) => {
                console.error('Error deleting calendar event:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleAddEvent = () => {
        if (newEvent.title && selectedDate) {
            const start = selectedDate;
            const end = selectedDate;
            const creator = 'YourCreatorValue';

            addCalendarEvent({ title: newEvent.title, description: newEvent.description, start, end, creator, projectKey: projectId })
                .then(() => {
                    fetchCalendarEvents();
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error adding calendar event:', error);
                });
        }
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
                    <Modal open={isModalOpen} onClose={closeModal}>
                        <h2>일정 추가</h2>
                        <div>
                            <label>제목:</label>
                            <input
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>설명:</label>
                            <input
                                type="text"
                                name="description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleAddEvent}>추가</button>
                        <button onClick={closeModal}>취소</button>
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
            <Modal>
                <h2>일정 수정</h2>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={event.title}
                        onChange={(e) => onChange({ ...event, title: e.target.value })}
                    />
                </div>
                <div>
                    <label>설명:</label>
                    <input
                        type="text"
                        value={event.description}
                        onChange={(e) => onChange({ ...event, description: e.target.value })}
                    />
                </div>
                <button onClick={onUpdate}>수정</button>
                <button onClick={onDelete}>삭제</button>
                <button onClick={onClose}>취소</button>
            </Modal>
        </>
    );
};

export default CustomCalendar;
