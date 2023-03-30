document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const successMessage = document.getElementById('success-message');
  
    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  
    const result = await response.json();
    if (response.status === 200) {
      form.reset();
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    } else {
      alert(`Error: ${result.error}`);
    }
  });
  