/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem, {MenuItemProps} from './menuItem';
const testMenuProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
};

const testVerticalProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
};

const MenuComponent = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index="0">我是第一条</MenuItem>
            <MenuItem index="1">我是第二条</MenuItem>
            <MenuItem index="2" disabled>
                我是第三条
            </MenuItem>
        </Menu>
    );
};

describe('test Menu and MenuItem Component', () => {
    it('should render in the correct form under default props', () => {
        const {container} = render(<MenuComponent {...testMenuProps}></MenuComponent>);
        let element = container.querySelector('.river-menu');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('test');
        expect(element).toHaveClass('is-horizontal');
        expect(element?.firstChild).toHaveClass('is-active');
    });

    it('click item should change activeIndex and call the right callback', () => {
        render(<MenuComponent {...testMenuProps}></MenuComponent>);
        const secondItem = screen.getByText('我是第二条');
        fireEvent.click(secondItem);
        expect(secondItem).toHaveClass('is-active');
        expect(screen.getByText('我是第一条')).not.toHaveClass('is-active');
        expect(testMenuProps.onSelect).toHaveBeenCalledWith('1');
        fireEvent.click(screen.getByText('我是第三条'));
        expect(screen.getByText('我是第三条')).not.toHaveClass('is-active');
        expect(testMenuProps.onSelect).not.toHaveBeenCalledWith('2');
    });
    it('should render in the right mode', () => {
        const {container} = render(<MenuComponent {...testVerticalProps}></MenuComponent>);

        let element = container.querySelector('.river-menu');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('is-vertical');
    });
});
