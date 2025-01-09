import { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import { io } from 'socket.io-client';
import 'react-quill/dist/quill.snow.css';
import Login from './components/Login';
import Logout from './components/Logout';
import { useAuth } from './AuthContext';
import DisconnectModal from './components/DisconnectModal';

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const socket = io('http://localhost:3005');

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
  keyboard: {
    bindings: {
      space: {
        key: 32,
        handler: function () {
          return true; // Let default handler run
        },
      },
      enter: {
        key: 13,
        handler: function () {
          return true; // Let default handler run
        },
      },
    },
  },
};

const formats = ['bold', 'italic', 'underline', 'list'];

const App = () => {
  const [content, setContent] = useState('');
  const [id] = useState('note1'); // Static ID for simplicity
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(true);
  const isEditing = useRef(false);

  const handleReconnect = () => {
    socket.connect();
  };

  // Debounced socket emission
  const debouncedEmit = useCallback(
    debounce((value: string) => {
      socket.emit('updateNote', { id, content: value, socketId: socket.id });
      isEditing.current = false;
    }, 250),
    [id]
  );

  const handleChange = (value: string) => {
    isEditing.current = true;
    // Ensure we're passing the complete HTML content
    setContent(value);
    debouncedEmit(value);
  };

  useEffect(() => {
    socket.on(
      'noteUpdated',
      ({ id: updatedId, content: newContent, socketId }) => {
        if (updatedId === id && socketId !== socket.id && !isEditing.current) {
          setContent(newContent);
        }
      }
    );

    return () => {
      socket.off('noteUpdated');
    };
  }, [id]);

  useEffect(() => {
    // Connection listeners
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Cleanup
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Collaborative Note Taking</h1>
      <Logout />
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        preserveWhitespace={true}
      />
      <DisconnectModal isOpen={!isConnected} onReconnect={handleReconnect} />
    </div>
  );
};

export default App;
