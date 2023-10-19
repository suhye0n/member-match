import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BiTrash, BiMessageSquareDetail } from 'react-icons/bi';
import { getAllReports, updateState, deleteReport } from "../../service/ApiService";

const Heading = styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 20% 50px 20%;
    background: url('/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 20% 50px 20%;
    background: #fff;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    background: rgba(196, 216, 243, .2);
    padding: 20px;
    margin-bottom: 30px;

    h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        align-items: center;

        span {
            margin-right: 10px;
        }
    }

    button {
        margin-top: 14px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background: #A9EAFE;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: break-word;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }

    svg {
        margin-left: auto;
        margin-right: 20px;
        cursor: pointer;
        transition: .4s;

        &:hover {
            opacity: 0.6;
        }
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
    animation: ${(props) => (props.open ? fadeIn : fadeOut)} .4s ease;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0px 2px 4px 0px #eceae5;
    padding: 20px;
    width: 90%;
    max-width: 550px;
    text-align: center;

    h2 {
        text-align: center;
    }

    button {
        display: inline;
        width: calc(50% - 8px);
        margin-top: 14px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background: #A9EAFE;
        border: none;
        border-radius: 50px;
        transition: 0.4s;
        cursor: pointer;
        white-space: normal;
        overflow-wrap: break-word;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);

        &:hover {
            opacity: 0.7;
        }
    }

    .cancel {
        background: #feaca9;
        margin-left: 15px;
    }
`;

const BlurBackground = styled.div`
    animation: ${(props) => (props.open ? fadeIn : fadeOut)} .4s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    z-index: 998;
`;

const Input = styled.input`
    padding: 14px;
    margin: 8px 0 20px 0;
    width: calc(100% - 28px);
    border-radius: 5px;
    border: none;
    box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Select = styled.select`
    padding: 14px;
    margin: 8px 0 20px 0;
    width: 100%;
    border-radius: 5px;
    border: none;
    box-shadow: inset -3px -3px 6px #fff, inset 2px 2px 5px #e6e6e6;
`;

const Admin = () => {
    const [reports, setReports] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [completionDate, setCompletionDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const response = await getAllReports();
            setReports(response);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const openReportModal = (report) => {
        setSelectedReport(report);
        setCompletionDate('');
        setModalOpen(true);
    };

    const closeReportModal = () => {
        setSelectedReport(null);
        setModalOpen(false);
        setCompletionDate('');
    };

    const handleCompletionDateChange = (event) => {
        setCompletionDate(event.target.value);
    };

    const handleCompleteReport = async () => {
        if (selectedReport && completionDate) {
            try {
                const updatedReport = {
                    ...selectedReport,
                    state: completionDate,
                };

                await updateState(selectedReport.target, updatedReport);

                closeReportModal();
                await loadReports();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteReport = async (report) => {
        const confirmDelete = window.confirm("해당 신고 항목을 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await deleteReport(report.id);
                await loadReports();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <Heading>
                <h1>관리자 페이지</h1>
            </Heading>

            <Container>
                {reports.map((report) => (
                    <ListItem key={report.id}>
                        <div>
                            <span>{report.target} ({report.reason})</span>
                        </div>
                        <div>
                            <BiMessageSquareDetail onClick={() => openReportModal(report)} />
                            <BiTrash onClick={() => handleDeleteReport(report)} />
                        </div>
                    </ListItem>
                ))}

                {modalOpen && selectedReport && (
                    <>
                        <BlurBackground open={modalOpen} onClick={closeReportModal} />
                        <Modal open={modalOpen}>
                            <h2>신고 상세 정보</h2>
                            <div>
                                <span>신고자: {selectedReport.reporter}</span>
                            </div>
                            <div>
                                <span>대상: {selectedReport.target}</span>
                            </div>
                            <div>
                                <span>사유: {selectedReport.reason}</span>
                            </div>
                            <div>
                                <Input
                                    type="date"
                                    value={completionDate}
                                    onChange={handleCompletionDateChange}
                                />
                            </div>
                            <button onClick={handleCompleteReport}>완료</button>
                            <button className="cancel" onClick={closeReportModal}>닫기</button>
                        </Modal>
                    </>
                )}
            </Container>
        </>
    );
};

export default Admin;