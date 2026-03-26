document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const responseMessage = document.getElementById('responseMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Capture Data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Basic Frontend Validation (Unit Testing requirement)
        if (!formData.name || !formData.email || !formData.message) {
            showResponse('Please bfill in all fields.', 'error');
            return;
        }

        // Email regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showResponse('Please enter a valid email address.', 'error');
            return;
        }

        // UI update for loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Integration Testing: Sending POST request to local Express backend
            const response = await fetch('http://localhost:5001/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showResponse(result.message || 'Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showResponse(result.error || 'Failed to send message.', 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showResponse('Unable to reach the server. Make sure the backend is running.', 'error');
        } finally {
            // Revert UI state
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });

    // Helper to beautifully display the response message to the user
    function showResponse(message, type) {
        responseMessage.textContent = message;
        responseMessage.className = type === 'success' ? 'success-msg' : 'error-msg';

        // Let's add an animation trigger by forcing a reflow
        responseMessage.style.display = 'none';
        responseMessage.offsetHeight; // force reflow
        responseMessage.style.display = 'block';

        // Auto-hide the message after 5 seconds if success
        if (type === 'success') {
            setTimeout(() => {
                responseMessage.style.display = 'none';
                responseMessage.className = 'hidden';
            }, 5000);
        }
    }
});
