import http from 'http'

const PORT = 3300;

const rotas={
    '/' : 'Bateu aqui!!!',
    '/teste': 'Continua Batendo',
    '/teste2': 'Batendo',
    '/teste3': 'Porque ainda continua aqui se já está funcionando??? -_-)'
}
const servidor = http.createServer((req,res) =>{
    res.writeHead(200, {'Content-Type': 'Text/palin'})
    res.end(rotas[req.url])
})
servidor.listen(PORT, () => {
    console.log('Servidorr ON')
})
