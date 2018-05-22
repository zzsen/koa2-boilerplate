import { User, UserClass } from '../models'
import debug from 'debug'

let GetUser = async function (id) {
  var user = null
  await User.findOne({
    where: { id }
  }).then(u => {
    user = new UserClass(u)
  })
  return user
}

let Verify = async function (account) {
  let user = null
  await User.findOne({
    where: { account }
  }).then(u => {
    user = u
  })
  return user
}

module.exports = {
  GetUser,
  Verify
}
