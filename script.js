// Local Storage Simple
/*
window.localStorage.setItem('obj', "{nome: gabriel}");

localStorage.getItem('obj');

localStorage.removeItem('obj');
*/

//

let operacao = 'Add';

let usuarios = JSON.parse(localStorage.getItem('usuarios'));
if (!usuarios) {
    usuarios = [];
};

function adicionar() {
    let usuario = {
        codigo: document.querySelector('#txtCodigo').value,
        nome: document.querySelector('#txtNome').value,
        telefone: document.querySelector('#txtTelefone').value,
        email: document.querySelector('#txtEmail').value,
    };
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro adicionado com sucesso!');
    return true;
};

const form = document.getElementById('frmCadastro');
form.addEventListener('submit', function(event) {
    if (operacao === 'Add') {
        return adicionar();
    }
    else if (operacao === 'Edt') {
        return editar();
    };
});

function listar() {
    let tbody = document.querySelector('#tblListar tbody');
    let linhas = '';
    let users = JSON.parse(localStorage.getItem('usuarios'));
    
    console.log(users);

    for (let i =0; i<users.length; i++) {
        let user = users[i];
        console.log(user.codigo);
        linhas += 
                `<tr>
                    <td>
                        <img src='images/editar.png' alt='${i}' onclick='handleEditar(this)'>
                        <img src='images/delete.png' alt='${i}' onclick='handleDeletar(this)'>
                    </td>
                    <td>${user.codigo}</td>
                    <td>${user.nome}</td>
                    <td>${user.telefone}</td>
                    <td>${user.email}</td>
                </tr>`;
    };
    tbody.innerHTML = linhas;
};

document.querySelector('#btnListar').addEventListener('click', function(event) {
    listar();
});

function deletar(indice) {
    let users = JSON.parse(localStorage.getItem('usuarios'));
    users.splice(indice, 1);
    if (users.length === 0) {
        localStorage.removeItem('usuarios');
        return;
    }
    localStorage.setItem('usuarios', JSON.stringify(users));
    alert('Registro excluído');
};

function handleDeletar(e) {
    let indice = parseInt(e.getAttribute("alt"));
    deletar(indice);
    listar();
};

let indice_selec = -1;

function editar() {
    let users = JSON.parse(localStorage.getItem('usuarios'));

    const userAtualizado = {
        codigo: document.querySelector("#txtCodigo").value,
        nome: document.querySelector("#txtNome").value,
        telefone: document.querySelector("#txtTelefone").value,
        email: document.querySelector("#txtEmail").value
    }
    users[indice_selec] = userAtualizado;
    localStorage.setItem('usuarios', JSON.stringify(users));
    alert('Dados atualizados com sucesso!');
    operacao = 'Add';
};

function handleEditar(e) {
    operacao = 'Edt';
    indice_selec = parseInt(e.getAttribute("alt"));
    let users = JSON.parse(localStorage.getItem('usuarios'));
    let user = users[indice_selec];

    document.querySelector("#txtCodigo").value = user.codigo;
    document.querySelector("#txtNome").value = user.nome;
    document.querySelector("#txtTelefone").value = user.telefone;
    document.querySelector("#txtEmail").value = user.email;
};