import React from 'react';
import { pipe, pathOr } from 'ramda';
import Calendar from 'react-calendar';
import { Droppable } from 'react-beautiful-dnd';
import {
    List,
    ListItem,
    withStyles,
    IconButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import {
    AllInbox as AllIcon,
    Delete as DeleteIcon,
    ArrowBack as LogoutIcon
} from '@material-ui/icons';
import { history } from '../../../utils/app';
import styles from './styles';

const logout = () => {
    localStorage.clear();
    history.push('/login');
};

const Component = ({ classes, groups, date, onSelectDate, onSelectGroup }) => (
    <div className={classes.wrapper}>
        <div>
            <div className={classes.header}>
                <IconButton onClick={logout}>
                    <LogoutIcon />
                </IconButton>
                <div>
                    Logout
                </div>
            </div>
            <List
                className={classes.groups}
                subheader={<ListSubheader component="div">Groups</ListSubheader>}
            >
                <ListItem button key="all" onClick={() => onSelectGroup({ id: null })}>
                    <ListItemIcon>
                        <AllIcon />
                    </ListItemIcon>
                    <ListItemText primary="All groups" />
                </ListItem>
                {groups.map(group => (
                    <ListItem
                        button
                        key={group.id}
                        onClick={() => onSelectGroup(group)}
                    >
                        <ListItemIcon>
                            {pathOr('', ['icon'], group)}
                        </ListItemIcon>
                        <ListItemText primary={pathOr('', ['text'], group)} />
                    </ListItem>
                ))}
            </List>
        </div>
        <div>
            <div className={classes.subheader}>Date</div>
            <Calendar
                value={date}
                onChange={onSelectDate}
            />
        </div>
        <Droppable droppableId="trash">
            {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                    <div className={classes.deleteIcon} style={snapshot.isDraggingOver ? styles.isDragging : {}}>
                        <DeleteIcon fontSize="large" />
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

export const FixedMenu = pipe(
    withStyles(styles)
)(Component);