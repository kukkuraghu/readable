const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'react',
        path: 'react',
		image: 'https://source.unsplash.com/OqtafYT5kTw'
      },
      {
        name: 'redux',
        path: 'redux',
		image: 'https://source.unsplash.com/m_HRfLhgABo'
      },
      {
        name: 'udacity',
        path: 'udacity',
		image: 'https://source.unsplash.com/B3l0g6HLxr8'
      },
      {
        name: 'react-native',
        path: 'react-native',
		image: 'https://source.unsplash.com/zE007SNgcdE'
      },
      {
        name: 'angular',
        path: 'angular',
		image: 'https://source.unsplash.com/ly-RWaR0GXI'
      }	  
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
