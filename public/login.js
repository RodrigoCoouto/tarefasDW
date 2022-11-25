const sectionlogin = document.querySelector('#sectionlogin')

const checklogin = async () => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!username || !token) {
        displayFormLogin()
    } else {
        displayLinkLogout(username)
    }
}

const displayFormLogin = () => {
    sectionlogin.innerHTML = `
        <form>
            <div class="input-field">
                <input type="text" name="username" placeholder="Digite seu usuário" size="6">
                <div class="underline"></div>
            </div>
            <div class="input-field">
                <input type="password" name="password" placeholder="Digite sua senha" size="6">
                <div class="underline"></div>
            </div>
            &ensp;
            <button type="submit">Entrar</button>
           
        </form>
        <a href="">Vamos se cadastrar?</a>
        &ensp;`
    const formlogin = sectionlogin.querySelector('form')
    formlogin.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const payload = new URLSearchParams(new FormData(this))
        sendLogin(payload)
    })
    const linkcad = sectionlogin.querySelector('a')
    linkcad.addEventListener('click', displayFormCadastro)
}

function displayFormCadastro(evento) {
    evento.preventDefault()
    sectionlogin.innerHTML = `
    <form>
        <div class="input-field">
            <input type="text" name="username" placeholder="Digite seu novo usuário" size="6">
            <div class="underline"></div>
        </div>
        <div class="input-field">
            <input type="password" name="password" placeholder="Digite sua nova senha" size="6">
            <div class="underline"></div>
        </div>
        &ensp;
        <button type="submit">Cadastrar</button>
        &ensp;
    </form>`
    const formcadastro = sectionlogin.querySelector('form')
    formcadastro.addEventListener('submit', function (evento) {
        evento.preventDefault()
        const payload = new URLSearchParams(new FormData(this))
        sendCadastro(payload)
    })
}

const sendCadastro = (payload) => {
    fetch('signin', {
        method: 'PUT',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checklogin()
        })
}

const sendLogin = (payload) => {
    fetch('login', {
        method: 'POST',
        body: payload,
    })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (username && token) {
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
            }
            checklogin()
        })
}

const displayLinkLogout = (username) => {
    sectionlogin.innerHTML = `&ensp; <div><span>${username}</span> </div> 
    <div><a href="#">Deslogar</a> </div>`
    const linklogout = sectionlogin.querySelector('a')
    linklogout.addEventListener('click', function (evento) {
        evento.preventDefault()
        sendLogout()
    })
}

const sendLogout = () => {
    fetch('login', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            const { username, token } = data
            if (!username || !token) {
                localStorage.removeItem('username')
                localStorage.removeItem('token')
            }
            checklogin()
        })
}

checklogin()
