import React from 'react';
import { pipe, pathOr } from 'ramda';
import { Draggable } from 'react-beautiful-dnd';
import { withStyles, Paper, Typography, IconButton } from '@material-ui/core';
import { Edit as EditIcon, OpenWith as DraggableIcon } from '@material-ui/icons';
import styles from './styles';

const getRandomColor = () => {
    const letters = 'BCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
};

class Component extends React.Component {
    state = { color: getRandomColor() };

    render() {
        const { classes, initialValues, editNote, index } = this.props;
        const { color } = this.state;
        return (
            <Draggable
                index={index}
                key={initialValues._id}
                draggableId={initialValues._id}
            >
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Paper
                            style={{ background: color }}
                            classes={{ root: classes.paper }}
                        >
                            <div className={classes.buttons}>
                                <IconButton onClick={() => editNote(initialValues)}>
                                    <EditIcon />
                                </IconButton>
                                <div className={classes.draggable}>
                                    <DraggableIcon />
                                </div>
                            </div>

                            <Typography component="h2" className={classes.title} color="textPrimary" gutterBottom>
                                {pathOr(' ', ['title'], initialValues)}
                            </Typography>

                            <Typography component="p" className={classes.description}>
                                {pathOr(' ', ['description'], initialValues)}
                            </Typography>

                            <Typography className={classes.date} color="textSecondary" gutterBottom>
                                {pathOr(' ', ['date'], initialValues)}
                            </Typography>
                        </Paper>
                    </div>
                )}
            </Draggable>
        );
    }
}

export const Note = pipe(
    withStyles(styles)
)(Component);