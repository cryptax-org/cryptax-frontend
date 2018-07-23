import Chance from 'chance';
import { Form } from 'semantic-ui-react'
import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from './signUp';

const chance = new Chance();

const getMockTextInputEvent = (name) => {
  return {
    target: { value: chance.string(), name },
  };
}

describe('SignUp Component', () => {
  let wrapper;
  const mockSignUp = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<SignUp signUp={mockSignUp}/>)
    mockSignUp.mockClear();
  });

  describe('When the form is filled', () => {
    beforeEach(() => {
      const inputs = wrapper.find(Form.Input);

      for (let i = 0; i < inputs.length; i++) {
        inputs.at(i).simulate('change', getMockTextInputEvent(inputs.at(i).prop('name')));
      }

      const checkbox = wrapper.find(Form.Checkbox);
      checkbox.simulate('change', {}, {
        checked: true,
        name: 'checkbox',
        type: 'checkbox',
        name: checkbox.prop('name')
      });
    });

    it('should submit the form', () => {
      wrapper.find(Form).simulate(
        'submit',
        {preventDefault() {}}
      )

      expect(mockSignUp.mock.calls.length).toBe(1)
    });
  });

  describe('When the form is NOT filled', () => {
    it('should NOT submit the form', () => {
      wrapper.find(Form).simulate(
        'submit',
        {preventDefault() {}}
      )

      expect(mockSignUp.mock.calls.length).toBe(0)
    });
  });
});
