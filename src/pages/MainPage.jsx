import React, { useEffect } from "react";
import { Grid } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import  Aside  from "../components/Aside/Aside";
import ChatPageData from "../components/ChatPageData/ChatPageData";
import { CModalComponent } from '../components/Modal/Modal';
import { connect } from "react-redux";
import { actionAboutMe } from "../actions/actionAboutMe";

const MainPage = ({actionAboutMe}) => {
    useEffect(() => {
        actionAboutMe()
    },[])
    
	return(
			<main className='Main'>
				<Grid container columns={12}>
					<Grid item xs={4} >
							<Aside/>
					</Grid>
					<Grid item xs={8}>
							<Switch>
								<Route path="/main/:_id" exact component={ChatPageData}/>
							</Switch>
					</Grid>
				</Grid>
				<CModalComponent/>
			</main>
	)	
}

export default connect(null, {actionAboutMe: actionAboutMe})(MainPage)