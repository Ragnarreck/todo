import React from 'react';
import { pipe } from 'ramda';
import { TextField, withStyles, InputAdornment } from '@material-ui/core';
import {
    Lock as PasswordIcon,
    AccountCircle as LoginIcon,
} from '@material-ui/icons';
import { SubmitButton } from "../../../../ui/atom/SubmitButton";
import styles from './styles';

const Component = ({ classes, onSubmit, isSignUpPage, login, password, onChangeState, errors }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                {!isSignUpPage ? 'Login' : 'Sign Up Form'}
            </div>
            <TextField
                required
                id="login"
                value={login}
                error={errors.login}
                label={errors.login || ''}
                placeholder="Login"
                className={classes.marginBottom}
                onChange={onChangeState('login')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LoginIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                required
                id="password"
                value={password}
                error={errors.password}
                label={errors.password || ''}
                placeholder="Password"
                className={classes.marginBottom}
                onChange={onChangeState('password')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PasswordIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <SubmitButton onClick={onSubmit} />
        </div>
    );
};

export const LoginForm = pipe(
    withStyles(styles)
)(Component);