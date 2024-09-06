function startTypewriter(element, text) {
  new Typewriter(element, {
    strings: [text],
    autoStart: true,
    delay: 50,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();

  const poemTopic = document.getElementById("poemTopic").value;

  const poemText =
    poemTopic ||
    `White broken mirror\nI saw my reflection blink\nThere's something wrong here`;

  startTypewriter("#poem", poemText);
}

let poemFormElement = document.querySelector("#poemForm");
poemFormElement.addEventListener("submit", generatePoem);

document.addEventListener("DOMContentLoaded", function () {
  const poemElement = "#poem";
  const placeholderPoem = `White broken mirror\nI saw my reflection blink\nThere's something wrong here`;

  startTypewriter(poemElement, placeholderPoem);
});
