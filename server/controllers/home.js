'use strict'

function index (req, res) {
  res.render('home/index', {
    title: 'Home'
  })
}

function info (req, res) {
  res.render('home/info', {
    title: 'More info'
  })
}

function add (req, res) {
  res.render('home/add', {
    title: 'Add a beer'
  })
}

module.exports = {
  index: index,
  info: info,
  add: add
}
