let apiRoot = ''


if (process.env.BUILD_MODE === 'dev') { //or import.meta.env.MODE
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') { //or import.meta.env.MODE
  apiRoot = 'https://trello-api-3u3x.onrender.com'
}

export const API_ROOT = apiRoot
