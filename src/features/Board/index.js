import React from 'react';
import { pipe, path } from 'ramda';
import moment from 'moment';
import { connect } from 'react-redux';
import { IconButton, withStyles } from '@material-ui/core';
import {
    Work as WorkIcon,
    PermIdentity as FaceIcon,
    ControlPoint as NoteAddIcon,
    SupervisorAccount as WeekendIcon,
} from '@material-ui/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { createNote, getNotes, removeNote, updateNote } from './actions';
import { getItem } from '../../utils/localstorage';
import { FixedMenu } from '../../ui/organism/FixedMenu';
import { DrawerForm } from '../../ui/organism/DrawerForm';
import { Note } from './organism/Note';
import styles from './styles';

const groups = [
    { id: 'personal', text: 'Personal', icon: <FaceIcon /> },
    { id: 'work', text: 'Work', icon: <WorkIcon /> },
    { id: 'family', text: 'Family', icon: <WeekendIcon /> }
];

class Component extends React.Component {
    state = {
        group: null,
        initialValues: null,
        showDrawerForm: false,
        selectedDate: new Date(),
    };

    componentDidMount() {
        const { group, selectedDate } = this.state;
        const { getNotesAction } = this.props;
        const userId = getItem('USER_ID');
        const date = moment(selectedDate).format('DD-MM-YYYY');
        getNotesAction({ userId, date, group });
    }

    onSelectDate = date => {
        const { group } = this.state;
        const { getNotesAction } = this.props;
        const userId = getItem('USER_ID');
        getNotesAction({
            group,
            userId,
            date: moment(date).format('DD-MM-YYYY')
        });
        this.setState(state => ({
            ...state,
            selectedDate: date
        }));
    };

    onSelectGroup = ({ id }) => {
        const { selectedDate } = this.state;
        const { getNotesAction } = this.props;
        const userId = getItem('USER_ID');
        getNotesAction({
            userId,
            group: id,
            date: moment(selectedDate).format('DD-MM-YYYY')
        });
        this.setState(state => ({
            ...state,
            group: id,
        }));
    };

    editNote = values => this.setState(state => ({
        ...state,
        initialValues: values,
        showDrawerForm: true,
    }));

    addNote = () => this.setState(state => ({
        ...state,
        initialValues: null,
        showDrawerForm: true,
    }));

    closeDrawer = () => this.setState(state => ({
        ...state,
        initialValues: null,
        showDrawerForm: false
    }));

    createOrUpdateNote = values => {
        const { createNoteAction, updateNoteAction } = this.props;
        const { initialValues } = this.state;
        this.setState(state => ({ ...state, showDrawerForm: false }));
        return initialValues
            ? updateNoteAction(values)
            : createNoteAction(values);
    };

    onDragEnd = ({ draggableId, destination }) => {
        const { removeNoteAction } = this.props;
        const isTrashDroppable = path(['droppableId'], destination) === 'trash';
        return draggableId && isTrashDroppable && removeNoteAction(draggableId);
    };

    render() {
        const { classes, notes } = this.props;
        const { selectedDate, showDrawerForm, initialValues } = this.state;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={classes.wrapper}>
                    <div className={classes.menu}>
                        <FixedMenu
                            groups={groups}
                            date={selectedDate}
                            onSelectDate={this.onSelectDate}
                            onSelectGroup={this.onSelectGroup}
                        />
                    </div>
                    <Droppable droppableId="notes">
                        {provided => (
                            <div ref={provided.innerRef}>
                                <div className={classes.notes}>
                                    {notes && notes.map((note, index) => (
                                        <Note
                                            editNote={this.editNote}
                                            initialValues={note}
                                            key={note._id}
                                            index={index}
                                        />))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className={classes.addNote}>
                        <IconButton onClick={this.addNote}>
                            <NoteAddIcon fontSize="large" />
                        </IconButton>
                    </div>

                    {showDrawerForm && (
                        <DrawerForm
                            groups={groups}
                            initialValues={initialValues}
                            isOpen={showDrawerForm}
                            onClose={this.closeDrawer}
                            onSubmit={this.createOrUpdateNote}
                        />
                    )}
                </div>
            </DragDropContext>
        );
    };
}

const mapStateToProps = ({ board }) => ({
    notes: board.notes
});

const mapActionsToProps = {
    getNotesAction: getNotes,
    createNoteAction: createNote,
    updateNoteAction: updateNote,
    removeNoteAction: removeNote,
};

export const Board = pipe(
    withStyles(styles),
    connect(mapStateToProps, mapActionsToProps)
)(Component);