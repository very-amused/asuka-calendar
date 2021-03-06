import polka from 'polka'
import serveStatic from 'serve-static'

const server = polka()

server.use(serveStatic('static'))

server.listen('4000')