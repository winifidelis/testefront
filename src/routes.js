import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const Laboratorios = React.lazy(() => import('./views/Exames/Laboratorios'));

const Cadastrar = React.lazy(() => import('./views/Pages/Register/Register'));

//const Opcao1 = React.lazy(() => import('./views/Opcoes/Opcao1'));
//const Opcao2 = React.lazy(() => import('./views/Opcoes/Opcao2'));
//const Opcao3 = React.lazy(() => import('./views/Opcoes/Opcao3'));
//const Opcao4 = React.lazy(() => import('./views/Opcoes/Opcao4'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/login', name: 'Login', component: Dashboard },
  { path: '/register', name: 'Register', component: Cadastrar },
  { path: '/exames/laboratorios', name: 'Perfis GitHub', component: Laboratorios },

/*
  { path: '/opcoes', exact: true, name: 'Opções', component: Opcao1 },
  { path: '/opcoes/1', name: '1', component: Opcao1 },
  { path: '/opcoes/2', name: '2', component: Opcao2 },
  { path: '/opcoes/3', name: '3', component: Opcao3 },
  { path: '/opcoes/4', name: '4', component: Opcao4 },
  */
];

export default routes;
