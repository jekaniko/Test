import React, {Component, PropTypes} from 'react';

if ( process.env.BROWSER ) {
    require('./QuizCard.less');
}

import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import Button                           from 'react-mdl/lib/Button';
import IconButton                       from 'react-mdl/lib/IconButton';
import Icon                             from 'react-mdl/lib/Icon';

import { sprintf } from '../utils';

export default class QuizCard extends Component {
    static contextTypes = { i18n: PropTypes.object };

    static propTypes = {
        id                : PropTypes.string,
        name              : PropTypes.string,
        message           : PropTypes.string,
        timeToPass        : PropTypes.number,
        numberOfQuestions : PropTypes.number,
        pictureURL        : PropTypes.string,
        author            : PropTypes.object,
        onClick           : PropTypes.func
    };

    render() {
        const { id, name, message, timeToPass, numberOfQuestions, pictureURL, author, onClick, onShare } = this.props;
        const { l, ngettext, humanizeDuration } = this.context.i18n;

        return (
            <Card className='QuizCard' shadow={1}>
                <CardTitle className='QuizCard__head'>
                    <div className='QuizCard__info'>
                        <img className='QuizCard__avatar' src={author.avatar} />
                        <div className='QuizCard__name-author'>
                            <div className='QuizCard__name' onClick={onClick} title={name}>
                                {name}
                            </div>

                            <div className='QuizCard__author' title={author.fullName}>
                                {author.fullName}
                            </div>
                        </div>
                    </div>
                </CardTitle>

                <div
                    className='QuizCard__media'
                    onClick={onClick}
                    style={{background: `url(${pictureURL}) center / cover`}}
                />

                <div className='QuizCard__content'>
                    <div className='QuizCard__details'>
                        <span>
                            {
                                sprintf(
                                    ngettext('%d question', '%d questions', numberOfQuestions),
                                    numberOfQuestions
                                )
                            }
                        </span>
                        <span className='QuizCard__span-divider'>•</span>
                        <span>{ humanizeDuration(timeToPass, 'second') }</span>
                    </div>
                    <p className='QuizCard__text'> {message} </p>
                </div>

                <CardActions
                    border={true}
                    className='QuizCard__actions'>
                    <div>
                        <IconButton
                            colored = {true}
                            name    = 'share'
                            onClick = {onShare}
                        />
                    </div>

                    <Button
                        colored = {true}
                        ripple  = {true}
                        onClick = {onClick}>
                        {l('View details')}
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
