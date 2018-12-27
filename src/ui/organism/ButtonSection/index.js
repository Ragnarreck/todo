import React from 'react';
import { pipe } from 'ramda';
import { withStyles } from '@material-ui/core';
import { CloseButton } from '../../atom/CloseButton';
import { SubmitButton } from '../../atom/SubmitButton';
import styles from './styles';

const Component = ({ classes, submitButtonText, closeButtonText, onSubmit, onClose }) => (
    <div className={classes.wrapper}>
        <SubmitButton submitText={submitButtonText} onClick={onSubmit} />
        <CloseButton closeText={closeButtonText} onClick={onClose} />
    </div>
);

export const ButtonSection = pipe(
    withStyles(styles)
)(Component);