export async function postRequest(endPoint, data) {
  const response = await fetch(endPoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function postProtectedRequest(endPoint, method, data, token) {
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

export async function getProtectedRequest(endPoint, token) {
  const response = await fetch(endPoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function deleteProtectedRequest(endPoint, token) {
  const response = await fetch(endPoint, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
