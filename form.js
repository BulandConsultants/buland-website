document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: this.name.value.trim(),
    email: this.email.value.trim(),
    phone: this.phone.value.trim(),
    service: this.service.value.trim(),
    message: this.message.value.trim()
  };

  if (!formData.phone) {
    alert("Phone number is required!");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbxeNooBea00mHn2ozeRjG7DeCtcaVub5-xpbOWBiiU/dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        alert("Thank you for contacting us!");
        document.getElementById("contactForm").reset();
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => {
      alert("Error sending data.");
      console.error("Fetch error:", error);
    });
});
