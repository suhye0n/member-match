import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const username = "username";
const email = "email";
const location = "location";
const userId = "userId";

export const call = async (api, method, request) => {
    try {
        const headers = new Headers({
            "Content-Type": "application/json",
        });

        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            headers.append("Authorization", `Bearer ${accessToken}`);
        }

        const options = {
            headers,
            url: `${API_BASE_URL}${api}`,
            method,
            ...(request && { body: JSON.stringify(request) })
        };

        const response = await fetch(options.url, options);
        const json = await response.json();

        if (!response.ok) throw json;

        return json;
    } catch (error) {
        console.error(error.status);
    }
}

export const checkUsernameAvailability = async username => {
    const response = await call(`/auth/checkUsername/${username}`, "GET");
    return response.exists;
}

export const checkEmailAvailability = async email => {
    const response = await call(`/auth/checkEmail/${email}`, "GET");
    console.log(response.exists);
    return response.exists;
}

export const signin = async userDTO => {
    const response = await call("/auth/signin", "POST", userDTO);

    if (response.token) {
        alert('로그인을 성공하였습니다.');
        localStorage.setItem(ACCESS_TOKEN, response.token);
        localStorage.setItem(username, response.username);
        localStorage.setItem(email, userDTO.email);
        localStorage.setItem(location, response.location);
        localStorage.setItem(userId, response.id);
        window.location.href = "/";
    }
}

export const signup = async userDTO => {
    try {
        const response = await call("/auth/signup", "POST", userDTO);

        if (response.error) {
            alert('회원가입에 실패했습니다: ' + response.error);
        } else {
            alert('회원가입을 성공하였습니다.');
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("회원가입 오류:", error);
        alert("회원가입에 실패했습니다.");
    }
}

export const signout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(username);
    localStorage.removeItem(email);
    localStorage.removeItem(location);
    localStorage.removeItem(userId);
    alert("로그아웃이 완료되었습니다.");
    window.location.href = "/";
}

export const update = async (userId, userDTO) => {
    try {
        const response = await call(`/auth/update/${userId}`, "PATCH", userDTO);
        if (response) {
            alert('회원 정보 수정이 완료되었습니다.');
            localStorage.setItem(username, response.username);
            localStorage.setItem(location, response.location);
        }
    } catch (error) {
        console.error('회원 정보 수정 오류:', error);
        throw error;
    }
}

export const updateState = async (nickname, state) => {
    try {
        const response = await call(`/auth/updatestate/${nickname}`, "PATCH", { state: state.state });
        if (response) {
            alert('활동 정지 처리가 완료되었습니다.');
        }
    } catch (error) {
        console.error('활동 정지 상태 업데이트 오류:', error);
        throw error;
    }
}

export const withdrawal = async userDTO => {
    try {
        await call("/auth/withdrawal", "DELETE", userDTO);
    } catch (error) {
        console.error(error.status);
        alert("회원 탈퇴를 실패하였습니다.");

        if (error.status === 403) {
            window.location.href = "/login";
        }

        throw error;
    }
}

export const addProject = async projDTO => {
    try {
        const response = await call("/proj/add", "POST", projDTO);

        if (response) {
            alert("프로젝트가 추가되었습니다.");
        }

        return response;
    } catch (error) {
        console.error("프로젝트 추가 오류:", error);

        throw error;
    }
}

export const getAllProjects = async () => {
    try {
        const response = await call("/proj/all", "GET");

        return response;
    } catch (error) {
        console.error("프로젝트 불러오기 오류:", error);

        throw error;
    }
}

export const deleteProject = async projectId => {
    try {
        const response = await call(`/proj/delete/${projectId}`, "DELETE");

        if (response) {
            alert("프로젝트가 삭제되었습니다.");
        }
    } catch (error) {
        console.error("프로젝트 삭제 오류:", error);

        throw error;
    }
}

export const apply = async (projectId, projDTO) => {
    try {
        const response = await call(`/proj/update/${projectId}`, "PUT", projDTO);

        if (response) {
            alert("멤버 지원이 완료되었습니다.");
        }
    } catch (error) {
        console.error("멤버 지원 오류:", error);

        throw error;
    }
}

export const recProject = async (projectId, projDTO) => {
    try {
        const response = await call(`/proj/update/${projectId}`, "PUT", projDTO);

        if (response) {
        }
    } catch (error) {
        console.error("모집 공고 작성 오류:", error);
        throw error;
    }
}

export const updateProject = async (projectId, projDTO) => {
    try {
        const response = await call(`/proj/update/${projectId}`, "PUT", projDTO);

        if (response) {
        }
    } catch (error) {
        console.error("프로젝트 업데이트 오류:", error);

        throw error;
    }
}

export const findId = async (email) => {
    try {
        const response = await call(`/auth/find/${email}`, "GET");

        if (response && response.id) {
            return response.id;
        } else {
            console.error("사용자 이메일을 찾을 수 없음:", email);
            return null;
        }
    } catch (error) {
        console.error("사용자 찾기 에러:", error);
        throw error;
    }
}

export const resetPassword = async (id, newPassword) => {
    try {
        const response = await call(`/auth/reset?id=${id}&newPassword=${newPassword}`, "POST");

        if (response.message) {
            alert('비밀번호가 성공적으로 재설정되었습니다.');
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("비밀번호 재설정 오류:", error);
        throw error;
    }
}

export const rateUser = async (raterUsername, ratedUsername, rating) => {
    const ratingDTO = {
        raterUsername: raterUsername,
        ratedUsername: ratedUsername,
        rating: rating
    };

    try {
        const response = await call('/ratings/rate', 'POST', ratingDTO);

        if (response) {
            alert('별점이 등록되었습니다.');
        }
    } catch (error) {
        console.error('별점 등록 오류:', error);
        throw error;
    }
}

export const getAverageRating = async (ratedUsername) => {
    try {
        const response = await call(`/ratings/average/${ratedUsername}`, "GET");

        if (response) {
            return response;
        } else {
            console.error("평균 별점을 가져올 수 없음.");
            return null;
        }
    } catch (error) {
        console.error("평균 별점 가져오기 오류:", error);
        throw error;
    }
}

export const reportResource = async (reportDTO) => {
    try {
        const response = await call('/reports/create', 'POST', reportDTO);
        if (response) {
            alert('신고가 정상적으로 처리되었습니다.');
        }
    } catch (error) {
        console.error('신고하기 오류:', error);
        throw error;
    }
}

export const getAllReports = async () => {
    try {
        const response = await call("/reports/all", "GET");
        return response;
    } catch (error) {
        console.error("신고 리스트 불러오기 오류:", error);
        throw error;
    }
}

export const deleteReport = async (reportId) => {
    try {
        const response = await call(`/reports/delete/${reportId}`, "DELETE");

        if (response) {
            alert("신고가 삭제되었습니다.");
        }
    } catch (error) {
        console.error("신고 삭제 오류:", error);
        throw error;
    }
}

export const getUserLocation = async (username) => {
    try {
        const response = await call(`/auth/user/${username}/location`, "GET");
        return response.location;
    } catch (error) {
        console.error("사용자 위치 가져오기 오류:", error);
        throw error;
    }
}

export const getUserState = async (username) => {
    try {
        const response = await call(`/auth/user/${username}/state`, "GET");
        return response.state;
    } catch (error) {
        // console.error("사용자 상태 가져오기 오류:", error);
        throw error;
    }
}

export const addCalendarEvent = async (calendarEvent) => {
    try {
        const response = await call("/calendar/create", "POST", calendarEvent);
        if (response) {
            alert('일정이 추가되었습니다.');
        }
    } catch (error) {
        console.error('일정 추가 오류:', error);
        throw error;
    }
}

export const getCalendarEventsByProjectKey = async (projectKey) => {
    try {
        const response = await call(`/calendar/project/${projectKey}`, "GET");
        return response;
    } catch (error) {
        console.error('프로젝트 키별 일정 불러오기 오류:', error);
        throw error;
    }
}

export const getCalendarEventById = async (id) => {
    try {
        const response = await call(`/calendar/${id}`, "GET");
        return response;
    } catch (error) {
        console.error('일정 불러오기 오류:', error);
        throw error;
    }
}

export const updateCalendarEvent = async (id, updatedEvent) => {
    try {
        const response = await call(`/calendar/${id}`, "PUT", updatedEvent);
        if (response) {
            alert('일정이 업데이트되었습니다.');
        }
    } catch (error) {
        console.error('일정 업데이트 오류:', error);
        throw error;
    }
}

export const deleteCalendarEvent = async (id) => {
    try {
        const response = await call(`/calendar/${id}`, "DELETE");
        if (response) {
            alert('일정이 삭제되었습니다.');
        }
    } catch (error) {
        console.error('일정 삭제 오류:', error);
        throw error;
    }
}

export const createChatRoom = async (chatData) => {
    try {
        const response = await call('/chats', 'POST', chatData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addMessageToChat = async (chatId, message) => {
    try {
        const response = await call(`/chats/${chatId}/messages`, "POST", message);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateChat = async (chatId, updatedChat) => {
    try {
        const response = await call(`/chats/${chatId}`, "PATCH", updatedChat);
        return response;
    } catch (error) {
        throw error;
    }
};

export const patchChat = async (chatKey, updatedChat) => {
    try {
        const response = await call(`/chats/${chatKey}`, "PATCH", updatedChat);
        return response;
    } catch (error) {
        throw error;
    }
};

export const markMessageAsRead = async (chatId, messageId, memberName) => {
    try {
        const response = await call(`/chats/${chatId}/messages/${messageId}/read/${memberName}`, "PATCH");
        return response;
    } catch (error) {
        throw error;
    }
};

export const getChatById = async (chatId) => {
    try {
        const response = await call(`/chats/${chatId}`, "GET");
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllChats = async () => {
    try {
        const response = await call("/chats", "GET");
        return response;
    } catch (error) {
        throw error;
    }
};

export const createNotification = async (notificationData) => {
    try {
        const response = await call('/notifications', 'POST', notificationData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await call(`/notifications/${notificationId}/read`, 'PATCH', {});
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllNotifications = async () => {
    try {
        const response = await call("/notifications", "GET");
        return response;
    } catch (error) {
        console.error("알림 가져오기 오류:", error);
        throw error;
    }
};

export const getNotificationsByUsername = async (username) => {
    try {
        const response = await call(`/notifications/${username}`, "GET");
        return response;
    } catch (error) {
        console.error("사용자별 알림 가져오기 오류:", error);
        throw error;
    }
};

export const deleteNotification = async (notificationId) => {
    try {
        const response = await call(`/notifications/${notificationId}`, 'DELETE');
        if (response) {
            alert('알림이 삭제되었습니다.');
        }
    } catch (error) {
        console.error("알림 삭제 오류:", error);
        throw error;
    }
};
