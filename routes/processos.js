var express = require('express');
var router = express.Router();
var Processo = require('../models/processo')
var mongoose = require('mongoose')

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
          if(!err) res.render('processo', {proc:doc})
          else res.render('error', {error:err})
      })
})

// POST Adiciona um Processo
router.post('/uc', (req, res, next)=>{
  var novo = new Processo({_id: req.body._id, designacao: req.body.designacao, 
                     curso: req.body.curso, anoLetivo: req.body.anoLetivo,
                     alunos: []})
  nova.save((err, result)=>{
      if(!err) console.log('Acrescentei o processo: ' + req.body.processo)
      else console.log('Erro: ' + err)
  })
  res.redirect('/processos/processo/'+req.body.processo)
})

// POST Adiciona uma Equivalencia a um Processo
router.post('/processo/:idProc/equivalencia', (req, res, next)=>{
    var nova = {numero: req.body.numero, 
                nome: req.body.nome,
                notas: []}
    Processo
      .update({_id: req.params.idUc}, 
              {$push: {alunos: novo}},
              (err, result)=>{
                  if(!err) console.log('Acrescentei o aluno: '+req.body.nome)
                  else console.log('Erro: ' + err)
              })
    res.redirect('/ucs/uc/'+req.params.idUc)
})

module.exports = router;
