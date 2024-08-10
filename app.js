// app.js
import { auth, db, storage } from './firebase-config.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userDisplay = document.getElementById('userDisplay');
const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const postImage = document.getElementById('postImage');

loginBtn.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);
    userDisplay.textContent = `Logged in as: ${result.user.displayName}`;
  } catch (error) {
    console.error('Error signing in:', error);
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
    userDisplay.textContent = 'Logged out';
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

postForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!auth.currentUser) {
    alert('You must be logged in to post.');
    return;
  }

  const postContent = postText.value;
  const file = postImage.files[0];

  // Upload image
  if (file) {
    const storageRef = ref(storage, `posts/${file.name}`);
    await uploadBytes(storageRef, file);
  }

  // Add post to Firestore
  await addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    content: postContent,
    timestamp: new Date(),
  });

  postText.value = '';
  postImage.value = '';
  alert('Post created!');
});

