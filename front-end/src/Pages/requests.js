export async function request(endPoint, method, data) {
  const response = await fetch(endPoint, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function protectedRequest(endPoint, method, data, token) {
  const response = await fetch(endPoint, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
