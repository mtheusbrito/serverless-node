const extractBody = (event) => {
    if (!event.body) {
      return {
        statusCode: 422,
        body: JSON.stringify({ error: "Missing body" }),
        headers: {
            "Content-Type": "application/json",
          },
      };
    }
    return JSON.parse(event.body);
  };


  export { extractBody }