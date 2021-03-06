/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');
var Icon = require('./icon.js');

var Input = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['color', 'date', 'datetime', 'datetime-local', 'email', 'file', 'hidden', 'month', 'number', 'password', 'range', 'tel', 'text', 'time', 'url', 'week'])
    },

    changeValue: function(event) {
        this.setValue(event.currentTarget.value);
    },

    getDefaultProps: function() {
        return {
            type: 'text'
        };
    },

    render: function() {

        var warningIcon = '';

        if (this.showErrors()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        if (this.props.layout === 'elementOnly' || this.props.type === 'hidden') {
            return this.renderElement();
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
            >
                {this.renderElement()}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var className = 'form-control';
        var nonTextTypes = ['range', 'file'];
        if (nonTextTypes.indexOf(this.props.type) !== -1) {
            className = null;
        }
        return (
            <input
                className={className}
                {...this.props}
                label={null}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    }

});

module.exports = Input;
