import React from 'react';
import { Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export const CloseButton = ({ onClick, closeText }) => {
    return (
        <Button color="secondary" onClick={onClick}>
            {closeText || 'Close'}
            <CloseIcon />
        </Button>
    );
};