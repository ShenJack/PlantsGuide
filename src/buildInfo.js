if (['prod', 'production'].includes(process.env.NODE_ENV)) {
  console.log({
      BUILD_TIME: new Date(process.env.BUILD_TIME)
    }
  )
}

module.exports = {}
