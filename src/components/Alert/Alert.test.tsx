/* eslint-disable testing-library/no-container */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Alert, {BaseAlertProps} from './alert';

const jsxEle = () => {
    return <span>我是描述</span>;
};

const testProps: BaseAlertProps = {
    title: '我是标题',
    onClose: jest.fn(),
};

const typeProps: BaseAlertProps = {
    title: '我是标题',
    type: 'success',
    description: jsxEle(),
    closable: true,
};

describe('test Autton component', () => {
    it('should alert been render in right type', () => {
        const {container} = render(<Alert {...typeProps} />);
        expect(screen.getByText('我是标题')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-debugging-utils, testing-library/no-node-access
        expect(container.querySelector('.river-alert')).toHaveClass('river-alert-success');
        expect(screen.getByText('我是描述')).toBeInTheDocument();
        expect(screen.getByText('关闭')).toBeInTheDocument();
    });

    it('should alert can be close', () => {
        render(<Alert {...testProps} />);
        const element = screen.getByText('关闭');
        expect(element).toBeInTheDocument();
        fireEvent.click(element);
        expect(testProps.onClose).toHaveBeenCalled();
    });
});
