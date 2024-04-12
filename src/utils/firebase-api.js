const FIREBASE_ROOT_DOMAIN =
  'https://user-list-13cb8-default-rtdb.firebaseio.com';

export async function addRecord(recordData) {
  const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/users.json`, {
    method: 'POST',
    body: JSON.stringify(recordData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Record adding error, status ${response.status}.`
    );
  }
}

export async function editRecord(recordData) {
  const key = recordData.id;
  delete recordData.id;

  const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/users/${key}.json`, {
    method: 'PUT',
    body: JSON.stringify(recordData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Record adding error, status ${response.status}.`
    );
  }
}

export async function getAllRecords() {
  const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/users.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Record getting error, status ${response.status}.`
    );
  }

  const convertedRecords = [];

  for (const key in data) {
    const record = {
      id: key,
      ...data[key],
    };

    convertedRecords.push(record);
  }

  return convertedRecords;
}

// export async function getJoke(jokeId) {
//   const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/jokes/${jokeId}.json`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Joke fetching error.');
//   }

//   const convertedJoke = {
//     id: jokeId,
//     ...data,
//   };

//   return convertedJoke;
// }

// export async function addComment(requestData) {
//   const response = await fetch(
//     `${FIREBASE_ROOT_DOMAIN}/comments/${requestData.jokeId}.json`,
//     {
//       method: 'POST',
//       body: JSON.stringify(requestData.commentData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.text || 'Comment adding error.');
//   }

//   return {commentId: data.username};
// }

// export async function getComments(jokeId) {
//   const response = await fetch(
//     `${FIREBASE_ROOT_DOMAIN}/comments/${jokeId}.json`
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Comments fetching error.');
//   }

//   const convertedComments = [];

//   for (const key in data) {
//     const comment = {
//       id: key,
//       ...data[key],
//     };

//     convertedComments.unshift(comment);
//   }

//   return convertedComments;
// }
