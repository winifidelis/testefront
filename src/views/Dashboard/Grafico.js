import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const initialState = {
    data1: [],
    data2: [],
    data3: [],
    dadosInferiores: [],
    qtdExames: 0
}

//const TotalExames = 2000
//const ExamesFeitos = 2000
//const MediaExames = 2000

const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

export default class Grafico extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
    }

    mainChart = {
        labels: this.state.dadosInferiores,
        datasets: [
            {
                label: 'Realizados no dia',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: this.state.data1,
            },
            {
                label: 'Estoque',
                backgroundColor: 'transparent',
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: this.state.data2,
            },
            {
                label: 'Total realizados',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5],
                data: this.state.data3,
            },
        ],
    }

    mainChartOpts = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                }
            }
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: Number(this.props.limiteSuperior) / 200,
                        stepSize: Math.ceil(Number(this.props.limiteSuperior) / 5),
                        max: Number(this.props.limiteSuperior) + 50,
                    },
                }],
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            },
        },
    }

    ModificandoDadosDoGrafico() {

        /*
        limiteSuperior={this.state.testeTotal}
        examesrealizados={this.state.listaExamesRealizados}
        quantidadeExames={this.state.listaExamesRealizados}
        */

        //data1 = linha1
        //data2 = linha2
        //data3 - linha3
        //console.log(this.props.examesrealizados.length)

        //this.setState({ data1: initialState.data1 })
        //this.setState({ data2: initialState.data2 })
        //this.setState({ data3: initialState.data3 })
        //this.setState({ dadosInferiores: initialState.dadosInferiores })

        if (this.props.examesrealizados.length > 0) {
            this.TotalExames = Number(this.props.limiteSuperior)
            this.ExamesFeitos = 0
            this.MediaExames = 1

            //this.setState({ data1: initialState.data1 })
            //this.setState({ data2: initialState.data2 })
            //this.setState({ data3: initialState.data3 })
            //this.setState({ dadosInferiores: initialState.dadosInferiores })
            //console.log('v')

            const aux = { ...this.state }
            aux.data1 = []
            aux.data2 = []
            aux.data3 = []
            aux.limiteSuperior = []
            aux.dadosInferiores = []
            console.log(this.TotalExames)
            for (var i = 0; i !== this.props.examesrealizados.length; i = i + 1) {
                //console.log(i)
                //this.state.data1.push(this.props.examesrealizados[i].realizado)
                aux.data1.push(this.props.examesrealizados[i].realizado)
                //this.state.data2.push(this.TotalExames - this.props.examesrealizados[i].realizado)
                aux.data2.push(this.TotalExames - this.props.examesrealizados[i].realizado)
                this.TotalExames = this.TotalExames - this.props.examesrealizados[i].realizado
                this.ExamesFeitos = this.ExamesFeitos + this.props.examesrealizados[i].realizado
                //this.state.data3.push(this.ExamesFeitos)
                aux.data3.push(this.ExamesFeitos)
                //this.state.dadosInferiores.push(this.props.examesrealizados[i].data)
                aux.dadosInferiores.push(this.props.examesrealizados[i].data)
            }

            //this.setState({ data1: aux.data1 })

            //modificando dados que serão plotados
            //this.mainChart.labels = this.state.dadosInferiores
            this.mainChart.labels = []
            this.mainChart.labels = aux.dadosInferiores
            //this.mainChart.datasets[0].data = this.state.data1
            this.mainChart.datasets[0].data = []
            this.mainChart.datasets[0].data = aux.data1
            //this.mainChart.datasets[1].data = this.state.data2
            this.mainChart.datasets[1].data = []
            this.mainChart.datasets[1].data = aux.data2
            //this.mainChart.datasets[2].data = this.state.data3
            this.mainChart.datasets[2].data = []
            this.mainChart.datasets[2].data = aux.data3

            this.mainChartOpts.scales.yAxes[0].ticks.max = []
            this.mainChartOpts.scales.yAxes[0].ticks.max = this.props.limiteSuperior
            //console.log(this.mainChart)
            //console.log(aux.limiteSuperior,this.mainChartOpts.scales.yAxes[0].ticks.max)
        }
    }


    render() {
        return (
            <div>
                {this.ModificandoDadosDoGrafico()}
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                    <Line data={this.mainChart} options={this.mainChartOpts} height={300} />
                </div>
            </div>
        )
    }
}
