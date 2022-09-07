function query(event) {
    ​
      let borough = event.target.id;
      let input = document.getElementsByTagName("input")[0];
      let numOfResults = input.value;
    ​
      if (borough === "staten") 
        borough = "STATEN%20ISLAND";
    ​
      if (!numOfResults) 
        numOfResults = "10";
    ​
      let api =
        "https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD&borough=" + 
        borough.toUpperCase() + 
        '&$limit=' + 
        numOfResults
    ​
      fetch(api)
        .then((data) => {
    ​
          return data.json();
    ​
        })
        .then((formattedData) => {
          console.log(formattedData)
          if (!isNaN(numOfResults)) 
            displayData(formattedData);
    ​
        });
    }
    ​
    ​
    ​
    function displayData(data) {
      
      let printDiv = document.getElementById("print");
      printDiv.innerHTML = "";
    ​
      for (let i = 0; i < data.length; i++) {
        
        let resolution = data[i].resolution_description;
    ​
        if (!resolution) 
          resolution = "Nothing on record.";
    ​
        let firstPTag = document.createElement("p");
        let secondPTag = document.createElement("p");
        let buttonTag = document.createElement("button");
    ​
        firstPTag.innerText = data[i].complaint_type;
        buttonTag.name = "r-" + i;
        buttonTag.addEventListener("click", policeResponse);
        buttonTag.innerText = "Toggle Police Response";
        firstPTag.appendChild(buttonTag);
    ​
        secondPTag.id = "r-" + i;
        secondPTag.className = "resolution";
        secondPTag.innerText = resolution;
    ​
        printDiv.appendChild(firstPTag);
        printDiv.appendChild(secondPTag);
      }
    }
    ​
    ​
    ​
    const policeResponse = (event) => {
    ​
      let pTagId = event.target.name;
      let pTag = document.getElementById(pTagId);
      let display = pTag.style.display;
    ​
      if (display === "block") 
        pTag.style.display = "none";
      else 
        pTag.style.display = "block";
    }