import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { TodoForm } from "./components/TodoForm";
import { TodoDetail } from "./components/TodoDetail";
import "animate.css";
import { TodoList } from "./components/TodoList";

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <ApolloProvider client={client}>
      <div className="App" style={{ padding: 24 }}>
        <h1>📝 To-do List</h1>
        {selectedId ? (
          <TodoDetail id={selectedId} onBack={() => setSelectedId(null)} />
        ) : (
          <>
            <TodoForm />
            <div style={{ marginTop: 24 }}>
              <TodoList onView={setSelectedId} />
            </div>
          </>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
