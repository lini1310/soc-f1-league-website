document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  // Convert FormData to a JSON object
  const data = Object.fromEntries(formData.entries());

  const response = await fetch('http://45.145.224.59:3000/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Reset the form fields regardless of the response
  form.reset();

  if (response.ok) {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none'; // Hide error message if present
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  } else {
    const result = await response.json();
    errorMessage.textContent = `Error: ${result.error}`;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none'; // Hide success message if present
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }
});
