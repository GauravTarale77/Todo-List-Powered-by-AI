"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react"
import Navbar from "@/components/Navbar"
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")


  useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        createdAt: new Date(),
      };
      setTodos((prev) => [...prev, newTodo]);
    }
  });


  useCopilotAction({
    name: "deleteTodoItem",
    description: "Delete a todo item by its text or ID",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo to delete",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      setTodos((prev) => {
        const lowerText = todoText.toLowerCase();
        return prev.filter((todo) => !todo.text.toLowerCase().includes(lowerText));
      });
    },
  });


  const addTodo = (todoText: string) => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos((prev) => [...prev, newTodo])
      setInputValue("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo(inputValue);
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />

      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">My Todo List</h1>
              <p className="text-muted-foreground">Stay organized and get things done</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={() => addTodo(inputValue)} size="default">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {totalCount > 0 && (
              <div className="flex justify-center">
                <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                  <span className="font-medium">{completedCount}</span> of{" "}
                  <span className="font-medium">{totalCount}</span> tasks completed
                </div>
              </div>
            )}

            <div className="space-y-2">
              {todos.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tasks yet. Add one above to get started!</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                todos.map((todo) => (
                  <Card key={todo.id} className={`transition-all ${todo.completed ? "opacity-75" : ""}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" onClick={() => toggleTodo(todo.id)} className="p-0 h-auto">
                          {todo.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>

                        <div className="flex-1">
                          <p className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                            {todo.text}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {todo.createdAt.toLocaleDateString()} at{" "}
                            {todo.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {completedCount > 0 && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
                  className="text-muted-foreground"
                >
                  Clear Completed ({completedCount})
                </Button>
              </div>
            )}
          </div>
          <CopilotPopup
            instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
            labels={{
              title: "Popup Assistant",
              initial: "Need any help?",
            }}
          />
        </main>
      </div>
    </div>
  )
}
