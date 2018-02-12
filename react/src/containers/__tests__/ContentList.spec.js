import { fromJS, List } from 'immutable';

import { getChildContent } from '../ContentList';
import * as models from '../../models';

const defaultState = {
  content: fromJS({
    data: {
      '/foo/bar': new models.Folder({
        fullUrl: '/foo/bar',
        name: 'root',
        type: 'FOLDER',
        content: [],
        createdBy: null,
        createdOn: null,
        updatedOn: null
      })
    }
  })
}

test('return empty list if content is falsy', () => {
  const state = defaultState;
  const props = { content: null, match: { url: '/foo' }};

  const result = getChildContent(state, props);
  expect(result).toBeInstanceOf(List);
  expect(result.size).toEqual(0);
});

test('return empty list if content.content is empty', () => {
  const state = defaultState;
  const props = { content: new models.Folder({ content: [] }), match: { url: '/foo' }};

  const result = getChildContent(state, props);
  expect(result).toBeInstanceOf(List);
  expect(result.size).toEqual(0);
});

test('return empty list if match.url is not defined', () => {
  const state = defaultState;
  const props = { content: new models.Folder(), match: { url: null }};

  const result = getChildContent(state, props);
  expect(result).toBeInstanceOf(List);
  expect(result.size).toEqual(0);
});

test('return list with mapped content correctly', () => {
  const state = defaultState;
  const props = {
    content: new models.Folder({ content: [ 'bar' ] }),
    match: { url: '/foo' }
  };

  const result = getChildContent(state, props);
  expect(result).toBeInstanceOf(List);
  expect(result.size).toEqual(1);
  expect(result.get(0)).toBeInstanceOf(models.Folder);
  expect(result.get(0)).toMatchObject(defaultState.content.getIn(['data', '/foo/bar']));
});

test('return list with mapped content by filtering out falsy results', () => {
  const state = defaultState;
  const props = {
    content: new models.Folder({ content: [ 'bar', 'baz' ] }),
    match: { url: '/foo' }
  };

  const result = getChildContent(state, props);
  expect(result).toBeInstanceOf(List);
  expect(result.size).toEqual(1);
  expect(result.get(0)).toBeInstanceOf(models.Folder);
  expect(result.get(0)).toMatchObject(defaultState.content.getIn(['data', '/foo/bar']));
});


