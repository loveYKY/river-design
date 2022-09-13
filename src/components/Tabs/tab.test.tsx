/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import React from 'react'
import { render, fireEvent, RenderResult, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Tabs, { TabsProps } from './tabs'
import TabItem from './tabItem'

const testProps: TabsProps = {
  activeKey: '2',
  onSelect: jest.fn()
}
let wrapper: RenderResult
describe('test Tabs Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(
      <Tabs {...testProps}>
        <TabItem index='1' label="tab1">content1</TabItem>
        <TabItem index='2' label="tab2">content2</TabItem>
        <TabItem index='3' label="disabled" disabled>content3</TabItem>
      </Tabs>
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render the correct default Tabs', () => {
    const { queryByText, container } = wrapper
    expect(container.querySelector('.river-tabs-nav')).toHaveClass('nav-line')
    const activeElement = queryByText('tab2')
    expect(activeElement).toBeInTheDocument()
    expect(activeElement).toHaveClass('is-active')
    expect(queryByText('tab1')).not.toHaveClass('is-active')
    expect(queryByText('content2')).toBeInTheDocument()
    expect(queryByText('content1')).not.toBeInTheDocument()
  })
  it('click tabItem should switch to content', () => {
    const { queryByText, getByText } = wrapper
    const clickedElement = getByText('tab1')
    fireEvent.click(clickedElement)
    expect(clickedElement).toHaveClass('is-active')
    expect(queryByText('tab2')).not.toHaveClass('is-active')
    expect(queryByText('content1')).toBeInTheDocument()
    expect(queryByText('content2')).not.toBeInTheDocument()
    expect(testProps.onSelect).toHaveBeenCalledWith('1')
  })
  it('click disabled tabItem should not works', () => {
    const { getByText } = wrapper
    const disableElement = getByText('disabled')
    expect(disableElement).toHaveClass('disabled')
    fireEvent.click(disableElement)
    expect(disableElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })
})