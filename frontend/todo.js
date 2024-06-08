document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addTaskForm');
    const tasksDiv = document.getElementById('tasksBody');
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    addTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDescription = document.getElementById('taskDescription').value;

        const response = await fetch('http://localhost:4000/api/task/addtask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title: taskTitle, description: taskDescription })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            loadTasks();
        } else {
            alert(data.message);
        }

    });

    async function loadTasks() {
        const response = await fetch('http://localhost:4000/api/task/gettask', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const tasks = await response.json();

        
        tasksDiv.innerHTML = '';
        if (tasks.length === 0) {
            tasksDiv.innerHTML = '<tr><td colspan="4">No tasks available</td></tr>';
            return;
        }
        tasks.forEach(task => {
            const taskRow = document.createElement('tr');
            taskRow.className = 'task';
            taskRow.innerHTML = `
                <td><input type="text" value="${task.title}" id="title-${task.task_id}" /></td>
                <td><input type="text" value="${task.description}" id="description-${task.task_id}" /></td>
                <td><input type="text" value="${task.status}" id="status-${task.task_id}" /></td>
                <td id="updateBtn">
                    <button data-id="${task.task_id}" class="updateTask">Update</button>
                    <button data-id="${task.task_id}" class="deleteTask">Delete</button>
                    <button data-id="${task.task_id}" class="changeStatus">Status</button>
                </td>
            `;
            tasksDiv.appendChild(taskRow);
        });

        document.querySelectorAll('.deleteTask').forEach(button => {
            button.addEventListener('click', async (e) => {
                const taskId = e.target.dataset.id;
                await fetch(`http://localhost:4000/api/task/deletetask/${taskId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                loadTasks();
            });
        });

        document.querySelectorAll('.updateTask').forEach(button => {
            button.addEventListener('click', async (e) => {
                const taskId = e.target.dataset.id;
                const newTitle = document.getElementById(`title-${taskId}`).value;
                const newDescription = document.getElementById(`description-${taskId}`).value;
                await fetch(`http://localhost:4000/api/task/updatetask/${taskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ title: newTitle, description: newDescription })
                });
                loadTasks();
            });
        });

        document.querySelectorAll('.changeStatus').forEach(button => {
            button.addEventListener('click', async (e) => {
                const taskId = e.target.dataset.id;
                const newStatus = document.getElementById(`status-${taskId}`).value;
                await fetch(`http://localhost:4000/api/task/updateStatus/${taskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ status: newStatus })
                });
                loadTasks();
            });
        });
    }

    loadTasks();
});
