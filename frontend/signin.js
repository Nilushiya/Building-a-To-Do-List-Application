document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('signinForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;

        const response = await fetch('http://localhost:4000/api/user/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        console.log("res",data)
        if (response.ok) {
            console.log("Fgg")
            // console.log("res",response.data)
            localStorage.setItem('token', data.jwtToken);
            window.location.href = 'Todo.html';
        } else {
            alert(data.message);
        }
    });
});
