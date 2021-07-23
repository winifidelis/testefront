import React, { Component } from 'react';
import axios from 'axios';
//import { api, url } from '../../services/api';
import { url } from '../../services/api';
//import axios from 'axios'

import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Progress,
  Row,
  //Table,
  //Button,
  //CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import MeuGrafico from './Grafico'

const baseUrlTeste = url + '/testes'
const baseUrlInventario = url + '/inventario'
const baseUrlLaboratorio = url + '/laboratorios'
const baseUrlConsumo = url + '/consumo'
const initialState = {

  teste: { nome: '', id: 0 },
  laboratorio: { nome: '', id: 0 },
  inventario: { id: 0, quantidade: '', data: '', TesteId: 0 },
  consumo: {
    laboratorioId: 0,
    TesteId: 0,
    data: '',
    realizado: '',
    processamento: '',
    liberado: ''
  },
  listaDeTestes: [],
  listaDeInventarios: [],
  listaDeConsumos: [],
  listaDeLaboratorios: [],

  testeSelecionado: 0,
  testeTotal: 0,
  testeConsumido: 0,
  listaExamesRealizados: [],
}



export default class Dashboard extends Component {

  state = { ...initialState }

  componentWillMount() {




    axios.all([
      axios.get(baseUrlConsumo),
      axios.get(baseUrlInventario),
      axios.get(baseUrlLaboratorio),
      axios.get(baseUrlTeste)
    ]).then(axios.spread((consumoRes, inventarioRes, laboratorioRes, testeRes) => {
      this.setState({
        listaDeConsumos: consumoRes.data,
        listaDeInventarios: inventarioRes.data,
        listaDeLaboratorios: laboratorioRes.data,
        listaDeTestes: testeRes.data,
      })
      this.iniciaTela()
    }))

  }

  constructor(props) {
    super(props);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  iniciaTela() {
    const t = { ...this.state }
    if (t.listaDeTestes.length > 0) {
      t.testeTotal = 0;
      t.testeConsumido = 0;
      t.listaExamesRealizados = []
      t.testeSelecionado = t.listaDeTestes[0].id
      this.state.listaDeInventarios.map(soma => {
        if (soma.TesteId === t.listaDeTestes[0].id) {
          t.testeTotal = t.testeTotal + soma.quantidade
        } else {
        }
      })
      this.setState({ testeTotal: t.testeTotal, testeSelecionado: t.testeSelecionado })

      this.state.listaDeConsumos.map(soma => {
        if (soma.TesteId === t.listaDeTestes[0].id) {
          t.listaExamesRealizados.push(soma)
          t.testeConsumido = t.testeConsumido + soma.realizado
        } else {
        }
      })
      this.setState({ listaExamesRealizados: t.listaExamesRealizados, testeConsumido: t.testeConsumido })
    }
    //console.log(this.state)
  }


  updateSelectTestes(event) {
    const t = { ...this.state }
    t.testeTotal = 0;
    t.testeConsumido = 0;
    t.listaExamesRealizados = []
    t.testeSelecionado = event.target.value
    this.state.listaDeInventarios.map(soma => {
      if (soma.TesteId === event.target.value) {
        t.testeTotal = t.testeTotal + soma.quantidade
      } else {
      }
    })
    this.setState({ testeTotal: t.testeTotal, testeSelecionado: t.testeSelecionado })

    this.state.listaDeConsumos.map(soma => {
      if (soma.TesteId === event.target.value) {
        t.listaExamesRealizados.push(soma)
        t.testeConsumido = t.testeConsumido + soma.realizado
      } else {
      }
    })
    this.setState({ listaExamesRealizados: t.listaExamesRealizados, testeConsumido: t.testeConsumido })
  }


  desenhaTela() {
    //console.log(this.state)

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>

              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Selecione um teste</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" defaultValue='1' name="selectBoxTestes" id="selectBoxTestes"
                        onChange={e => this.updateSelectTestes(e)}>

                        {
                          this.state.listaDeTestes.map(
                            row => <option key={row.id} value={row.id}>{row.nome}</option>
                          )
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>

              <CardBody>
                {/*
                <MeuGrafico
                  limiteSuperior={this.state.qtdExames}
                  examesrealizados={this.state.listaExames}
                  quantidadeExames={this.state.listaQuantidadeExames} />
                */}

                {/*
                <div>Totais</div>
                <div>lista de consumos:     {this.state.listaDeConsumos.length}</div>
                <div>lista de inventários:  {this.state.listaDeInventarios.length}</div>
                <div>lista de laboratórios: {this.state.listaDeLaboratorios.length}</div>
                <div>lista de testes:       {this.state.listaDeTestes.length}</div>
                <div>-</div>
                <div>Seleção por teste</div>
                <div>ID teste selecionado:       {this.state.testeSelecionado}</div>
                <div>Quantidade de testes cadastrados:       {this.state.testeTotal}</div>
                <div>Lista consumo:       {this.state.listaExamesRealizados.length}</div>
                <div>Quantidade de testes consumidos:       {this.state.testeConsumido}</div>
                */}



                <MeuGrafico
                  limiteSuperior={this.state.testeTotal}
                  examesrealizados={this.state.listaExamesRealizados}
                  quantidadeExames={this.state.listaExamesRealizados} />


              </CardBody>

              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <Card>
                      <CardBody>
                        <div className="text-muted">Testes restantes - {this.state.testeTotal - this.state.testeConsumido}</div>
                        <strong>Restante ({(100 - ((this.state.testeConsumido / this.state.testeTotal) * 100)).toFixed(2)}%)</strong>
                        <Progress className="progress-xs mt-2" color="success" value={100 - ((this.state.testeConsumido / this.state.testeTotal) * 100)} />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <Card>
                      <CardBody>
                        <div className="text-muted">Testes utilizados - {this.state.testeConsumido}</div>
                        <strong>Utilizados ({((this.state.testeConsumido / this.state.testeTotal) * 100).toFixed(2)}%)</strong>
                        <Progress className="progress-xs mt-2" color="danger" value={(this.state.testeConsumido / this.state.testeTotal) * 100} />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      this.desenhaTela()
    )
  }
}
