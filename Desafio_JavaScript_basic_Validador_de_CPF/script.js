console.log('JavaScript carregado.')

function validaCPF(cpf) {
  // Validar se o cpf informado tem 11 algarismos
  if (cpf.length != 11) {
    return false
  } else {
    var numeros = cpf.substring(0, 9)
    var digitos = cpf.substring(9)

    var soma = 0
    for (var i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i
      return true
    }

    // Operador ternário
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    // Validação do primeiro digito
    if (resultado != digitos.charAt(0)) {
      return false
    }

    soma = 0
    numeros = cpf.substring(0, 10)

    for (var k = 11; k > 1; k--) {
      soma += numeros.charAt(11 - k) * k
    }

    // Operador ternário
    resultado = soma % 11 > 2 ? 0 : 11 - (soma % 11)

    // Validação do segundo digito
    if (resultado != digitos.charAt(1)) {
      return false
    }
    return true
  }
}

function validacao() {
  console.log('Iniciando a validação do CPF.')

  // Para limpar as mensagens de validação do CPF
  document.getElementById('success').style.display = 'none'
  document.getElementById('error').style.display = 'none'

  // Para pegar valores dentro de componentes
  var cpf = document.getElementById('cpf_digitado').value
  var resultadoValidacao = validaCPF(cpf)

  // Para exibir a mensagem de validação do CPF
  if (resultadoValidacao) {
    document.getElementById('success').style.display = 'block'
  } else {
    document.getElementById('error').style.display = 'block'
  }
  console.log(cpf)
}
