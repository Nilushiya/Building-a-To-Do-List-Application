document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('signupForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user_name = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'Todo.html';
        } else {
            alert(data.message);
        }
    });
});
