function updateManilaTime() {
  const manilaTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  document.getElementById("manila-time").textContent = manilaTime;
}

function updateDetroitTime() {
  const detroitTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Detroit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  document.getElementById("detroit-time").textContent = detroitTime;
}

setInterval(updateManilaTime, 1000);
updateManilaTime();

setInterval(updateDetroitTime, 1000);
updateDetroitTime();
