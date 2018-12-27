import React from 'react';
import { pipe } from 'ramda';
import { Close as CloseIcon, Error as ErrorIcon } from '@material-ui/icons';
import { Snackbar, SnackbarContent, withStyles, IconButton } from '@material-ui/core';
import styles from './styles';

const Component = ({ isOpen, onClose, message, classes }) => {
    return (
        <Snackbar
            variant="error"
            open={isOpen}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={3000}
        >
            <SnackbarContent
                className={classes.wrapper}
                message={(
                    <span id="client-snackbar" className={classes.message}>
                        <ErrorIcon />
                        {message}
                    </span>
                )}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
};

export const SnackBar = pipe(
    withStyles(styles)
)(Component);