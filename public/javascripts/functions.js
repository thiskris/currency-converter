const options = document.getElementsByClassName("currency-select");
const to = document.getElementById("to");
const from = document.getElementById("from");
const swap = document.getElementById("icon-container");
const chartForm = document.getElementById('chart-form')
const tableDiv = document.getElementById('table')
const key = `978bcb581f72f4a00babcc7c`;

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

getData(`https://v6.exchangerate-api.com/v6/${key}/codes`)
  .then((data) => {
    for (const selection of options) {
      for (const [code, currency] of data.supported_codes) {
        const option = document.createElement("option");
        option.value = `${code} - ${currency}`;
        option.textContent = `${code} - ${currency}`;
        selection.appendChild(option);
      }
    }
  })
  .catch((error) => console.log(error));

swap.addEventListener("click", () => {
  const setFromValue = from.value;
  const setToValue = to.value;
  from.value = setToValue;
  to.value = setFromValue;
});

chartForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const from = document.getElementById('from');
  const to = document.getElementById('to');
  const base = from.value.substring(0,3);
  const target = to.value.substring(0,3);

  const date = new Date();
  let day = 1;
  let month = date.getMonth();
  let year = date.getFullYear();

  const tbl = document.createElement("table");
  const tblBody = document.createElement('tbody');

  for (let i = 3; i > 0; i--) {
    --month
    const url = `https://v6.exchangerate-api.com/v6/${key}/history/${base}/${year}/${month}/${day}`
    const row = document.createElement("tr")
    const cell = document.createElement('td');

    getData(url)
      .then((data) => {
        const rates = data.conversion_rates;
        const textRate = document.createTextNode(`Rate: ${rates[target]}`)
        cell.appendChild(textRate);
        row.appendChild(cell)
      })
      .catch((error) => console.log(error))
  
    if (month == 0) {
        month = 12
        --year
    }
    
    tblBody.appendChild(row)
  }

  tbl.appendChild(tblBody)
  tableDiv.appendChild(tbl)
  tbl.setAttribute("border", "2");
})





