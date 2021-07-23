import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { toast } from 'react-toastify';
//import { ToastContainer } from 'react-toastify';
import { api } from '../../../services/api';
import Cookies from 'js-cookie'

const initialState = {
    usuario: { id: 0, name: '', email: '', password: '' },
    login: {
        dn: '-',
        cn: '-',
        sn: '-',
        givenName: '-',
        distinguishedName: '-',
        displayName: '-',
        name: '-',
        userPrincipalName: '-',
        mail: '-',
    },
    token: '-',
}

export default class Login extends Component {

    state = {...initialState }

    updateField(event) {
        const usuario = {...this.state.usuario }
        usuario[event.target.name] = event.target.value
        this.setState({ usuario })
            //console.log(this.usuario.email)
    }

    cadastrar() {
        var myAry = {}
        Cookies.set('covid-cadastro', JSON.stringify(myAry), { expires: 2, path: '' })
        this.props.history.push('/register')
    }

    login() {

        //https://www.npmjs.com/package/react-toastify
        const usuario = this.state.usuario
        if (!usuario.email) {
            toast.error('Digite seu email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }
        if (!usuario.password) {
            toast.error('Digite sua senha', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }
        api.post('/auth/login', usuario).then(resp => {
            //console.log(resp.data)
                //console.log(resp.status)
                //console.log(resp.data.data.name)
            if (resp.status === 200) {
                //console.log('deu certo')
            } else {
                //console.log('deu errado')
                toast.error('Seus dados estão incorretos', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                return
            }

            this.setState({ login: resp.data.data.user })
            this.setState({ token: resp.data.token })
            this.setState({ email: resp.data.data.name })
            this.setState({ name: resp.data.data.email })
            this.setState({ id: resp.data.data.id })
            api.defaults.headers.Authorization = `Baerer ${resp.data.token}`
                //console.log(resp.data.session)

            var myAry = {
                //'dn': this.state.login.dn,
                //'cn': this.state.login.cn,
                //'sn': this.state.login.sn,
                //'givenName': this.state.login.givenName,
                //'distinguishedName': this.state.login.distinguishedName,
                //'displayName': this.state.login.displayName,
                'name': this.state.name,
                'id': this.state.id,
                //'userPrincipalName': this.state.login.userPrincipalName,
                'mail': this.state.email,
                'TOKEN': this.state.token
            }
            console.log(myAry)
                //var myAry = {'n1':'1','n2':'2'};


            Cookies.set('covid-mata', JSON.stringify(myAry), { expires: 2, path: '' })
            this.props.history.push('/exames/laboratorios')

        }).catch(error => {
            console.log(error)
            toast.error('Erro ao efetuar login', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }

    montaTela() {
        return ( <
                Container >
                <
                Row className = "justify-content-center" >
                <
                Col md = "8" >
                <
                CardGroup >
                <
                Card className = "p-4" >
                <
                CardBody >
                <
                Form action = ""
                method = "post"
                encType = "multipart/form-data"
                className = "form-horizontal" >
                <
                h1 > Login < /h1> <
                p className = "text-muted" > Acesse a sua conta < /p> <
                InputGroup className = "mb-3" >
                <
                InputGroupAddon addonType = "prepend" >
                <
                InputGroupText >
                <
                i className = "icon-user" > < /i> < /
                InputGroupText > <
                /InputGroupAddon> <
                Input type = "text"
                id = "email"
                name = "email"
                placeholder = "Email"
                value = { this.state.usuario.nome }
                onChange = { e => this.updateField(e) }
                /> < /
                InputGroup > <
                InputGroup className = "mb-4" >
                <
                InputGroupAddon addonType = "prepend" >
                <
                InputGroupText >
                <
                i className = "icon-lock" > < /i> < /
                InputGroupText > <
                /InputGroupAddon> <
                Input type = "password"
                id = "password"
                name = "password"
                placeholder = "Senha"
                value = { this.state.usuario.password }
                onChange = { e => this.updateField(e) }
                /> < /
                InputGroup > <
                Row >
                <
                Col xs = "6" >
                <
                Button color = "primary"
                className = "px-4"
                onClick = { e => this.login(e) } > Login < /Button> < /
                Col > <
                Col xs = "6"
                className = "text-right" > { /*<Button color="link" className="px-0">Forgot password?</Button>*/ } <
                /Col> < /
                Row > <
                Row className = "align-items-center mt-3" >
                <
                Col col = "12" >
                <
                Button block color = "ghost-secondary"
                onClick = { e => this.cadastrar(e) } > Cadastrar < /Button> < /
                Col > <
                /Row> < /
                Form > <
                /CardBody> < /
                Card > <
                Card className = "d-md-down-none" >
                <
                img src = { '../../assets/img/img/pref.png' }
                className = "img-fluid"
                alt = "imagem" / >
                <
                /Card> {
                /*
                              <Card>
                                
                              </Card>
                              */
            } <
            /CardGroup> < /
        Col > <
            /Row> < /
        Container >
    )
}

render() {
    return ( <
        div className = "app flex-row align-items-center" > { this.montaTela() } <
        /div>
    )
}
}