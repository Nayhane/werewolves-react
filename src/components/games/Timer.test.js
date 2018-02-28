import React from 'react'
import { shallow } from 'enzyme'
import Timer from './Timer'

describe('<Timer />', () => {
  const app = shallow(<Timer />)

  it('wraps everything in a div', () => {
    expect(app).toHaveTagName('div')
  })
})
