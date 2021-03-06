function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showCustomers(number, recipe) {
  if(number > 0){
    await sleep(5000)
  }
   for(i = 1; i <= 8; i++) {
    document.querySelector("#customer" + i).style.display = "none"
    document.querySelector("#sad-customer-face-" + i).style.display = "none"
  }


  for(i = 1; i <= number; i++) {
    if(i<=8){
      try {
        document.querySelector("#customer" + i).style.display = "inline"
      }
      catch(err) {
        console.log("showCustomers", err)
      }
      if(recipe == "lemunique"){
        try {
          document.querySelector("#sad-customer-face-" + i).style.display = "inline"
        }
        catch(err) {
          console.log("showCustomers", err)
        }
      }
    }
  }
}

function showSigns(number) {
  if(number > 0) {
    document.querySelector("#city_map").style.display = "inline"
  } else {
    document.querySelector("#city_map").style.display = "none"
  }

  document.querySelector("#lemonade_signs").style.display = "inline"

  for(i = 1; i <= 8; i++) {
    document.querySelector("#lemonade_sign" + i).style.display = "none"
  }

  for(i = 1; i <= number; i++) {
    try {
      document.querySelector("#lemonade_sign" + i).style.display = "inline"
    }
    catch(err) {
      console.log("showSigns", err)
    }
  }

}

function showLemonade(recipe) {

  document.querySelector("#lemonade_pitcher").style.display = "none"

  for(i = 1; i <= 5; i++) {
    document.querySelector("#glass" + i).style.display = "none"
  }

  drink = ["#path52795", "#path53221-9-9-9-1-1", "#path53221-9-9-9-1-1-9", "#path53221-9-9-9-1-1-9-8", "#path53221-9-9-9-1-1-9-8-1", "#path53221-9-9-9-1-1-9-8-1-2"]
  for (i=0; i < drink.length; i++) {

    if (recipe == "originalRecipe") {
      document.querySelector(drink[i]).style.fill = "rgb(242, 214, 94)" // yellow
    } else if (recipe == "lemunique") {
      document.querySelector(drink[i]).style.fill = "rgb(154, 174, 7)" // puke green
    }
  }

  if (recipe == "originalRecipe" || recipe ==  "lemunique") {

    document.querySelector("#lemonade_pitcher").style.display = "inline"
    for(i = 1; i <= 5; i++) {
      document.querySelector("#glass" + i).style.display = "inline"
    }
  }

}

function siteOnline(online) {
  if (online) {
    document.querySelector("#site-up").style.display = "inline"
    document.querySelector("#site-down").style.display = "none"
  } else {
    document.querySelector("#site-up").style.display = "none"
    document.querySelector("#site-down").style.display = "inline"
  }
}

function pullAPI() {
  var request = new XMLHttpRequest()


  request.open('GET', '/api', true)
  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response)

      console.info("API response", data)
      showSigns(data.ads)
      showLemonade(data.lemonade)
      showCustomers(data.ads, data.lemonade)
      siteOnline(true)
    } else {
      console.log('Error accessing API')
      siteOnline(false)
    }
  }

  request.send()
}

window.onload = function() {
  setInterval(function() {
    pullAPI()
  }, 2000);
}
