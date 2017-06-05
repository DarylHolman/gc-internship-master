var express = require('express')
var uuid = require('node-uuid')
var bodyParser = require('body-parser')

var error = document.getElementById('error-message')
var myForm = document.getElementById('myForm')
var table = document.getElementById('myTable')

// Submit
myForm.addEventListener('submit', function (e) {
    // noRefresh
  e.preventDefault()

  startRequests()
}, false)

// Initialize AJAX requests
function startRequests () {
 // Values
  var userValue = document.getElementById('user').value
  var userPass = document.getElementById('password').value

   // Check Credentials
  var user = {

    'email': userValue,
    'password': userPass
  }

  $.ajax({

       url: 'http://localhost:3000/authenticate',
      type: 'POST',
      data: {user},

          success: function (data) {
          myForm.style.display = 'none'
          getCalls(data)
    },

          error: function () {
          error.style.visibility = 'visible'

      setTimeout(function () {
        error.style.visibility = 'hidden'
      }, 3000)
    }

  })
}

// Get Request Func
function getCalls (token) {
  $.ajax({

    url: 'http://localhost:3000/calls',
    type: 'GET',

        // Accept Token
    headers: {
      'X-TOKEN': token.token
    },

    success: function (calls) {
        // Call Data to the drawTable Func
      drawTable(calls)
    }

  })
}

function drawTable (data) {
        var row
        var cols = 3

        //rows
    for (var i = 0; i < cols; i++) {
        row = table.insertRow(-1)

    for (var j = 0; j < cols; j++) {
      var cell = row.insertCell(-1)
      

      if (j == 0) {
        cell.innerHTML = data.calls[i].sid
      } else if (j == 1) {
        cell.innerHTML = data.calls[i].from
      } else if (j == 2) {
        cell.innerHTML = data.calls[i].result
      }
    }
  }

  //Table Display
  table.style.visibility = 'visible'
}
