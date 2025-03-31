import get from "lodash/get";

export const parseError = (error: {}) => get(error, "response.data.error", "");
