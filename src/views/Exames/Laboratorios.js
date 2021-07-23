import React, { Component } from 'react'

//https://www.npmjs.com/package/react-toastify
//import { ToastContainer, toast } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie'

import {
  Table,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  div,
  Row,
} from 'reactstrap'
import axios from 'axios'
//import { api, url } from '../../services/api';
import { url } from '../../services/api';

//const baseUrl = 'http://localhost:3001/perfiloratorios'
const baseUrl = url + '/getPerfilGitHub'

const initialState = {
  perfilGitHub: { identificador: 0, login: '', foto: '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCABkAGQDAREAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAYHAwQFAQj/xAArEAABAwMDAwIGAwAAAAAAAAAAAQIDBAUGERIhEzFBByIUI0JRYXEWMmL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgYB/8QAMhEBAAIBAgMCCwkAAAAAAAAAAAECAwQREiExBWEGExQyM0FRUnGBoRUiNGKxwdHh8P/aAAwDAQACEQMRAD8A+qQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBWz1lxqtyyLGZqO4W2vn4hW4QfDo568sbtc7em9P67moVa6us24ecT3t7N4PZqYJzxNL1j3Z3/rkl97vVuslpqrrcZejRUjFkmf+E8InlVXhE8qWL3isbyyNNp75skY6c7Wa2L5E3ILU25Mt9ZbopF+VFXsZHI9itRySNax8ntXdxqpzjycUb7TCTW6Tye/BxVvP5ecfDpHN1yRUAAAAAAAAAACuPWv0/fklgS6WxqtyKzfPopI+JJGN9zokVOdfqZ/r9lPWYOOu8edD0fg52r5Pl4L+iycp/n9p7vgj2D3au9WZaGa8oxllx5In11Ciovxtx52vkZ4haia7V7rxyhFhtOfr0r9ZaHaWCvZUWjH6TLvtPu09kd66DReMAAAAAAAAAAABX+f32tul1gwDH5unc7i3qXmsZ3oqD61/EkiLtb+/GqKVc95mfF16z17ob/ZemripOryx9ynmx71/V8o9aBX61r6P57Q5Ba43/w+6o2kuFOmrumqJynOvPHUb9/cnYq3r5PfijzJb2lzfa+ltiv+Ipzifb/uk/KV809RBU08dRA9JYJmpJFI1dWuY5NWuRfsqGpEvCWrNZ2nlMMgcgAAAAAAAADx7UexzV7OTRdOF5BEuDjOD47jc1ZUWyGRKmvVq1dRPLJPK/Zrpq+RXO8kWPDWnT1r+s7SzaiIi88q9IiIiPo3cix20ZDaZrVdoEqKKfTezVUXVq6orXJoqKip3Q6yY4tG09EOk1eTT5IyY52tDDjGK2jGqBbfaklbS7tzY5ppJtvGmjOortqcdkPmPHFI2h1rddk1N+PJtxd0RH6OwSKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z' },
  listaPerfilGitHub: []
}

export default class CadastroExames extends Component {

  state = { ...initialState }

  componentWillMount() {
    axios(baseUrl + "?token=" + JSON.parse(Cookies.get('covid-mata'))['TOKEN']).then(resp => {
      console.log(resp.data.lista);
      this.setState({ listaPerfilGitHub: resp.data.lista })
    })
  }

  updateFieldPerfil(event) {
    const perfilGitHub = { ...this.state.perfilGitHub }
    perfilGitHub[event.target.name] = event.target.value
    this.setState({ perfilGitHub })
  }


  load(perfil) {
    this.setState({ perfilGitHub: perfil })
  }

  clear() {
    this.setState({ perfilGitHub: initialState.perfilGitHub })
  }

  getUpdatedList(perfil, add = true) {
    const list = this.state.listaPerfilGitHub.filter(l => l.id !== perfil.id)
    if (add) list.unshift(perfil)
    return list
  }

  remove(perfil) {
    /*
    axios.delete(`${baseUrl}/${perfil.id}`).then(resp => {
      const listaPerfilGitHub = this.getUpdatedList(perfil, false)
      this.setState({ listaPerfilGitHub })
      this.clear()
    })
    */
    //console.log(perfil.id)
    axios.delete(`${baseUrl}/${perfil.id}` + "?token=" + JSON.parse(Cookies.get('covid-mata'))['TOKEN']).then(resp => {
      //console.log(resp.data)
      const listaPerfilGitHub = this.getUpdatedList(perfil, false)
      this.setState({ listaPerfilGitHub })
      this.clear()
    })
  }

  save() {
    const perfilGitHub = this.state.perfilGitHub
    if (!perfilGitHub.login) {
      toast.error('Digite o login do usuário', {
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
    if (perfilGitHub.identificador === 0) {
      toast.error('Você não buscou nenhum perfil', {
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
    //const perfilGitHub = this.state.perfilGitHub
    //const method = perfilGitHub.id ? 'put' : 'post'
    //const url = perfilGitHub.id ? `${baseUrl}/${perfilGitHub.id}` : baseUrl
    const method = 'post'
    const url = baseUrl
    //console.log(perfilGitHub)
    axios[method](url + "?token=" + JSON.parse(Cookies.get('covid-mata'))['TOKEN'], perfilGitHub)
      .then(resp => {
        console.log(resp)
        const list = this.getUpdatedList(resp.data.perfilgravado)
        this.setState({ perfilGitHub: initialState.perfilGitHub, listaPerfilGitHub: list })
        
      }).catch(error => {
        console.log(error.response.data)
        toast.error('Erro ao gravar perfil', {
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

  getUser() {
    const perfilGitHub = this.state.perfilGitHub
    if (!perfilGitHub.login) {
      toast.error('Digite o login do usuario', {
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
    //const perfilGitHub = this.state.perfilGitHub
    //const method = perfilGitHub.id ? 'put' : 'post'
    //const url = perfilGitHub.id ? `${baseUrl}/${perfilGitHub.id}` : baseUrl
    const method = 'get'
    const url = baseUrl
    //console.log(perfilGitHub)
    axios[method](url + "/" + perfilGitHub.login + "?token=" + JSON.parse(Cookies.get('covid-mata'))['TOKEN'])
      .then(resp => {
        //console.log(resp.data.identificador)
        //console.log(resp.data.login)
        //console.log(resp.data.foto)
        //const list = this.getUpdatedList(resp.data.dados)
        //console.log(list)
        //this.setState({ perfilGitHub: initialState.perfilGitHub, listaPerfilGitHub: list })
        this.load(resp.data)
        console.log(this.state)
      })
  }

  renderTable() {
    return (

      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Lista de usuários favoritos
        </CardHeader>
        <CardBody>
          <Table responsive striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>login</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    )
  }

  renderRows() {
    return this.state.listaPerfilGitHub.map(perfils => {
      return (
        <tr key={perfils.id}>
          <td>{perfils.id}</td>
          <td>{perfils.login}</td>
          <td>
            <button className="btn btn-warning"
              onClick={() => this.load(perfils)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(perfils)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  renderFormulario() {
    return (
      <Card>
        <CardHeader>
          Busca perfil
        </CardHeader>
        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <div htmlFor="text-input">login do usuário no GitHub</div>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" id="login" name="login" placeholder="login do usuário no GitHub"
                  value={this.state.perfilGitHub.login}
                  onChange={e => this.updateFieldPerfil(e)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="8">
                {/*  */}
              </Col>

              <Col>
                <Button block color="warning" onClick={e => this.getUser(e)}>Buscar</Button>
              </Col>
              <Col>
                <Button block color="primary" onClick={e => this.save(e)}>Gravar</Button>
              </Col>
              <Col>
                <Button block color="secondary" onClick={e => this.clear(e)}>Cancelar</Button>
              </Col>

            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }

  renderPerfil() {
    return (
      <Card>
        <CardHeader>
          Resultado
        </CardHeader>
        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <div htmlFor="text-input">Identificador</div>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" id="identificador" name="identificador" placeholder=""
                  value={this.state.perfilGitHub.identificador}
                  onChange={e => this.updateFieldPerfil(e)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <div htmlFor="text-input">Imagem</div>
              </Col>
              <Col xs="12" md="9">
                <img id="imagemPerfil" name="imagemPerfil" src={`data:image/jpeg;base64,${this.state.perfilGitHub.foto}`} />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" md="12">
            {this.renderFormulario()}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            {this.renderPerfil()}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            {this.renderTable()}
          </Col>
        </Row>
      </div>
    )
  }
}
