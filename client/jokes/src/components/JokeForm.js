import React, { useState } from 'react';
import axios from 'axios';

export const JokeForm = () => {
  const [joke, setJoke] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/jokes', {
      title,
    });

    console.log(response.data);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Add a Joke</h1>
        <input
          id='title'
          variant='filled'
          onChange={(e) => setJoke(e.target.value)}
        />
        <button className='btn btn-primary'>Add Joke</button>
      </form>
    </>
  );
};
