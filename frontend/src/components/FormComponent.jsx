import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormComponent() {
  // Definisci lo stato per ogni campo del form
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // Funzione per gestire il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      cover,
      readTime: {
        value,
        unit,
      },
      author,
      content,
    };

    try {
      const response = await fetch('http://localhost:5000/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'invio dei dati');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Errore:', error);
      // Puoi gestire l'errore qui, ad esempio mostrando un messaggio di errore all'utente
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Titolo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCover">
        <Form.Label>Cover</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Cover URL"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicValue">
        <Form.Label>Value</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Read Time Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUnit">
        <Form.Label>Unit</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Read Time Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormComponent;
