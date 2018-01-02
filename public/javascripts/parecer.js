function emitirParecer(idProc){
    // alert( "Emissão de parecer do processo: "+idProc )
    $.getJSON("http://localhost:7777/processos/processo/"+idProc+"/data", function(data){
        // alert("Recebi o processo: "+JSON.stringify(data))
        var parecer = "Analisado o requerimento do aluno " + data.nomeAluno + ", " + data.idAluno + ", "
        parecer += "para concessão de equivalências, sou de parecer que lhe sejam concedidas as seguintes equivalências:\n"
        var cont = 1
        for(var i=0; i < data.equivalencias.length; i++){
            if(data.equivalencias[i].percent){
                parecer += cont + ") " + data.equivalencias[i].ucEquiv + ", com " 
                parecer +=  data.equivalencias[i].nota + ", por equivalência a "
                parecer += data.equivalencias[i].ucRealizada + ";\n"
                cont++
            }
        }     
        var html = "<div class='w3-code'><pre>" + parecer + "</pre></div>"
        $("#parecerEmitido").append(html)
    })
}
    