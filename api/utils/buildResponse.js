const buildResponse = (object, statusCode) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(object),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export default buildResponse;
