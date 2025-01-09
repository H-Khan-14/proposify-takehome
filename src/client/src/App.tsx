import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { io } from 'socket.io-client';
import 'react-quill/dist/quill.snow.css';

const socket = io('http://localhost:3005');

const App = () => {
  const [content, setContent] = useState('');
  const [id] = useState('note1'); // Static ID for simplicity

  const handleChange = (value: string) => {
    setContent(value);
    socket.emit('updateNote', { id, content: value });
  };

  useEffect(() => {
    socket.on('noteUpdated', ({ id: updatedId, content }) => {
      if (updatedId === id) {
        setContent(content);
      }
    });

    return () => {
      socket.off('noteUpdated');
    };
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Collaborative Note Taking</h1>
      <ReactQuill value={content} onChange={handleChange} />
    </div>
  );
};

export default App;
