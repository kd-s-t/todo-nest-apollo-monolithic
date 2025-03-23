import { useQuery } from "@apollo/client";
import { GET_TODO_BY_ID } from "../graphql/queries";
import { Button, Spin } from "antd";

interface TodoDetailProps {
  id: string;
  onBack: () => void;
}

export const TodoDetail: React.FC<TodoDetailProps> = ({ id, onBack }) => {
  const { data, loading, error } = useQuery(GET_TODO_BY_ID, {
    variables: { id },
  });

  if (loading) return <Spin />;
  if (error || !data?.getTodoById) return <p>Todo not found</p>;

  const todo = data.getTodoById;

  return (
    <div className="animate__animated animate__fadeIn">
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.isCompleted ? "Completed" : "Incomplete"}</p>
      <Button onClick={onBack}>← Back to list</Button>
    </div>
  );
};
