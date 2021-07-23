import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_Menu';
// routes config
import routes from '../../routes';

import Cookies from 'js-cookie'
import { api } from '../../services/api';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    //Cookies.remove('name') // fail!
    Cookies.remove('covid-mata')
    Cookies.remove('covid-mata', { path: '' });
    this.props.history.push('/login')
  }

  render() {
    //console.log(Cookies.get('covid-mata'))
    if (Cookies.get('covid-mata')) {
      //console.log(Cookies.get())
      //console.log('logado')
      //Segue o fluxo
      //instalando na API o token de conexão
      api.defaults.headers.Authorization = `Baerer ${JSON.parse(Cookies.get('covid-mata'))['TOKEN']}`
      //console.log(JSON.parse(Cookies.get('covid-mata'))['TOKEN'])
    } else if (Cookies.get('covid-cadastro')) {
      console.log('abrir tela cadastro')
      this.props.history.push('/register')
    } else {
      console.log('abrir tela login')
      //console.log('fora do jogo')
      this.props.history.push('/login')
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            {/*Dentro de routes eu tenho a lista de rotas existente no meu projeto*/}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {/*console.log(Cookies.get())*/}
                  {/*console.log(JSON.parse(Cookies.get('covid-mata')))*/}
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/exames/laboratorios" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
