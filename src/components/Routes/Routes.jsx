import { connect } from 'react-redux';
import { Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import MainPage from '../../pages/MainPage';
import RegisterPage from '../../pages/RegisterPage';

const Routes = ({auth}) => {
	return (
				<Switch>
					<Route path="/login" component={LoginPage}/>
					<Route path="/register" component={RegisterPage}/>
					<Route path="/main" component={MainPage} />
					<Route exact path="/">{auth ? <Redirect to="/main"/> : <Redirect to="/login" /> }</Route>
				</Switch>
			)
}

export default connect(state => ({auth : state.auth?.payload}))(Routes);