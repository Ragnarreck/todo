import React from 'react';
import { Button } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

export const SubmitButton = ({ onClick, submitText }) => {
    return (
        <Button color="primary" type="submit" onClick={onClick}>
            {submitText || 'Submit'}
            <SendIcon />
        </Button>
    );
};