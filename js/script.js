function checkCapsLock(event, avisoId) {
    const capsLockAtivado = event.getModifierState && event.getModifierState("CapsLock");
    document.getElementById(avisoId).style.display = capsLockAtivado ? "block" : "none";
}

function toggleSenha(id) {
    const input = document.getElementById(id);
    const eyeIcon = input.parentElement.querySelector('.toggle-visibility img');
    if (input.type === "password") {
        input.type = "text";
        eyeIcon.src = "images/openEye.png";
    } else {
        input.type = "password";
        eyeIcon.src = "images/closeEye.png";
    }
}

function hideCapsLockAviso(avisoId) {
    document.getElementById(avisoId).style.display = "none";
}

function validarNomeUsuario(nomeUsuario) {
    return /^[a-z.]{1,50}$/.test(nomeUsuario);
}

function validarNomeUsuarioInput(event) {
    event.target.value = event.target.value.replace(/[^a-z.]/g, '');
}

function limparCampos() {
    ["usuarioErro", "senhaAntigaErro", "novaSenhaErro", "confirmaSenhaErro"].forEach(id => {
        document.getElementById(id).style.display = "none";
    });

    ["usuario", "senhaAntiga", "novaSenha", "confirmaSenha"].forEach(id => {
        document.getElementById(id).classList.remove("error");
        document.getElementById(id).value = "";
    });
}

function trocarSenha() {
    const usuario = document.getElementById("usuario").value;
    const senhaAntiga = document.getElementById("senhaAntiga").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    let valid = true;

    const validarCampos = [
        { cond: !validarNomeUsuario(usuario), id: "usuarioErro", msg: "O nome de usuário deve estar em letras minúsculas" },
        { cond: senhaAntiga.trim() === "", id: "senhaAntigaErro", msg: "Por favor, insira a senha antiga." },
        { cond: novaSenha.trim() === "", id: "novaSenhaErro", msg: "Por favor, insira a nova senha." },
        { cond: novaSenha === senhaAntiga, id: "novaSenhaErro", msg: "A nova senha não pode ser igual à antiga." },
        { cond: confirmaSenha.trim() === "", id: "confirmaSenhaErro", msg: "Por favor, confirme a nova senha." },
        { cond: novaSenha !== confirmaSenha, id: "confirmaSenhaErro", msg: "As senhas não coincidem." }
    ];

    validarCampos.forEach(({ cond, id, msg }) => {
        if (cond) {
            document.getElementById(id).innerText = msg;
            document.getElementById(id).style.display = "block";
            document.getElementById(id.replace("Erro", "")).classList.add("error");
            valid = false;
        }
    });

    if (valid) {
        document.querySelector('button[onclick="trocarSenha()"]').style.display = "none";
        document.querySelector('button[type="reset"]').style.display = "none";
        document.getElementById("senhaAtualizada").style.display = "block";
        console.log("Validações concluídas com sucesso. Executando troca de senha...");
    } else {
        console.log("Validações falharam. Campos obrigatórios não preenchidos.");
    }
}

document.getElementById("usuario").addEventListener("input", function(event) {
    validarNomeUsuarioInput(event);
    if (this.value !== "") {
        document.getElementById("usuarioErro").style.display = "none";
        this.classList.remove("error");
    }
});
document.getElementById("senhaAntiga").addEventListener("input", function() {
    if (this.value !== "") {
        document.getElementById("senhaAntigaErro").style.display = "none";
        this.classList.remove("error");
    }
});
document.getElementById("novaSenha").addEventListener("input", function() {
    if (this.value !== "") {
        document.getElementById("novaSenhaErro").style.display = "none";
        this.classList.remove("error");
    }
});
document.getElementById("confirmaSenha").addEventListener("input", function() {
    if (this.value !== "") {
        document.getElementById("confirmaSenhaErro").style.display = "none";
        this.classList.remove("error");
    }
});
