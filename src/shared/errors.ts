export const ERRORS = {
    USER_NOT_FOUND_ERROR: {
      code: 404,
      success: false,
      message: {
        error: 'USER_NOT_FOUND',
        error_description: 'User not found.',
      },
    },
    INVALID_USER_EMAIL: {
      code: 400,
      success: false,
      message: {
        error: 'INVALID_USER_EMAIL',
        error_description: 'Invalid user email.',
      },
    },
    SERVER_ERROR: {
      code: 500,
      success: false,
      message: {
        error: 'SERVER_ERROR',
        error_description: 'Something went wrong. Please try again later.',
      },
    },

  USER_ALREADY_EXISTS_ERROR: {
    code: 409,
    success: false,
    message: {
      error: 'USER_ALREADY_EXISTS',
      error_description: 'User already exists.',
    },
  },
  INVALID_USER_DATA: {
    code: 400,
    success: false,
    message: {
      error: 'INVALID_USER_DATA',
      error_description: 'Invalid user data.',
    },
  },
  MISDIRECTED_REQUEST: {
    code: 421,
    success: false,
    message: {
      error: 'MISDIRECTED_REQUEST',
      error_description: 'The request was directed at a server that is not able to produce a response.',
    },
  },
};
