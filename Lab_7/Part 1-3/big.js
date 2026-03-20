let counties = [];

async function fetchData() {
  let response = await fetch(
    "https://api.census.gov/data/2020/acs/acs5/profile?get=NAME&for=county:*",
  );
  let json = await response.json();
  counties = json
    .slice(1)
    .map((res) => ({ name: res[0], code: res[1] + res[2] }));
}

function getCode(name) {
  let country = counties.find((c) => c.name.includes(name));

  return country.code;
}

document.getElementById("btn").onclick = () => {
  let code = getCode(document.getElementById("countryInput").value);
  console.log(code);
};

fetchData();
