import React from 'react'
import { Tag } from 'components/atoms'
import randomColor from 'utils/randomColor'

// Note: так как список тегов это уникальный список, то в качестве ключа можно использовать сам tag
const TagList = ({ tags }) =>
  tags.map(tag => (
    <Tag key={tag} bgColor={randomColor()}>
      {tag}
    </Tag>
  ))

export default React.memo(TagList)
