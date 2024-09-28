const express = require("express")//para usar o express
const server = express()//para criar um servidor
const aluno = require("./src/teste.json")


server.get("/", (req, res)=> {
    return res.json({mensagem:"Hello NODE"})
})

server.get("/teste", (req, res)=>{
    return res.json({mensagem:"Hello people"})
})

server.get("/serio", (req, res)=>{
    return res.json({mensgem:"kimi no toriko ni natte, shimaeba kittokono natsu wa jyujitsu, suru no motto uwasa no doriimingaaru ga wasurenaide"})
})

server.get("/aluno", (req, res)=>{
    return res.json(aluno)
})



server.listen(3306, ()=>{
    console.log('server ON')

})

