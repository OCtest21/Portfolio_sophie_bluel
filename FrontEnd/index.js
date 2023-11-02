async function genererProjet() {
  // cette fonction lance les requetes
  const workFetch = await fetch("http://localhost:5678/api/works");
  const works = await workFetch.json();
  const categorieFetch = await fetch("http://localhost:5678/api/categories");
  const categories = await categorieFetch.json();

  //appel des fonctions avec en argument les requetes correspondante
  createGallery(works);
  noFilterButton(works);
  createFilterButton(categories, works);
}

function createGallery(works) {
  for (let i = 0; i < works.length; i++) {
    const selectedWorks = works[i];
    const sectionGallery = document.querySelector(".gallery");

    // Créer les étiquettes HTML
    const worksElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    // Mise en place des sources, texte et alt
    imageElement.src = selectedWorks.imageUrl;
    imageElement.alt = selectedWorks.title;
    figcaptionElement.innerText = selectedWorks.title;

    // Lier les éléments au DOM
    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(figcaptionElement);
  }
}

function createFilterButton(categories, works) {
  // Création de boutons en fonction du nombre d'éléments dans le chemin API/catégories
  for (let i = 0; i < categories.length; i++) {
    const sectionFilter = document.querySelector(".filtres");
    const button = document.createElement("button");
    button.classList.add("btn-filter");
    button.innerText = categories[i].name;
    sectionFilter.appendChild(button);

    button.addEventListener("click", () => {
      removeAllSelectedClass();
      button.classList.add("--selected");

      const worksFiltered = works.filter(function (worksFiltering) {
        if (worksFiltering.category.name == categories[i].name) {
          return worksFiltering;
        }
      });
      // Suppression des travaux
      document.querySelector(".gallery").innerHTML = "";

      // and regenerating only corresponding works.
      // regenerer seulement les travaux correspondant
      createGallery(worksFiltered);
    });
  }
}

function removeAllSelectedClass() {
  const buttonList = document.querySelectorAll(".btn-filter, .btn-nofilter");
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].classList.remove("--selected");
  }
}

function noFilterButton(works) {
  const sectionFilter = document.querySelector(".filtres");
  const noFilterButton = document.createElement("button");
  noFilterButton.classList.add("btn-nofilter");
  noFilterButton.classList.add("--selected");
  noFilterButton.innerText = "Tous";
  sectionFilter.appendChild(noFilterButton);

  // EventListener du bouon Tous
  noFilterButton.addEventListener("click", (event) => {
    removeAllSelectedClass();
    document.querySelector(".gallery").innerHTML = "";
    event.target.classList.add("--selected");
    createGallery(works);
  });
}

//Appel de la fonction
genererProjet();
