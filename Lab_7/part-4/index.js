document.getElementById("Form").addEventListener("submit", function (event) {
  event.preventDefault();

  let firstName = document.getElementById("first_name").value.trim();
  let lastName = document.getElementById("last_name").value.trim();
  let email = document.getElementById("email").value.trim();

  if (!firstName || !lastName || !email) {
    alert("Wrong data");
  } else {
    alert(
      `first_name: ${firstName}\n last_name: ${lastName}\n email: ${email}`,
    );
  }
});
