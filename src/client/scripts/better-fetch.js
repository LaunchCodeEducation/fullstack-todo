const handleFetchError = async response => {
  const responseError = new Error("A fetch error occured");

  responseError.data = await response.json();
  responseError.name = "ResponseError";
  responseError.statusCode = response.status;

  throw responseError;
};

const betterFetch = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    await handleFetchError(response);
  }
  return await response.json();
};

const postJSON = (url, data, options = {}) => {
  const body = JSON.stringify(data);

  const postOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    method: "POST",
    body,
  };

  return betterFetch(url, postOptions);
};
