import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { api } from '../../../services/api';

import Cookies from 'js-cookie';

const initialState = {
    usuario: { id: 0, name: '', email: '', password: '', confirmpassword: '' },
    token: '-',
}


export default class Register extends Component {


    state = {...initialState }

    updateField(event) {
        const usuario = {...this.state.usuario }
        usuario[event.target.name] = event.target.value
        this.setState({ usuario })
            //console.log(usuario.name)
    }

    naoregistrar() {
        Cookies.remove('covid-cadastro')
        Cookies.remove('covid-cadastro', { path: '' });
        this.props.history.push('/login')
    }

    registrar() {
        const usuario = this.state.usuario
        if (!usuario.name) {
            toast.error('Digite seu nome', {
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
        if (usuario.password !== usuario.confirmpassword) {
            toast.error('A senha está diferente da confirmação de senha', {
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
        console.log(usuario)
        api.post('/user', usuario).then(resp => {
            console.log(resp.status)
                //if (resp.data.login === 'true') {
            if (resp.status === 200) {
                toast.success('Usuário cadastrado com sucesso', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    //Cookies.remove('name') // fail!
                Cookies.remove('covid-cadastro')
                Cookies.remove('covid-cadastro', { path: '' });
                this.props.history.push('/login')
            } else {
                //console.log('deu errado')
                toast.error('Erro ao cadastrar usuário', {
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
        }).catch(error => {
            console.log('deu errado')
            console.log(error)
            toast.error('Erro ao cadastrar usuário. Problemas ao conectar a API', {
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
            Col md = "9"
            lg = "7"
            xl = "6" >
            <
            Card className = "mx-4" >
            <
            CardBody className = "p-4" >
            <
            Form >
            <
            h1 > Registro de novo usuário < /h1> <
            p className = "text-muted" > Crie sua conta < /p> <
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
            placeholder = "Nome"
            name = "name"
            onChange = { e => this.updateField(e) }
            /> < /
            InputGroup > <
            InputGroup className = "mb-3" >
            <
            InputGroupAddon addonType = "prepend" >
            <
            InputGroupText > @ < /InputGroupText> < /
            InputGroupAddon > <
            Input type = "text"
            placeholder = "Email"
            name = "email"
            onChange = { e => this.updateField(e) }
            /> < /
            InputGroup > <
            InputGroup className = "mb-3" >
            <
            InputGroupAddon addonType = "prepend" >
            <
            InputGroupText >
            <
            i className = "icon-lock" > < /i> < /
            InputGroupText > <
            /InputGroupAddon> <
            Input type = "password"
            placeholder = "Senha"
            name = "password"
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
            placeholder = "Confirme sua senha"
            name = "confirmpassword"
            onChange = { e => this.updateField(e) }
            /> < /
            InputGroup > <
            Button color = "success"
            onClick = { e => this.registrar(e) }
            block > Criar conta < /Button> <
            Button color = "danger"
            onClick = { e => this.naoregistrar(e) }
            block > Não cadastrar < /Button> < /
            Form > <
            /CardBody> < /
            Card > <
            /Col> < /
            Row > <
            /Container>
        )
    }

    render() {
        return ( <
            div className = "app flex-row align-items-center" > { this.montaTela() } <
            /div>
        );
    }
}