import mysql from 'promise-mysql'
require('dotenv').config()

export const connectionConfig = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
}

export const db = () => {
  console.log('** db')
  return mysql.createConnection(connectionConfig).then((conn) => {
    return conn
  })
}

export default { db }
