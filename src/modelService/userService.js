import { User, UserClass } from '../models'
import debug from 'debug'

// get user by userid
// userid was stored in cookie
// only used when validate login status
let GetUser = async function (id) {
  var user = null
  await User.findOne({
    where: { id }
  }).then(u => {
    user = new UserClass(u)
  })
  return user
}

// get user by account
// used when someone trying to login
let Verify = async function (account) {
  let user = null
  await User.findOne({
    where: { account }
  }).then(u => {
    user = u
  })
  return user
}

// register
let Register = async function (account, password) {
  let result = null
  console.log(account)
  console.log(password)
  await User.findOrCreate({ where: { account }, default: { password } })
    .spread((user, created) => {
      result = { user, created }
    })
  return result
}

module.exports = {
  GetUser,
  Register,
  Verify
}
