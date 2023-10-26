<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::leftJoin('users', 'tasks.user_id', '=', 'users.id')
        ->select('tasks.*', 'users.name')
        ->where('users.id','>',0)
        ->get();
                return response()->json($tasks, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|max:255',
            'user_id' => 'required'
        ]);

        $task = Task::create([
            'description' => $request->input('description'),
            'user_id' => $request->input('user_id')
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'description' => 'required|max:255'
        ]);

        $task->update([
            'description' => $request->input('description'),
        ]);

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}

?>
