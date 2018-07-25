export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({type: "USER_LOADING"});

        const token = getState().auth.token;

        let headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        return fetch("/api/auth/user/", {headers,})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: 'USER_LOADED', user: res.data});
                    return res.data;
                } else if (res.status >= 400 && res.status < 500) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
};

export const clear_authentication_errors = () => {
    return (dispatch) => {
        dispatch({type: "LOGIN_FAILED", data: null});
    }
};

export const login = (username, password, punto_venta = null, callback = null, error_callback = null) => {
    return (dispatch) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({username, password, punto_venta});

        return fetch("/api/auth/login/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    if (error_callback) {
                        error_callback(res);
                    }
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data});
                    if (callback) {
                        callback(res);
                    }
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    if (error_callback) {
                        error_callback(res);
                    }
                } else {
                    dispatch({type: "LOGIN_FAILED", data: res.data});
                    if (error_callback) {
                        error_callback(res);
                    }
                }
            })
    }
};

export const logout = () => {
    return (dispatch) => {
        let headers = {"Content-Type": "application/json"};

        return fetch("/api/auth/logout/", {headers, body: "", method: "POST"})
            .then(res => {
                if (res.status === 204) {
                    return {status: res.status, data: {}};
                } else if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 204) {
                    dispatch({type: 'LOGOUT_SUCCESSFUL'});
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
};