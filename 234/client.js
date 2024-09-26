document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            const errorMessage = await response.text();
            alert(errorMessage);
        } else if (response.ok) {
            window.location.href = "/index";
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
    }
});

document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(response);
        if (response.status === 400) {
            const errorMessage = await response.text(); // Get error message from response
            alert(errorMessage); // Show error message to the user
        } 
        else if (response.ok) {
            // Handle successful signup
            console.log("Success")
            window.location.href = "/landing"; // Redirect to index page
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while signing up."); // Generic error message
    }
});