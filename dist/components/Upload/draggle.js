import React, { useState } from 'react';
import classNames from 'classnames';
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var klass = classNames('river-uploader-dragger', {
        'is-dragover': dragOver,
    });
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        console.log('inside drag', e.dataTransfer.files);
        onFile(e.dataTransfer.files);
    };
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (React.createElement("div", { className: klass, onDragOver: function (e) {
            handleDrag(e, true);
        }, onDragLeave: function (e) {
            handleDrag(e, false);
        }, onDrop: handleDrop }, children));
};
export default Dragger;
