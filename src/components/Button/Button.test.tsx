import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import Button, {ButtonProps} from './button';
const defaultProps = {
    onClick: jest.fn(),
};

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass',
};

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
};
describe('test Button component', () => {
    it('should render the correct default button', () => {
        const utils = render(<Button {...defaultProps}>Nice</Button>);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = utils.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        //判断某个属性是false
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the correct component based on different props', () => {
        const utils = render(<Button {...testProps}>Nice</Button>);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = utils.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
    });
    it('should render a link when btnType equals link and href is provided', () => {
        const utils = render(
            <Button btnType="link" href="http://dummyurl">
                Link
            </Button>,
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = utils.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });
    it('should render disabled button when disabled set to true', () => {
        const utils = render(<Button {...disabledProps}>Nice</Button>);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const element = utils.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
});
