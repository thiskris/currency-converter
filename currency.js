async function handleCalculation() {
  try {
    const response = await fetch("./exchange-rates.json");
    data = await response.json();
    const userInput = getUserStr();
    const rate = validateRate(userInput, data);
    if (rate === false) {
      alert("could not find country code, use the search tool to find the appropriate country code")
    } else {
      const amount = userInput.amount * rate;
      alert(`${amount.toFixed(2)} ${userInput.baseCode}`);
    }
  } catch (error) {
    console.log(error);
  }
}

function getUserStr(data) {
  let userStr = prompt(
    `Enter the amount to convert, the three digit code of the base currency and the converted currency. For example, to convert US dollars to Euros enter the country codes followed by the amount in this format: "EUR, USD, 1000". `
  );
  userStr = userStr.trim().toUpperCase();

  const userInput = {
    counterCode: userStr.substring(0, 3),
    baseCode: userStr.substring(5, 8),
    amount: parseInt(userStr.substring(10)),
  };

  return userInput;
}

function validateRate(user, data) {
  const baseRate = data.rates[user.baseCode];
  const counterRate = data.rates[user.counterCode];
  if (!baseRate && !counterRate) {
    return false;
  } else if (!baseRate && user.baseCode === data.base) {
    return counterRate;
  } else {
    return baseRate / counterRate;
  }
}

async function searchCurrencies() {
  try {
    const response = await fetch("./symbols.json");
    data = await response.json();
    const search = document.getElementById("search").value;
    if (search === "all") {
      displayCurrencies(data.symbols);
    } else {
      const results = queryCurriencies(data.symbols, search);
      if (Object.keys(results).length === 0 || search.length === 0) {
        alert("could not find any results");
      } else { 
        displayCurrencies(results); 
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrencies(data) {
  openSearch();
  const list = document.createDocumentFragment();
  const ul = document.getElementById("currencies");
  for (const currency in data) {
    let li = document.createElement("li");
    li.innerHTML = `${currency} : ${data[currency]}`;
    list.appendChild(li);
  }
  ul.appendChild(list);
}

function queryCurriencies(data, query) {
  query = query.toLowerCase()
  const results = {}
  for (let symbol in data) {
    const currency = data[symbol].toLowerCase();
    const code = symbol.toLocaleLowerCase();
    if (code.includes(query) || currency.includes(query)) {
     results[symbol] = data[symbol];
    }
  }
  return results;
}

function openSearch() {
  searchModel = document.getElementById("searchDialog");
  searchModel.show();
}

function closeSearch() {
  searchModal = document.getElementById("searchDialog");
  searchModal.close();
  const ul = document.getElementById("currencies");
  ul.innerHTML = "";
}
