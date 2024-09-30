const userSessions = {};

// Check if the session has expired (e.g., after 2 hours of inactivity)
export const isSessionExpired = (from) => {
  const currentTime = Date.now();
  if (userSessions[from]) {
    const lastInteractionTime = userSessions[from].lastInteraction;
    const timeDiff = (currentTime - lastInteractionTime) / (1000 * 60 * 60);  // Convert ms to hours
    return timeDiff >= 2;
  }
  return true;  // If no session exists, consider it expired
};

// Update the session with the latest interaction
export const updateSession = (from) => {
  userSessions[from] = { lastInteraction: Date.now() };
};

// Reset the session (clear it)
export const resetSession = (from) => {
  delete userSessions[from];
};
