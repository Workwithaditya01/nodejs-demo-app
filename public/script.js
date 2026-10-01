
async function calculateSum() {
  const numberA = document.getElementById("numberA").value;
  const numberB = document.getElementById("numberB").value;
  const result = document.getElementById("result");

  if (numberA === "" || numberB === "") {
    result.textContent = "Please enter both numbers.";
    return;
  }

  result.textContent = "Calculating...";

  try {
    const response = await fetch(`/add/${numberA}/${numberB}`);

    const data = await response.json();

    if (!response.ok) {
      result.textContent = data.error || "Something went wrong.";
      return;
    }

    result.textContent = `Result: ${data.result}`;
  } catch (error) {
    result.textContent = "Unable to connect to the server.";
    console.error(error);
  }
}


async function checkHealth() {
  const message = document.getElementById("healthMessage");

  message.textContent = "Checking application status...";

  try {
    const response = await fetch("/health");

    const data = await response.json();

    if (response.ok) {
      message.textContent =
        `✓ Application is healthy — ${data.status}`;
    } else {
      message.textContent =
        "Application health check failed.";
    }
  } catch (error) {
    message.textContent =
      "Unable to connect to the application.";

    console.error(error);
  }
}


// Automatically check health when page loads
checkHealth();

