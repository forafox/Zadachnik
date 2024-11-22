import { Api, ContentType } from "../api.gen";

export const api = new Api({
  baseURL: "/",
});

function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem("access_token", accessToken);
}

export function setRefreshToken(token: string) {
  localStorage.setItem("refresh_token", token);
}

api.instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = undefined;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function clearSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

api.instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config!;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const previousRefreshToken = getRefreshToken();
          if (!previousRefreshToken) {
            return Promise.reject(err);
          }
          const { accessToken, refreshToken } =
            await refreshAccessTokenFn(previousRefreshToken);
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          return api.instance(originalConfig);
        } catch (_error) {
          clearSession();
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

async function refreshAccessTokenFn(refreshToken: string) {
  // need to create new Api in order to escape refreshing loop
  const { data: rawValues } = await new Api({ baseURL: "/" }).api.refresh(
    refreshToken,
    { type: ContentType.Text },
  );
  return rawValues;
}
