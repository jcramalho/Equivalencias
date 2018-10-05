var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EquivalenciaSchema = new Schema(
    {
        ucRealizada: {type: String, required: true},
        ects: {type: Number, required: true},
        nota: {type: Number, required: true},
        percent: {type: Number, required: true},
        ucEquiv: {type: String, required: true},
        anoUcEquiv: {type: String, required: true},
        semUcEquiv: {type: String, required: true}
    }
)

var ProcessoSchema = new Schema(
    {
        _id: {type: String, required: true},
        processo: {type: String, required: true},
        data: {type: Date},
        idAluno: {type: String, required: true},
        nomeAluno: {type: String, required: true},
        instProv: {type: String, required: true},
        cursoProv: {type: String, required: true},
        equivalencias: [EquivalenciaSchema]
    }
)

module.exports = mongoose.model('Processo', ProcessoSchema, 'processos')