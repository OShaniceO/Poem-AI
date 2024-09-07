function startTypewriter(element, text) {
  document.querySelector(element).innerHTML = "";

  let typewriter = new Typewriter(element, {
    autoStart: true,
    delay: 50,
    cursor: "",
    loop: false,
  });

  typewriter.typeString(text).start();
}

function generatePoem(event) {
  event.preventDefault();

  const poemTopic = document.getElementById("poemTopic").value;
  const mainHeading = document.getElementById("mainHeading");

  if (!poemTopic) {
    startTypewriter("#poem", "Please enter a topic to generate a poem.");
    return;
  }

  mainHeading.innerText = `Generating Poems About "${poemTopic}"`;

  fetch(`https://api.datamuse.com/words?ml=${poemTopic}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        startTypewriter(
          "#poem",
          "No related words found for the entered topic."
        );
        return;
      }

      let relatedWords = data.slice(0, 10).map((wordObj) => wordObj.word);

      let poemTemplate = `
        I walk through life with ${relatedWords[0]} by my side,
        Facing the world, embracing the ${relatedWords[1]} tide.
        Through every ${relatedWords[2]}, I learn and grow,
        With the strength to ${relatedWords[3]}, and the will to show.
        
        ${relatedWords[4]} fills my heart, deep and true,
        And with every ${relatedWords[5]}, I find something new.
        The ${relatedWords[6]} around, in every space,
        Reminds me to live with ${relatedWords[7]} and grace.
        
        In this world of ${relatedWords[8]} and ${relatedWords[9]},
        I stand strong, knowing I belong.`;

      startTypewriter("#poem", poemTemplate);
    })
    .catch((error) => {
      console.error("Error fetching data from Datamuse API:", error);
      startTypewriter(
        "#poem",
        "Sorry, something went wrong. Please try again."
      );
    });
}

let poemFormElement = document.querySelector("#poemForm");
poemFormElement.addEventListener("submit", generatePoem);

document.addEventListener("DOMContentLoaded", function () {
  const poemElement = "#poem";
  const placeholderPoem = `White broken mirror\nI saw my reflection blink\nThere's something wrong here`;

  startTypewriter(poemElement, placeholderPoem);

  document.getElementById("mainHeading").innerText = "Poem Generator";
});
