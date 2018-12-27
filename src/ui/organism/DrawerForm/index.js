import React from 'react';
import { pipe, path, all, pathOr } from 'ramda';
import { withStyles, Drawer, TextField, MenuItem, Input } from '@material-ui/core';
import { ButtonSection } from '../ButtonSection';
import styles from './styles';

class Component extends React.Component {
    state = {
        errors: {},
        title: pathOr('', ['initialValues', 'title'], this.props),
        group: pathOr('', ['initialValues', 'group'], this.props),
        description: pathOr('', ['initialValues', 'description'], this.props),
    };

    componentDidMount() {
        this.setState({
            errors: {},
            title: pathOr('', ['initialValues', 'title'], this.props),
            group: pathOr('', ['initialValues', 'group'], this.props),
            description: pathOr('', ['initialValues', 'description'], this.props),
        });
    }

    changeField = field => event => {
        event.persist();
        this.setState(state => ({
            ...state,
            [field]: path(['target', 'value'], event)
        }));
    };

    validate = () => {
        const { group, description, title } = this.state;
        const errors = {
            title: !title && 'Required',
            group: !group && 'Required',
            description: !description && 'Required'
        };
        this.setState(state => ({ ...state, errors }));
        return all(item => !errors[item])(Object.keys(errors));
    };

    onSubmit = () => {
        const { onSubmit, initialValues } = this.props;
        const { group, description, title } = this.state;
        return this.validate() && onSubmit({ ...initialValues, group, description, title });
    };

    onClose = () => {
        const { onClose } = this.props;
        this.setState({
            title: '',
            group: '',
            errors: {},
            description: ''
        });
        onClose();
    };

    render() {
        console.log(pathOr('', ['initialValues', 'description'], this.props));
        const { group, description, errors, title } = this.state;
        console.log(this.state.description);
        console.log(description);
        const { isOpen, groups, classes } = this.props;
        return (
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={this.onClose}
            >
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        New ToDo
                    </div>
                    <div className={classes.field}>
                        <div className={classes.hint}>
                            Title for your note, please
                        </div>
                        <TextField
                            required
                            name="title"
                            value={title}
                            error={errors.title}
                            label={errors.title || ''}
                            inputProps={{ maxLength: 20 }}
                            onChange={this.changeField('title')}
                        />
                    </div>
                    <div className={classes.field}>
                        <div className={classes.hint}>
                            What's need to be done?
                        </div>
                        <TextField
                            required
                            multiline
                            name="description"
                            value={description}
                            error={errors.description}
                            label={errors.description || ''}
                            inputProps={{ maxLength: 50 }}
                            onChange={this.changeField('description')}
                        />
                    </div>
                    <div className={classes.field}>
                        <div className={classes.hint}>
                            Select group
                        </div>
                        <TextField
                            select
                            value={group}
                            name="group"
                            error={errors.group}
                            label={errors.group || ''}
                            onChange={this.changeField('group')}
                            input={<Input id="group-field" />}
                        >
                            <MenuItem value="">
                                Select...
                            </MenuItem>
                            {groups.map(item =>
                                <MenuItem key={item.id} value={item.id}>
                                    {item.text}
                                </MenuItem>
                            )}
                        </TextField>
                    </div>
                    <div className={classes.buttonSection}>
                        <ButtonSection
                            onClose={this.onClose}
                            submitButtonText="Save"
                            onSubmit={this.onSubmit}
                        />
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const DrawerForm = pipe(
    withStyles(styles)
)(Component);