import { User, UserClass } from '../models'

let GetUser = async function (id) {
  User.findOne({
    where: { id }
  }).then(u => {
    if (u) {
      var user = new UserClass(u)
      return user
    } else { return null }
  })
}

let Verify = async function (username) {
  let user = new UserClass()
  await User.findOne({
    where: { username }
  }).then(u => {
    user = u
  })
  return user
  // User.findOne({
  //   where: { account }
  // }).then(user => {
  //   return user
  // })
}

module.exports = {
  GetUser,
  Verify
}
