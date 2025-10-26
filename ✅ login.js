const API_URL = "https://script.google.com/macros/s/AKfycbzZdH-8irAyzYcvPkZtxlGPTJwA0_LgPjs07pNYXdSuU3zVE8KgwP1ZBR1013rPPRa0uw/exec";

// Persistent Device ID
async function getDeviceID() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

async function login() {
  const studentId = document.getElementById("studentId").value.trim();
  const loginCode = document.getElementById("loginCode").value.trim();
  const status = document.getElementById("status");

  if (!studentId || !loginCode) {
    status.textContent = "All fields are required!";
    return;
  }

  status.style.color = "yellow";
  status.textContent = "Checking...";

  const deviceId = await getDeviceID();

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      Student_ID: studentId,
      Login_Code: loginCode,
      Device_ID: deviceId
    })
  });

  const result = await response.json();

  if (result.status === "success") {
    localStorage.setItem("ebookAccess", "true");
    status.style.color = "#00ff88";
    status.textContent = "✅ Access Granted! Redirecting...";
    setTimeout(() => {
      window.location.href = "ebook.html";
    }, 1000);
  } else {
    status.style.color = "#ff5555";
    status.textContent = "❌ " + result.message;
  }
}
