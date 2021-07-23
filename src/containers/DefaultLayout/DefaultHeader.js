import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
//import { Badge } from 'reactstrap';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
//import { AppAsideToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/logoCel.png'

import Cookies from 'js-cookie'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          full={{ src: logo, width: 156, height: 42, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          {/* Opção para colocar um menu auxiliar*/}
          {/*
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
          */}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* AQUI ESTÁ NO NAVBAR ONDE É INSERIDO INFORMAÇÕES DE ATUALIZAÇÃO PARA O USUÁRIO */}
          {/* BEM COMO O AVATAR DO USUÁRIO E AS OPÇÕES PARA O USUÁRIO POR EXEMPLO DO LOGOUT */}
          {/* ALGUMAS OPÇÕES EU COMENTEI PARA RETIRAR DA VISUALIZAÇÃO COMO O SINO DE AVISOS */}
          {/* UMA OPÇÃO DE MENU, E TAMBÉM UMA OPÇÕES DE LOCALIZAÇÃO*/}
          {/*
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          */}
          {/*
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          */}
          {/*
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          */}
          {/* UM DETALHE IMPORTANTE*/}
          {/* ESSES NAVITEM QUE COMENTEI SÃO ESCONDIDOS QUANDO É USADO EM TELAS MENORES*/}
          {/* POR ISSO COLOQUEI O EMAIL AQUI*/}
          <NavItem className="d-md-down-none">
            {JSON.parse(Cookies.get('covid-mata'))['mail']}
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="" />
            </DropdownToggle>
            <DropdownMenu right>
              {/*
              <DropdownItem header tag="div" className="text-center"><strong>Conta</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              */}
              <DropdownItem header tag="div" className="text-center"><strong>Conta</strong></DropdownItem>
              {/*
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* A OPÇÃO ABAIXO É UMA ESPÉCIE DE MENU PARA CONVERSA OU POSSIBILIDADE DE VER OUTRAR ATUALIZAÇÕES*/}
        {/*
        <AppAsideToggler className="d-md-down-none" />
        */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
