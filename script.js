// --- DOM Elements ---
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const totalHoursEl = document.getElementById("total-hours");
const totalMinutesEl = document.getElementById("total-minutes");
const totalSecondsEl = document.getElementById("total-seconds");
const progressBarEl = document.getElementById("progress-bar");
const countdownContainer = document.querySelector(".countdown");
const totalTimeContainer = document.querySelector(".total-time");
const progressSection = document.querySelector(".progress-section");

// --- Dates ---
// Target date: April 25, 2025, 00:00:00
const targetDate = new Date("2025-04-25T00:00:00").getTime();
// Announcement date: February 4, 2025, 00:00:00
const announcementDate = new Date("2025-02-04T00:00:00").getTime();

// --- Calculations ---
// Total duration from announcement to release for progress bar
const totalDuration = targetDate - announcementDate;

// --- Update Function ---
function updateCountdown() {
  const now = new Date().getTime();
  const timeDifference = targetDate - now;

  // --- Check if target date has passed ---
  if (timeDifference <= 0) {
    clearInterval(interval); // Stop the timer
    countdownContainer.innerHTML = "<h2>Album Released!</h2>"; // Update display
    totalTimeContainer.style.display = "none"; // Hide total time
    progressSection.style.display = "none"; // Hide progress bar section
    // Optionally update the button text/link
    // document.querySelector('.presave-button').textContent = 'Listen Now';
    // document.querySelector('.presave-button').href = 'your-streaming-link';
    return; // Exit the function
  }

  // --- Calculate Time Units ---
  // Days = floor(difference / (ms * sec * min * hr))
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // Hours = floor((remainder after days) / (ms * sec * min))
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  // Minutes = floor((remainder after hours) / (ms * sec))
  const minutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  // Seconds = floor((remainder after minutes) / ms)
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // --- Calculate Total Remaining Time ---
  const totalSeconds = Math.floor(timeDifference / 1000);
  const totalMinutes = Math.floor(timeDifference / (1000 * 60));
  const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));

  // --- Update Countdown Display ---
  // Use padStart to ensure two digits (e.g., 09 instead of 9)
  daysEl.innerText = String(days).padStart(2, "0");
  hoursEl.innerText = String(hours).padStart(2, "0");
  minutesEl.innerText = String(minutes).padStart(2, "0");
  secondsEl.innerText = String(seconds).padStart(2, "0");

  // --- Update Total Time Display ---
  totalHoursEl.innerText = totalHours.toLocaleString(); // Add commas for readability
  totalMinutesEl.innerText = totalMinutes.toLocaleString();
  totalSecondsEl.innerText = totalSeconds.toLocaleString();

  // --- Calculate and Update Progress Bar ---
  const timeElapsed = now - announcementDate;
  let progressPercentage = 0;
  if (totalDuration > 0) {
    // Avoid division by zero if dates are the same
    progressPercentage = (timeElapsed / totalDuration) * 100;
  }
  // Ensure progress doesn't go below 0 or above 100
  progressPercentage = Math.max(0, Math.min(100, progressPercentage));
  progressBarEl.style.width = `${progressPercentage}%`;
}

// --- Initial Call & Interval ---
updateCountdown(); // Call once immediately to avoid delay
const interval = setInterval(updateCountdown, 1000); // Update every second
