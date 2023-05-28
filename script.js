let result = document.getElementById('result');

async function printData() {
  let res = await fetch('https://swapi.dev/api/planets/?page=2');
  let { results } = await res.json();

  console.log(results);

  results.forEach(planet => {
    let li = document.createElement('li');
    let button = document.createElement('button');
    let infoParagraph = document.createElement('p');
    let residentsParagraph = document.createElement('p'); // Add paragraph for residents

    button.innerText = planet.name;
    button.addEventListener('click', () => {
      showPlanetInfo(planet, infoParagraph);
    });

    li.appendChild(button);
    li.appendChild(infoParagraph);
    li.appendChild(residentsParagraph); // Append residents paragraph to the list item
    result.appendChild(li);
  });
}

async function fetchResidents(residents, residentsParagraph) {
  let residentsTable = document.getElementById('residentsTable');
  let residentsBody = document.getElementById('residentsBody');

  residentsBody.innerHTML = '';

  for (let i = 0; i < residents.length; i++) {
    let residentUrl = residents[i];
    let residentResponse = await fetch(residentUrl);
    let residentData = await residentResponse.json();

    let residentName = residentData.name;
    let residentBirthYear = residentData.birth_year;

    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    let birthYearCell = document.createElement('td');

    nameCell.innerText = residentName;
    birthYearCell.innerText = residentBirthYear;

    row.appendChild(nameCell);
    row.appendChild(birthYearCell);
    residentsBody.appendChild(row);
  }

  residentsTable.style.display = 'block';
}

function showPlanetInfo(planet, infoParagraph) {
  infoParagraph.innerHTML = `População: ${planet.population}<br>
                              Clima: ${planet.climate}<br>
                              Terreno: ${planet.terrain}`;

  let residentsParagraph = infoParagraph.nextElementSibling; // Get the residents paragraph
  fetchResidents(planet.residents, residentsParagraph); // Pass the residents paragraph to the fetchResidents function
}

function searchPlanets() {
  let searchValue = searchInput.value.toLowerCase();
  let planets = result.getElementsByTagName('li');

  for (let i = 0; i < planets.length; i++) {
    let planetName = planets[i].querySelector('button').innerText.toLowerCase();
    let planetInfo = planets[i].querySelector('p');

    if (planetName.includes(searchValue)) {
      planets[i].style.display = 'block';
    } else {
      planets[i].style.display = 'none';
      planetInfo.innerHTML = '';
    }
  }
}

printData();
