const daysEN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsEN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let noteId = 0;

// Ready function
$(document).ready(function () {
  setInterval(printENDate, 1000);

  // Change the note background color when clicking a color button
  $(".color-btn").on("click", function () {
    const selectedColor = $(this).data("color");
    const noteText = $("#inputNote").val().trim();

    // Call the onInsertHandler with the note text and selected color
    if (noteText) {
      onInsertHandler(noteText, selectedColor);
    }
  });

  // Handle the Enter key for adding notes
  $("#inputNote").on("keyup", function (e) {
    if (e.key === "Enter") {
      const noteText = $(this).val().trim();
      const selectedColor =
        $(".color-btn.active").data("color") || "transparent"; // Default color
      onInsertHandler(noteText, selectedColor);
    }
  });
});

// Function to display the current date and time
function printENDate() {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const dayStr = daysEN[day];
  const monthStr = monthsEN[month];

  let dateStr = `${dayStr}, ${date} ${monthStr} ${year}`;
  let timeStr = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  $("#dateTxt").html(dateStr + "<br>" + timeStr);
}

// Handler for inserting a new note
function onInsertHandler(note, color) {
  if (!note) return;

  const noteElement = $(".note.hidden").clone().removeClass("hidden");
  noteElement.find(".note-text").text(note);

  // Set the background color based on the button clicked
  noteElement.css("background-color", color);

  noteElement.attr("data-note-id", noteId);
  noteId++;

  // Event listener for the checkbox to handle strikethrough
  noteElement.find(".note-check").on("change", function () {
    const noteTextElement = noteElement.find(".note-text");
    if (this.checked) {
      noteTextElement.addClass("line-through"); // Add strikethrough class
    } else {
      noteTextElement.removeClass("line-through"); // Remove strikethrough class
    }
  });

  // Delete button functionality
  noteElement.find(".note_del-btn").on("click", function () {
    noteElement.remove();
  });

  $(".notes-wrapper").append(noteElement);
  $("#inputNote").val(""); // Clear the input field
}
