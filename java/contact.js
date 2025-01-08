document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Here you can add your AJAX or fetch request to send data
  fetch(this.action, {
      method: this.method,
      body: new FormData(this),
      headers: {
          'Accept': 'application/json'
      }
  }).then(response => {
      if (response.ok) {
          // Show success message
          alert( "Thank you for your message!");

          // Clear the form fields
          this.reset();
      } else {
          // Handle errors
          alert("There was a problem with your submission or email section.");
      }
  }).catch(error => {
      console.error('Error!', error.message);
      alert("There was a problem with your submission.");
  });
});
