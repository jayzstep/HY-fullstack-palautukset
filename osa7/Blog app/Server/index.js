const app = require('./app')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')


app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})
