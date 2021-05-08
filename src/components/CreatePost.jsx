import request from 'superagent';

export async function createPost(newPost) {
  try {
    await request.post(`${process.env.REACT_APP_POST_URL}`).send(newPost);
    return;
  } catch (err) {
    throw err;
  }
}
