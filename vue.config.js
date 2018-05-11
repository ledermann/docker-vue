// Save build time to a git-ignored file.
// Will be used to diplay build time in application footer
const fs = require('fs')
const json = JSON.stringify({ timestamp: new Date() })
fs.writeFile('src/build-time.json', json, () => {})
