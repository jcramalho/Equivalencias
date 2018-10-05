var express = require('express');
var router = express.Router();
var Processo = require('../models/processo')
var mongoose = require('mongoose')
var fs = require('fs')

// GET Lista os Processos
router.get('/', function(req, res, next) {
  Processo
    .find()
    .sort({data: -1})
    .exec((err, doc)=>{
      if(!err) res.render('processos', {lproc: doc})
      else res.render('error', {error: err})
    })
})

// GET Lista um Processo
router.get('/processo/:pid', (req, res, next)=>{
    Processo
      .findById(req.params.pid)
      .exec((err, doc)=>{
          if(!err){             
            var data = fs.readFileSync(__dirname + '/../data/myUCs.json', 'utf8')
            var ucs = JSON.parse(data)
            res.render('processo2', {proc:doc, lucs:ucs})
          } 
          else res.render('error', {error:err})
      })
})

// GET Envia os dados em JSON de um processo
router.get('/processo/:pid/data', (req, res, next)=>{
    console.log("Parecer do: " + req.params.pid)
    Processo
      .findById(req.params.pid)
      .exec((err, doc)=>{
          if(!err) res.json(doc)
          else res.json({error:err})
      })
})

// POST Adiciona um Processo
router.post('/processo', (req, res, next)=>{
  var novo = new Processo({_id: req.body.processo.replace(/\//g, "_"), processo: req.body.processo, 
                            idAluno: req.body.idAluno, nomeAluno: req.body.nomeAluno,
                            instProv: req.body.instProv, cursoProv: req.body.cursoProv,
                            equivalencias: [], data: new Date().toISOString().slice(0,10)})
  novo.save((err, result)=>{
      if(!err) console.log('Acrescentei o processo: ' + req.body.processo)
      else console.log('Erro: ' + err)
  })
  res.redirect('/processos/processo/'+novo._id)
})

// POST Adiciona uma Equivalencia a um Processo
router.post('/processo/:idProc/equivalencia', (req, res, next)=>{
    var nova = {ucRealizada: req.body.ucRealizada, 
                ects: req.body.ects,
                nota: req.body.nota,
                percent: req.body.percent,
                ucEquiv: req.body.ucEquiv,
                anoUcEquiv: req.body.anoUcEquiv,
                semUcEquiv: req.body.semUcEquiv
            }
    console.log(JSON.stringify(nova))
    Processo
      .update({_id: req.params.idProc}, 
              {$push: {equivalencias: nova}},
              (err, result)=>{
                  if(!err) console.log('Acrescentei a equivalência: '+req.body.ucRealizada)
                  else console.log('Erro: ' + err)
              })
    res.redirect('/processos/processo/'+req.params.idProc)
})

module.exports = router;
