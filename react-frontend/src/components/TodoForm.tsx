import { Input, Button, Form } from 'antd';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TODO } from '../graphql/mutations';
import { GET_ALL_TODOS } from '../graphql/queries';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
    createTodo({ variables: { input: { title, description } } });
    setTitle('');
    setDescription('');
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} className="animate__animated animate__fadeInDown">
      <Form.Item>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  );
};
