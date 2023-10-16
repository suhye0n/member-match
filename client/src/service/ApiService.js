import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const username = "username";
const email = "email";

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

export const signin = async userDTO => {
    const response = await call("/auth/signin", "POST", userDTO);

    if (response.token) {
        alert('로그인을 성공하였습니다.');
        localStorage.setItem(ACCESS_TOKEN, response.token);
        localStorage.setItem(username, response.username);
        localStorage.setItem(email, userDTO.email);
        window.location.href = "/";
    }
}

export const signup = async userDTO => {
    try {
        const response = await call("/auth/signup", "POST", userDTO);

        if (response.id) {
            alert('회원가입을 성공하였습니다.');
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("회원가입 오류:", error);

        throw error;
    }
}

export const signout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(username);
    localStorage.removeItem(email);
    alert("로그아웃이 완료되었습니다.");
    window.location.href = "/";
}

export const update = async userDTO => {
    try {
        const response = await call("/auth/update", "POST", userDTO);
    
        if (response) {
            alert('회원 정보 수정이 완료되었습니다.')
            localStorage.setItem(username, response.username);
        }
    } catch (error) {
        console.error("회원 정보 수정 오류:", error);

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

export const updateProject = async (projectId, projDTO) => {
    try {
        const response = await call(`/proj/update/${projectId}`, "PUT", projDTO);

        if (response) {
            alert("프로젝트가 업데이트되었습니다.");
        }
    } catch (error) {
        console.error("프로젝트 업데이트 오류:", error);

        throw error;
    }
}

export const addCalendarEvent = async calendarDTO => {
    try {
        const response = await call("/calendar/create", "POST", calendarDTO);

        if (response) {
            alert("캘린더 이벤트가 추가되었습니다.");
        }
    } catch (error) {
        console.error("캘린더 이벤트 추가 오류:", error);

        throw error;
    }
}

export const getAllCalendarEvents = async () => {
    try {
        const response = await call("/calendar/all", "GET");

        return response;
    } catch (error) {
        console.error("캘린더 이벤트 불러오기 오류:", error);

        throw error;
    }
}

export const updateCalendarEvent = async (eventId, calendarDTO) => {
    try {
        const response = await call(`/calendar/update/${eventId}`, "PUT", calendarDTO);

        if (response) {
            alert("캘린더 이벤트가 업데이트되었습니다.");
        }
    } catch (error) {
        console.error("캘린더 이벤트 업데이트 오류:", error);

        throw error;
    }
}

export const deleteCalendarEvent = async eventId => {
    try {
        const response = await call(`/calendar/delete/${eventId}`, "DELETE");

        if (response) {
            alert("캘린더 이벤트가 삭제되었습니다.");
        }
    } catch (error) {
        console.error("캘린더 이벤트 삭제 오류:", error);

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

// export const sendMessage = async chatDTO => {
//     try {
//         const response = await call("/chat/send", "POST", chatDTO);
    
//         if (response) {
//         }
//     } catch (error) {
//         console.error("채팅 전송 오류:", error);

//         throw error;
//     }
// }

// export const getMessage = async chatDTO => {
//     try {
//         const response = await call("/chat/all", "GET", chatDTO);
    
//         if (response) {
//         }
//     } catch (error) {
//         console.error("채팅 불러오기 오류:", error);

//         throw error;
//     }
// }