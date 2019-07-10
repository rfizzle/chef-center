import MfaPrompt from './index';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<MfaPrompt />', () => {
  it('renders a <button>', () => {
    const renderedComponent = shallow(
      <MfaPrompt mfa={''} onMfaChange={function () {
      }} onSubmit={function () {
      }}/>
    );
    expect(renderedComponent.dive().find('#mfa-submit').exists()).toBe(true);
  });

  it('renders an <input>', () => {
    const renderedComponent = shallow(
      <MfaPrompt mfa={''} onMfaChange={function () {
      }} onSubmit={function () {
      }}/>
    );
    expect(renderedComponent.dive().find('#mfa-input').exists()).toBe(true);
  });

  it('handles submit', () => {
    const onSubmitSpy = jest.fn();
    const renderedComponent = shallow(
      <MfaPrompt mfa={''} onMfaChange={function () {
      }} onSubmit={onSubmitSpy}/>
    );
    renderedComponent.dive().find('#mfa-submit').simulate('click', {
      preventDefault() {
      }
    });
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
