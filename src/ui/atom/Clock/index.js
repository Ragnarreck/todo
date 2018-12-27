import React from 'react';
import { pipe } from 'ramda';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import styles from './styles';

class Component extends React.Component {
    state = {
        time: moment().format('HH:mm'),
        date: moment().format('ddd DD MMM')
    };

    componentDidMount() {
        setInterval(() => this.updateClock(), 30000);
    }

    componentWillUnmount() {
        clearInterval();
    }

    updateClock = () => this.setState({
        time: moment().format('HH:mm'),
        date: moment().format('ddd DD MMM')
    });

    render() {
        const { classes } = this.props;
        const { time, date } = this.state;
        return (
            <div className={classes.wrapper}>
                <div className={[classes.centered, classes.time].join(' ')}>{time}</div>
                <div className={[classes.centered, classes.date].join(' ')}>{date}</div>
            </div>
        );
    }
}

export const Clock = pipe(
    withStyles(styles)
)(Component);