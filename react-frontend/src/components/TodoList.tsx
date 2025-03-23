import { List, Typography, Button, Input, Space, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_TODOS } from '../graphql/queries';
import { DELETE_TODO, UPDATE_TODO, TOGGLE_TODO } from '../graphql/mutations';
import { useState } from 'react';

export const TodoList = ({ onView }: { onView: (id: string) => void }) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });
  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  const handleEdit = (todo: any) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDesc(todo.description);
  };

  const handleSave = (id: string) => {
    updateTodo({ variables: { id, update: { title: editTitle, description: editDesc } } });
    setEditingId(null);
    message.success('Todo updated!');
  };

  const handleToggle = async (id: string, isCompleted: boolean) => {
    await toggleTodo({
      variables: {
        id,
        update: { isCompleted: !isCompleted }
      },
    });
    await refetch();
  };

  const handleDelete = (id: string) => {
    deleteTodo({ variables: { id } });
    message.success('Todo deleted!');
  };

  return (
    <List
      header={<div className="animate__animated animate__fadeIn">My Todos</div>}
      bordered
      dataSource={data.getAllTodos}
      renderItem={(todo: any) => (
        <List.Item
          key={todo.id + String(todo.isCompleted)}
          className="animate__animated animate__fadeInUp"
          actions={
            editingId === todo.id
              ? [
                <Button type="primary" size="small" onClick={() => handleSave(todo.id)}>Save</Button>,
                <Button size="small" onClick={() => setEditingId(null)}>Cancel</Button>,
              ]
              : [
                <Button size="small" onClick={() => handleEdit(todo)}>Edit</Button>,
                <Button size="small" onClick={() => handleToggle(todo.id, todo.isCompleted)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </Button>,
                <Button size="small" onClick={() => onView(todo.id)}>View</Button>,
                <Button size="small" danger onClick={() => handleDelete(todo.id)}>Delete</Button>,
              ]
          }
        >
          {editingId === todo.id ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <Input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
            </Space>
          ) : (
            <Space direction="vertical">
              <Typography.Text strong delete={todo.isCompleted}>
                {todo.title}
              </Typography.Text>
              <Typography.Text type="secondary" delete={todo.isCompleted}>
                {todo.description}
              </Typography.Text>
            </Space>
          )}
        </List.Item>
      )}
    />
  );
};
