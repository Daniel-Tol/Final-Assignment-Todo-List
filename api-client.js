const apiUrl = "http://localhost:3000/";

async function getToDoData() {
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

function postToDoData(newTask) {
  const data = { description: newTask, done: false };
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function deleteToDoData(trashBtnId) {
  await fetch(apiUrl + trashBtnId, {
    method: "DELETE",
  });
}

async function checkToDoData(checkId) {
  const data = { done: true };
  await fetch(apiUrl + checkId, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function uncheckToDoData(checkId) {
  const data = { done: false };
  await fetch(apiUrl + checkId, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function editToDoData(editBtnId, editValue) {
  const data = { description: editValue };
  await fetch(apiUrl + editBtnId, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
