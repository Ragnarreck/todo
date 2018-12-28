import React from 'react';
import { pipe, pathOr, all, path } from 'ramda';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { SnackBar } from '../../ui/atom/SnackBar';
import { LoginForm } from './organism/LoginOrSignUpForm';
import { Clock } from '../../ui/atom/Clock';
import { login, createUser } from './actions';
import styles from './styles';

class Component extends React.Component {
    state = {
        login: '',
        errors: {},
        password: '',
        textSnackBar: '',
        isSignUpPage: false,
        showSnackBar: false,
    };

    onChangeState = field => event => {
        event.preventDefault();
        const value = pathOr('', ['target', 'value'], event);
        this.setState(state => ({
            ...state,
            [field]: value
        }));
    };

    onChangeMode = () => this.setState(state => ({
        ...state,
        login: '',
        password: '',
        isSignUpPage: !state.isSignUpPage
    }));

    showShackBar = text => this.setState(state => ({
        ...state,
        textSnackBar: text,
        showSnackBar: true,
    }));

    closeShackBar = () => this.setState(state => ({
        ...state,
        showSnackBar: false,
    }));

    validate = () => {
        const { login, password, isSignUpPage } = this.state;
        const loginValidate  = !login && 'Required';
        const passwordValidate = (!password && 'Required') || (isSignUpPage && password.length < 5 && 'At least 5 letters for password');
        const errors = {
            login: loginValidate,
            password: passwordValidate
        };
        this.setState(state => ({ ...state, errors }));
        return all(item => !errors[item])(Object.keys(errors));
    };

    submitForm = () => {
        const { loginAction, createUserAction } = this.props;
        const { login, password, isSignUpPage } = this.state;
        const action = isSignUpPage ? createUserAction : loginAction;
        return this.validate() && action({ password, login }, err => {
            const error = path(['response', 'data', 'error'], err);
            return error && this.showShackBar(error);
        });
    };

    render() {
        const { classes } = this.props;
        const { login, password, isSignUpPage, errors, showSnackBar, textSnackBar } = this.state;
        return (
            <div className={classes.wrapper}>
                <SnackBar
                    isOpen={showSnackBar}
                    message={textSnackBar}
                    onClose={this.closeShackBar}
                />
                <div className={classes.clock}>
                    <Clock />
                </div>
                <div className={classes.loginForm}>
                    <LoginForm
                        errors={errors}
                        login={login}
                        password={password}
                        isSignUpPage={isSignUpPage}
                        onChangeState={this.onChangeState}
                        onSubmit={this.submitForm}
                    />
                    <div className={classes.hint}>
                        {isSignUpPage
                            ? 'Do you already have an account?'
                            : 'Don\'t have an account?'
                        }
                        <div className={classes.link} onClick={this.onChangeMode}>
                            {isSignUpPage ? 'Back to login page' : 'Sign up!'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapActionsToProps = {
    loginAction: login,
    createUserAction: createUser,
};

export const Login = pipe(
    withStyles(styles),
    connect(null, mapActionsToProps)
)(Component);