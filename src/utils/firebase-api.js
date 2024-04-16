const FIREBASE_ROOT_DOMAIN =
  'https://user-list-13cb8-default-rtdb.firebaseio.com';

// Add a new record to Firebase
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

// Change an existing record in Firebase
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
      data.message || `Record changing error, status ${response.status}.`
    );
  }
}

//get all records from Firebase
export async function getAllRecords() {
  const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/users.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Records getting error, status ${response.status}.`
    );
  }

  const convertedRecords = [];

  for (const key in data) {
    const record = {
      id: key,
      ...data[key],
    };

    convertedRecords.unshift(record);
  }

  return convertedRecords;
}
