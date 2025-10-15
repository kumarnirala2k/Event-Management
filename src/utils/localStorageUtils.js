export const LS = {
  USERS: 'ems_users_v2',
  EVENTS: 'ems_events_v2',
  SESSION: 'ems_session_v2',
};

export const readLS = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

export const writeLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
